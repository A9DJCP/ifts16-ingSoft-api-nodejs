const router = require("express").Router();
let dao = require("../dataccess/marcaEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");

/*--------------------MARCAS--------------------*/
/*Un usuario invitado sin logear Puede Ver todas las marcas cuyos productos contiene nuestro sitio*/
//USUARIO SIN LOGEAR

/* Obtener todo */
router.get("/", (req, res) => {
	res.status(200).json(dao.getAll());
});

/*Un usuario logeado como ADMIN puede postear marcas, modificarlas y borrarlas (borrar marcas no eliminará sus productos asociados, 
    sólo no aparecerán en el listado de marcas de la página)*/

//USUARIO LOGEADO
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
