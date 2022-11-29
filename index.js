const http = require("http");
const app = require("./app");
const { connectDb, sequelize } = require("./utils/db");

const server = http.createServer(app);

connectDb();

sequelize
	.sync()
	.then(() => {
		console.log("Tablas Creadas Satisfactoriaente");
	})
	.catch((error) => {
		console.log("Error en la creación de las tablas", error);
	});
server.listen(8000, () => {
	console.log("Servidor ejecutándose");
});
