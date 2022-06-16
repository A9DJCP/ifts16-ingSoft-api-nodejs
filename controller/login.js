const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config();
const usuarios = require("../dataccess/userEntry");

router.post("/", (req, res) => {
	const { body } = req;
	const body2 = usuarios.buscarUsuario(body.nickname);
	if (body2[0]) {
		if (body2[1] == "admin") {
			const tokenData = {
				username: body.username,
				id: body2[2],
				profile: "admin",
			};
		} else {
			const tokenData = {
				username: body.username,
				id: body2[2],
				profile: "client",
			};
		}
		//El token recibe la data y una palabra secreta unica
		const token = jwt.sign(tokenData, process.env.JWTSECRET, {
			expiresIn: "1h",
		});
		res.status(200).send({ token, name: body.username });
	} else {
		//usuario incorrecto
		return res.status(401).json({ error: "credenciales incorrectas" });
	}
});

module.exports = router;
