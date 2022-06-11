const express = require("express");
const cors = require("cors");
const middleware = require("./utils/mw");
const keepaliveController = require("./controller/keepalive");
const entryController = require("./controller/entry");

const app = express();

//Este Middleware que nos permite express es para validar informacion de manera previa

//Ejecución de Middlewares. Tienen que estar en el orden correcto según indica el next de cada uno
app.use(cors());
app.use(express.json()); //Procesar el body. Le estoy diciendo que el body que va a recibir esta en json y si está en json la interpreta

app.use(middleware.consoleData);

app.use("/keepalive", keepaliveController);
app.use("/entry", entryController);
//app.use("/login", loginController);
//app.use("/post", postController);

app.use(middleware.unkEP);
module.exports = app;
