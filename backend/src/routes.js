const express = require("express");
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
routes.get("/incidents", IncidentController.index);
routes.get("/profile", ProfileController.index);

routes.post("/ongs", OngController.create);
routes.post("/incidents", IncidentController.create );
routes.post("/sessions",SessionController.create);

routes.delete("/incidents/:id", IncidentController.delete);


module.exports = routes; //exportar a variável routes para que ela seja acessada a partir de outro arquivo
