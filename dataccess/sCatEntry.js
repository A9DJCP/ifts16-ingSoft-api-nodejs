//FORMATO subcategoria(id, desc)
const functions = require("../dataccess/functions");
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

const update = async (id, body) => {
	const data = await functions.getOne(id, SubCategoria);
	data.descripcion = body.descripcion;
	await data.save();
	return data;
};
module.exports = { getAll, update };
