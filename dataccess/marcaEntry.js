//FORMATO marca(id, nombre)
const { Marca } = require("../models/relaciones.js");
const getAll = async (filter) => {
	let options;
	if (filter.nombre) {
		options = {
			attributes: ["codMarca", "nombre"],
			where: {
				nombre: filter.nombre,
			},
		};
	} else {
		options = {
			attributes: ["codMarca", "nombre"],
		};
	}
	const datos = await Marca.findAll(options);
	return datos;
};

module.exports = { getAll };
