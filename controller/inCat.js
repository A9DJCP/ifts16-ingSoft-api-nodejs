const router = require("express").Router();
let dao = require("../dataccess/catEntry");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");
const { Categoria } = require("../models/relaciones.js");

/*Un usuario invitado sin logear Puede Ver todas las categorias que pueden contener nuestros productos*/
//USUARIO SIN LOGEAR
router.get("/", async (req, res) => {
	res.status(200).json(await dao.getAll(req.query));
});

/* Obtener uno especifico */
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const data = await functions.getOne(id, Categoria);
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
	async (req, res) => {
		const codCat = (await Categoria.max("codCat")) + 1;
		const body = { id: codCat, ...req.body };
		const data = await functions.save(body, Categoria);
		res.status(200).json(data);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		await functions.borrar(id, Categoria);
		res.sendStatus(202);
	}
);

router.put(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const body = { ...req.body };
		if (await dao.update(req.params.id, body)) {
			res.sendStatus(202);
		} else {
			res.sendStatus(404);
		}
	}
);

module.exports = router;
