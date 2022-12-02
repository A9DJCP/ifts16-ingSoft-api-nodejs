const router = require("express").Router();
let dao = require("../dataccess/sCatEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");
const { SubCategoria } = require("../models/relaciones.js");

/*--------------------SUBCATEGORIAS--------------------*/

/*Un usuario invitado sin logear Puede Ver todas las subcategorias asociadas a los productos*/
//USUARIO SIN LOGEAR

/* Obtener todo */
router.get("/", async (req, res) => {
	res.status(200).json(await dao.getAll(req.query));
});

/* Obtener uno especifico */
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const data = await functions.getOne(id, SubCategoria);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

/*Un usuario logeado como ADMIN puede postear subcategorias y modificarlas. Al igual que con las categorias, no se pueden borrar las subcategorias.*/

//USUARIO LOGEADO COMO ADMIN
router.post(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const codSCat = (await SubCategoria.max("codSCat")) + 1;
		const body = { id: codSCat, ...req.body };
		const data = await functions.save(body, SubCategoria);
		res.status(200).json(data);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		await functions.borrar(id, SubCategoria);
		res.sendStatus(202);
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
