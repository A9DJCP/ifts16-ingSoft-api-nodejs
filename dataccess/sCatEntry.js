//FORMATO subcategoria(id, desc)
const { SubCategoria } = require("../models/relaciones.js");
const getAll = async (filter) => {
	let options;
	if (filter.descripcion) {
		options = {
			attributes: ["codSCat", "descripcion"],
			where: {
				descripcion: filter.descripcion,
			},
		};
	} else {
		options = {
			attributes: ["codSCat", "descripcion"],
		};
	}
	const datos = await SubCategoria.findAll(options);
	return datos;
};

module.exports = { getAll };
