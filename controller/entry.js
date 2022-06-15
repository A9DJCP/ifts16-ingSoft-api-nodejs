const router = require("express").Router();
let dao = require("../dataccess/entry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");

/* Obtener todo */
router.get("/", (req, res) => {
	res.status(200).json(dao.getAll());
});

/* Obtener uno especifico */
router.get("/:id", (req, res) => {
	const id = req.params.id;
	const data = dao.getOne(id);
	//Como sólo voy a tener una posición en el array de data
	// (porque hay un único id) entonces la posición 0 va a ser la que coincide el id
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

//POST SIN USUARIO LOGEADO

// POST funcionando con usuario logueado
router.post("/", middleware.validarUserLogin, (req, res) => {
	const body = { ...req.body, id: uuidv4(), user: req.user };
	dao.save(body);
	res.status(200).json(body);
});

/* Borrar un elemento */
router.delete("/:id", (req, res) => {
	const id = req.params.id;

	if (dao.borrar(id)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

/* Modificar un elemento */
router.put("/:id", (req, res) => {
	const id = req.params.id;

	if (dao.update(id, req.body)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
