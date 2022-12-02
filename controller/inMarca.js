const router = require("express").Router();
let dao = require("../dataccess/marcaEntry");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");
const { Marca } = require("../models/relaciones.js");

/*--------------------MARCAS--------------------*/
/*Un usuario invitado sin logear Puede Ver todas las marcas cuyos productos contiene nuestro sitio*/
//USUARIO SIN LOGEAR

/* Obtener todo */
router.get("/", async (req, res) => {
	res.status(200).json(await dao.getAll(req.query));
});

/*Obtener una específica*/
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const data = await functions.getOne(id, Marca);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

/*Un usuario logeado como ADMIN puede postear marcas, modificarlas y borrarlas (borrar marcas no eliminará sus productos asociados, 
    sólo no aparecerán en el listado de marcas de la página)*/

//USUARIO LOGEADO COMO ADMIN
router.post(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const codMarca = (await Marca.max("codMarca")) + 1;
		const body = { id: codMarca, ...req.body };
		const data = await functions.save(body, Marca);
		res.status(200).json(data);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		await functions.borrar(id, Marca);
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
