const router = require("express").Router();
let dao = require("../dataccess/catEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");

/*Un usuario invitado sin logear Puede Ver todas las categorias que pueden contener nuestros productos*/
//USUARIO SIN LOGEAR
router.get("/", (req, res) => {
	res.status(200).json(dao.getAll(req.query));
});

/* Obtener uno especifico */
router.get("/:id", (req, res) => {
	const id = req.params.id;
	const data = functions.getOne(id, dao.entry);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

/*Un usuario logeado como ADMIN puede postear categorias, modificarlos y borrarlos*/

//USUARIO LOGEADO COMO ADMIN
router.post(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	(req, res) => {
		//const body = { ...req.body, id: uuidv4(), user: req.user };
		const body = { id: functions.getMaxId(dao.entry) + 1, ...req.body };
		functions.save(body, dao.entry);
		res.status(200).json(body);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	(req, res) => {
		const id = req.params.id;
		if (functions.borrar(id, dao.entry)) {
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
	(req, res) => {
		console.log("Cuerpo: ", req.body);
		const body = { ...req.body };
		if (functions.update(body, dao.entry)) {
			res.sendStatus(202);
		} else {
			res.sendStatus(404);
		}
	}
);

module.exports = router;
