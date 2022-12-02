//FORMATO categoria(id, desc)
const functions = require("../dataccess/functions");
const { Categoria } = require("../models/relaciones.js");

const getAll = async (filter) => {
	let options;
	if (filter.descripcion) {
		options = {
			attributes: ["codCat", "descripcion"],
			where: {
				descripcion: filter.descripcion,
			},
		};
	} else {
		options = {
			attributes: ["codCat", "descripcion"],
		};
	}
	const datos = await Categoria.findAll(options);
	return datos;
};

const update = async (id, body) => {
	const data = await functions.getOne(id, Categoria);
	data.nombre = body.descripcion;
	await data.save();
	return data;
};

module.exports = { getAll, update };
