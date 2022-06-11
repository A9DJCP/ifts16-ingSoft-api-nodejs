const consoleData = (req, res, next) => {
	//Req es la informacion que enviamos desde afuera, la peticion
	//Res es el canal por el que puedo responder
	//Next es el siguiente middleware o paso una vez que ya hizo su funcion el middleware
	console.log("Method:" + req.method);
	console.log("Path:" + req.path);
	console.log("Body:", req.body);
	console.log("-------");
	next();
};

const unkEP = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

module.exports = { consoleData, unkEP };
