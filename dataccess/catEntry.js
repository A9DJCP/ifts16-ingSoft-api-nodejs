//FORMATO categoria(id, desc)
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

const updateCat = async (id, body) => {
	const data = await getOne(id);
	data.descripcion = body.desc;
	if (body.categoria) {
		let categoria = {};
		if (body.categoria.id) {
			categoria = await Categoria.findByPk(body.categoria.id);
		} else {
			categoria = await Categoria.create(body.categoria);
		}
		data.categoriaId = categoria.id;
	}
	await data.save();
	return data;
};

module.exports = { getAll };
