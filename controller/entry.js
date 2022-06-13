const router = require("express").Router();
let { Entry } = require("../dataccess/entry");
const { v4: uuidv4 } = require("uuid");
/*Obtener TODO*/
router.get("/", (req, res) => {
	res.status(200).json(Entry);
});

/*Obtener uno específico*/
router.get("/objeto/:id", (req, res) => {
	//En el req viene toda la información que envió el navegador
	const id = req.params.id;
	//A cada elemento lo llama registro (cada elemento).
	// Sobre cada elemento hace una validación, y si la condicion da true lo guarda en data.
	const data = Entry.find((registro) => registro.id == id);
	console.log(data);
	//Como sólo voy a tener una posición en el array de data
	// (porque hay un único id) entonces la posición 0 va a ser la que coincide el id
	if (data) {
		res.status(200).json(data[0]);
	} else {
		res.sendStatus(404);
	}
});

/*Agregar un elemento*/
router.post("/objeto/", (req, res) => {
	const body = { ...req.body, id: uuidv4() };
	//Los 3 puntos significan traer todos los elementos de un objeto. Traemos todos los elementos del body y despues de la coma agregamos elementos nuevos, el id generado por la funcion
	//Para pisar datos tambien se puede agregar campos con comas. Ej: title:'holamundo'. Si en body habia un title lo sobrescribe
	Entry.push(body); //Agrego a la entrada el nuevo elemento
	res.status(200).json(body);
});

/*Borrar un elemento*/
//router.delete("/", (req, res) => {
//	const id = req.params.id;
//	Entry = Entry.filter((registro) => registro.id != id); //Filtro la entrada y mantengo todos los que tengan un id distinto al que tengo
//	res.sendStatus(201);
//});

router.delete("/", (req, res) => {
	const id = req.params.id;
	const index = Entry.findIndex((registro) => registro.id == id); //Filtro la entrada y mantengo todos los que tengan un id distinto al que tengo
	if (index >= 0) {
		Entry.splice(index, 1); //Borro un elemento a partir del index del array.
		res.sendStatus(202); //El código 202 es para operación aceptada
	} else {
		res.sendStatus(404);
	}
});

/*Modificar un elemento*/
router.put("/", (req, res) => {
	const id = req.params.id;
	const index = Entry.findIndex((registro) => registro.id == id);
	if (index >= 0) {
		Entry[index] = req.body;
		res.sendStatus(202);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
