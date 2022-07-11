const jwt = require("jsonwebtoken");
require("dotenv").config();

const consoleData = (req, res, next) => {
	console.log("Method:" + req.method);
	console.log("Path:" + req.path);
	console.log("Body:", req.body);
	console.log("-------");
	next();
};

const unkEP = (req, res) => {
	res.status(404).send({ error: "Unknown Endpoint" });
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
		return res.status(401).json({ error: "Invalid Token" });
	}

	req.user = decodeToken;
	next();
};

const validarAdmin = (req, res, next) => {
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);
	const permisos = decodeToken.permisos;

	if (permisos == "admin") {
		req.user = decodeToken;
	} else {
		return res.status(401).json({ error: "No admin token" });
	}

	next();
};

module.exports = {
	consoleData,
	unkEP,
	processToken,
	validarUserLogin,
	validarAdmin,
};
