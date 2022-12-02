const router = require("express").Router();
let dao = require("../dataccess/prodEntry");
const middleware = require("../utils/middleware");
const functions = require("../dataccess/functions");
const { Producto } = require("../models/relaciones.js");

//USUARIO SIN LOGEAR

router.get("/", async (req, res) => {
	res.status(200).json(await dao.getAll(req.query));
});

/*Obtener con Filtro Simple*/
router.get("/:filtro/:val", async (req, res) => {
	const filtro = req.params.filtro;
	switch (filtro) {
		case "cat":
			res.status(200).json(await dao.getByFiltro(req.params.val, "all", "all"));
			break;
		case "sCat":
			res.status(200).json(await dao.getByFiltro("all", req.params.val, "all"));
			break;
		case "marca":
			res.status(200).json(await dao.getByFiltro("all", "all", req.params.val));
			break;
		default:
			res.status(200).json(await dao.getByFiltro("all", "all", "all"));
			break;
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const data = await functions.getOne(id, Producto);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

//USUARIO LOGEADO COMO ADMIN

router.post(
	"/",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const codProd = (await Producto.max("codProd")) + 1;
		const body = { id: codProd, ...req.body };
		const data = await functions.save(body, Producto);
		console.log("DATAZO:", data);
		res.status(200).json(data);
	}
);

router.delete(
	"/:id",
	middleware.validarUserLogin,
	middleware.validarAdmin,
	async (req, res) => {
		const id = req.params.id;
		await functions.borrar(id, Producto);
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
