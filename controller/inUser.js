const router = require("express").Router();
let dao = require("../dataccess/userEntry");
const { Usuario } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js

const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");
const jwt = require("jsonwebtoken");

/*--------------------USUARIOS--------------------*/

/*Un usuario sin logear no puede hacer nada con respecto a los usuarios.*/
/*Un usuario logeado como ADMIN puede postear Usuarios, modificar usuarios y ver todos los usuarios*/

//USUARIO LOGEADO
router.get("/me", middleware.validarUserLogin, async (req, res) => {
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);
	res.status(200).json(await functions.getOne(decodeToken.id, Usuario));
});

//USUARIO LOGEADO COMO ADMIN

router.get(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		res.status(200).json(await dao.getAll(req.query));
	}
);

router.get(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		const data = await functions.getOne(id, dao.entry);
		if (data) {
			res.status(200).json(data);
		} else {
			res.sendStatus(404);
		}
	}
);

/*Obtener con Filtro Simple*/
router.get(
	"/permisos/:val",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const val = req.params.val;
		const data = await dao.getByFiltro(val, dao.entry);
		if (!data) {
			res.sendStatus(404).json({ error: "error" });
		} else {
			res.status(200).json(data);
		}
		//res.status(200).json(dao.getByFiltro(req.params.val));
	}
);

router.post(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const body = { id: functions.getMaxId(dao.entry) + 1, ...req.body };
		const data = await functions.save(body, dao.entry);
		res.status(200).json(data);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		if (await functions.borrar(id, dao.entry)) {
			res.sendStatus(202);
		} else {
			res.sendStatus(404);
		}
	}
);

router.put(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		console.log(req.body);
		const body = { ...req.body };
		if (await functions.update(body, dao.entry)) {
			res.sendStatus(202);
		} else {
			res.sendStatus(404);
		}
	}
);

module.exports = router;
