const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
let dao = require("../dataccess/prodEntry");
const middleware = require("../utils/middleware");

/*--------------------PRODUCTOS--------------------*/

//USUARIO SIN LOGEAR

router.get("/", (req, res) => {
	res.status(200).json(dao.getAll());
});

/*Obtener multiples Filtrado --> Pendiente de revisión a ver si se puede hacer así*/
// router.get("/prod?cat=:valA&sCat=:valB&marca=:valC", (req, res) => {
// 	let valores = [req.params.valA, req.params.valB, req.params.valC];
// 	console.log(valores);
// 	res.status(200).json(dao.getByFiltro(valores[0], valores[1], valores[2]));
// });

/*Obtener con Filtro Simple*/
router.get("/:filtro/:val", (req, res) => {
	const filtro = req.params.filtro;
	switch (filtro) {
		case "cat":
			res.status(200).json(dao.getByFiltro(req.params.val, "all", "all"));
			break;
		case "sCat":
			res.status(200).json(dao.getByFiltro("all", req.params.val, "all"));
			break;
		case "marca":
			res.status(200).json(dao.getByFiltro("all", "all", req.params.val));
			break;
		default:
			res.status(200).json(dao.getByFiltro("all", "all", "all"));
			break;
	}
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const data = dao.getOne(id);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

//USUARIO LOGEADO COMO ADMIN

router.post("/", middleware.validarUserLogin, (req, res) => {
	//const body = { ...req.body, id: uuidv4(), user: req.user };
	const body = { id: dao.getMaxId() + 1, ...req.body };
	dao.save(body);
	res.status(200).json(body);
});

router.delete("/:id", middleware.validarUserLogin, (req, res) => {
	const id = req.params.id;

	if (dao.borrar(id)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

router.put("/:id", middleware.validarUserLogin, (req, res) => {
	const body = { ...req.body, id: uuidv4(), user: req.user };
	if (dao.update(body.id, body)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
