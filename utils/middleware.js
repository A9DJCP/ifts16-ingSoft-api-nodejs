const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const processToken = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.token = authorization.substring(7);
	} else {
		req.token = null;
	}
	next();
};

const validarUserLogin = (req, res, next) => {
	if (!req.token) {
		return res.status(401).json({ error: "token missing" });
	}
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);

	if (!decodeToken.id) {
		return res.status(401).json({ error: "token invalid" });
	}
	req.user = decodeToken;
	next();
};

const validarPermisos = (req, resp, next) => {
	if (!req.token) {
		return resp.status(401).json({ error: "token missing" });
	}
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);

	if (!decodeToken.id) {
		return resp.status(401).json({ error: "token invalid" });
	}
	req.user = decodeToken;
	next();
};

module.exports = {
	consoleData,
	unkEP,
	processToken,
	validarUserLogin,
};
