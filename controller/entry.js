const router = require("express").Router();

/*Obtener TODO*/
router.get("/", (req, res) => {
	res.status(200).json({ message: "estoy vivo GET" });
});

/*Obtener uno específico*/
router.get("/:id", (req, res) => {
	res.status(200).json({ message: "estoy vivo GET id" });
});

/*Agregar un elemento*/
router.post("/", (req, res) => {
	res.status(200).json({ message: "estoy vivo POST" });
});

/*Borrar un elemento*/
router.delete("/", (req, res) => {
	res.status(200).json({ message: "estoy vivo DELETE" });
});

/*Modificar un elemento*/
router.put("/", (req, res) => {
	res.status(200).json({ message: "estoy vivo PUT" });
});

module.exports = router;
