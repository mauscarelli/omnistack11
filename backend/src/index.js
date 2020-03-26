const express = require("express");
const cors = require('cors');
const routes = require('./routes'); // importando o routes.js da mesma pasta.

const app = express();
app.use(cors());
app.use(express.json()); // Para o express converter o corpo da requisição em um js object
app.use(routes);



app.listen(3333);
