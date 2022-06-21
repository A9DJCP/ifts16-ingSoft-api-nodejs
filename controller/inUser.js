const router = require("express").Router();
let dao = require("../dataccess/userEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");

/*--------------------USUARIOS--------------------*/

/*Un usuario sin logear no puede hacer nada con respecto a los usuarios.*/
/*Un usuario logeado como ADMIN puede postear Usuarios, modificar usuarios y ver todos los usuarios*/

//USUARIO LOGEADO COMO ADMIN

router.get("/", middleware.validarUserLogin, (req, res) => {
	res.status(200).json(functions.getAll(dao.entry));
});

router.get("/:id", middleware.validarUserLogin, (req, res) => {
	const id = req.params.id;
	const data = dao.getOne(id);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

/*Obtener con Filtro Simple*/
router.get("/permisos/:val", middleware.validarUserLogin, (req, res) => {
	res.status(200).json(dao.getByFiltro(req.params.val));
});

router.post("/", middleware.validarUserLogin, (req, res) => {
	const body = { id: functions.getMaxId(dao.entry) + 1, ...req.body };
	functions.save(body, dao.entry);
	res.status(200).json(body);
});

router.delete("/:id", middleware.validarUserLogin, (req, res) => {
	const id = req.params.id;
	if (functions.borrar(id, dao.entry)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

router.put("/:id", middleware.validarUserLogin, (req, res) => {
	console.log(req.body);
	const body = { ...req.body };
	if (functions.update(body, dao.entry)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
