//FORMATO marca(id, nombre)
const functions = require("../dataccess/functions");
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

const update = async (id, body) => {
	const data = await functions.getOne(id, Marca);
	data.nombre = body.nombre;
	await data.save();
	return data;
};

module.exports = { getAll, update };
