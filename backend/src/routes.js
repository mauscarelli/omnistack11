const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const routes = express.Router();
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Apagar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query Params: Parâmetros nomeados enviados na rota após '?' (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 *
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where('')
 */

routes.get("/ongs", OngController.index);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      pages: Joi.number()
    })
  }),
  IncidentController.index
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .required()
        .min(1000000000)
        .max(99999999999),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
);

routes.post(
  "/incidents",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string()
        .required()
        .email(),
      value: Joi.number()
        .required()
        .min(1)
        .max(12)
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IncidentController.create
);

routes.post("/sessions", celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
      })
}), SessionController.create);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IncidentController.delete
);

routes.delete("/ongs", OngController.delete);

module.exports = routes; //exportar a variável routes para que ela seja acessada a partir de outro arquivo
