import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [formerrors, setFormErrors] = useState({
    title: "",
    description: "",
    value: ""
  });
  const ong_id = localStorage.getItem("ongId");
  const history = useHistory();

  function formValidate() {
    let valid = true;
    Object.values(formerrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    return valid;
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let titleValid = "";
    let descriptionValid = "";
    let valueValid = "";
    switch (name) {
      case "title":
        titleValid = value.match(/[^a-zA-Z0-9_ ]/);
        setFormErrors(formerrors => ({
          ...formerrors,
          title: titleValid ? "Caracteres inválidos" : ""
        }));
        setTitle(value);
        break;
      case "description":
        descriptionValid = value.length < 3;
        setFormErrors(formerrors => ({
          ...formerrors,
          description: descriptionValid ? "Mínimo de 3 caracteres" : ""
        }));
        setDescription(value);
        break;
      case "value":
        valueValid = value.match(/[^0-9,\.]/);
        setFormErrors(formerrors => ({
          ...formerrors,
          value: valueValid ? "Valor inválido" : ""
        }));
        setValue(value);
        break;
      default:
        break;
    }
  }

  async function handleNewIncident(e) {
    e.preventDefault();
    let valueF = value.replace(',','.');
    if (formValidate()) {
      const data = {
        title,
        description,
        value: valueF
      };
      try {
        await api.post("incidents", data, {
          headers: {
            Authorization: ong_id
          }
        });
        alert("Caso cadastrado com sucesso.");

        history.push("/profile");
      } catch (err) {
        if (err.response.data.error) alert(err.response.data.error);
        else alert("Não foi possível cadastrar o caso, tente novamente.");
      }
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            className={formerrors.title.length > 0 ? "error" : null}
            placeholder="Título do caso"
            value={title}
            name="title"
            required
            onChange={handleChange}
          />
          {formerrors.title.length > 0 && (
            <span className="errorMessage">{formerrors.title}</span>
          )}
          <textarea
            className={formerrors.description.length > 0 ? "error" : null}
            placeholder="Descrição"
            value={description}
            name="description"
            required
            onChange={handleChange}
          />
          {formerrors.description.length > 0 && (
            <span className="errorMessage">{formerrors.description}</span>
          )}
          <input
            className={formerrors.value.length > 0 ? "error" : null}
            placeholder="Valor em reais"
            value={value}
            name="value"
            required
            onChange={handleChange}
          />
          {formerrors.value.length > 0 && (
            <span className="errorMessage">{formerrors.value}</span>
          )}
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
