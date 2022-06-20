const router = require("express").Router();
let dao = require("../dataccess/catEntry");
const { v4: uuidv4 } = require("uuid");
const middleware = require("../utils/middleware");

/*--------------------CATEGORIAS--------------------*/
/*Un usuario invitado sin logear Puede Ver todas las categorias que pueden contener nuestros productos*/
//USUARIO SIN LOGEAR

/* Obtener todo */
router.get("/", (req, res) => {
	res.status(200).json(dao.getAll());
});

/* Obtener uno especifico */
router.get("/:id", (req, res) => {
	const id = req.params.id;
	const data = dao.getOne(id);
	if (data) {
		res.status(200).json(data);
	} else {
		res.sendStatus(404);
	}
});

/*Un usuario logeado como ADMIN puede postear categorias, modificarlos y borrarlos*/

//USUARIO SIN LOGEAR
router.post("/", middleware.validarUserLogin, (req, res) => {
	const body = { ...req.body, id: uuidv4(), user: req.user };
	dao.save(body);
	res.status(200).json(body);
});

/* Borrar un elemento --> No se pueden borrar las categorias ya que hay productos relacionados con ellas. 
Además se considera que no pueden eliminarse, sino solo añadirse o modificarse.*/

/* Modificar un elemento */
router.put("/:id", middleware.validarUserLogin, (req, res) => {
	const id = req.params.id;

	if (dao.update(id, req.body)) {
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
