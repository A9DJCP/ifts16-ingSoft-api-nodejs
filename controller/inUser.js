const router = require("express").Router();
let dao = require("../dataccess/userEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");

/*--------------------USUARIOS--------------------*/

/*Un usuario sin logear no puede hacer nada con respecto a los usuarios.*/
/*Un usuario logeado como ADMIN puede postear Usuarios, modificar usuarios y ver todos los usuarios*/

//USUARIO LOGEADO
router.get("/", middleware.validarUserLogin, (req, res) => {
	res.status(200).json(dao.getAll());
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
router.get("/:filtro/:val", (req, res) => {
	const filtro = req.params.filtro;
	res.status(200).json(dao.getByFiltro(req.params.val));
});

router.post("/", middleware.validarUserLogin, (req, res) => {
	const body = { ...req.body, id: uuidv4(), user: req.user };
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
	const id = req.params.id;

	if (dao.update(id, req.body)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;

module.exports = router;
