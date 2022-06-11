const router = require("express").Router();

/*Obtener TODO*/
router.get("/", (req, res) => {
	res.status(200).json({ message: "estoy vivo GET" });
});

module.exports = router;
