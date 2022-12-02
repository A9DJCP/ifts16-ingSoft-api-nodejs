const { Usuario } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js
const { Producto } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js
const { Categoria } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js
const { SubCategoria } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js
const { Marca } = require("../models/relaciones.js"); //Busca el objeto Usuario de la clase relaciones.js

const getOne = async (id, modelo) => {
	return await modelo.findByPk(id);
};
const save = async (body, modelo) => {
	const data = { ...body };
	const model = await modelo.create(data);
	return model;
};

const borrar = async (id, modelo) => {
	if (modelo.name.toLowerCase() == "marca") {
		await modelo.destroy({
			where: {
				codMarca: id,
			},
		});
	} else if (modelo.name.toLowerCase() == "producto") {
		await modelo.destroy({
			where: {
				codProd: id,
			},
		});
	} else if (modelo.name.toLowerCase() == "categoria") {
		await modelo.destroy({
			where: {
				codCat: id,
			},
		});
	} else if (modelo.name.toLowerCase() == "subcategoria") {
		await modelo.destroy({
			where: {
				codSCat: id,
			},
		});
	} else if (modelo.name.toLowerCase() == "usuario") {
		await modelo.destroy({
			where: {
				codUsuario: id,
			},
		});
	}
};

/*El Update va a haber que migrarlo a cada Dataccess pues depende de los datos de cada estructura.*/
const update = (body, modelo) => {
	const index = entry.findIndex((registro) => registro.id == body.id);
	if (index >= 0) {
		entry[index] = body;
		return true;
	}
	return false;
};

const getMaxId = async (modelo) => {
	return 0;
};

const maxByModelo = async (modelo) => {
	console.log("Checking Modelo", modelo);
	if (modelo == "usuario") return await Usuario.max("codUsuario");
	if (modelo == "categoria") return await Categoria.max("codCat");
	if (modelo == "subCategoria") return await SubCategoria.max("codSCat");
	if (modelo == "marca") return await Marca.max("codMarca");
	if (modelo == "producto") return await Producto.max("codProd");
	else return null;
};

module.exports = {
	getOne,
	save,
	borrar,
	update,
	getMaxId,
};
