const { Producto } = require("../models/relaciones.js");
const { Marca } = require("../models/relaciones.js");
const { Categoria } = require("../models/relaciones.js");
const { SubCategoria } = require("../models/relaciones.js");

//FORMATO product(id, desc, price{USD}, stock, marca, cat, sCat)

const getByFiltro = async (catF, sCatF, marcaF) => {
	let options = {
		attributes: ["codProd", "descripcion", "precio", "stock"], // select
	};
	if (catF != "all") {
		codCat = await buscarCodCat(catF.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				categoriumCodCat: codCat,
			},
		};
	}

	if (sCatF != "all") {
		codSCat = await buscarCodSCat(sCatF.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				subCategoriumCodSCat: codSCat,
			},
		};
	}
	if (marcaF != "all") {
		codMarca = await buscarCodMarca(marcaF.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				MarcaCodMarca: codMarca,
			},
		};
	}
	let datos = await Producto.findAll(options);
	return datos;
};

const getAll = async (filter) => {
	let options = {
		attributes: ["codProd", "descripcion", "precio", "stock"], // select
	};
	if (filter.descripcion) {
		options = {
			...options,
			where: {
				...options.where,
				descripcion: filter.descripcion,
			},
		};
	}
	if (filter.precio) {
		options = {
			...options,
			where: {
				...options.where,
				precio: filter.precio,
			},
		};
	}

	if (filter.marca) {
		codMarca = await buscarCodMarca(filter.marca.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				MarcaCodMarca: codMarca,
			},
		};
	}

	if (filter.cat) {
		codCat = await buscarCodCat(filter.cat.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				categoriumCodCat: codCat,
			},
		};
	}
	if (filter.sCat) {
		codSCat = await buscarCodSCat(filter.sCat.toLowerCase());
		options = {
			...options,
			where: {
				...options.where,
				subCategoriumCodSCat: codSCat,
			},
		};
	}
	let datos = await Producto.findAll(options);
	/*
	 */
	/* Filtro por multivaluado - Pendiente
		//Filtrar por varias marcas - Filtro Igual separado con comas
		if (filter.multmarca) {
			search = search.filter((e) =>
				query.multmarca.split(",").includes(e.marca.toLowerCase())
			);
		}
	
		//Filtrar por varias Categorias - Filtro Igual separado con comas
		if (filter.multcat) {
			search = search.filter((e) =>
				query.multcat.split(",").includes(e.cat.toLowerCase())
			);
		}
	
		//Filtrar por varias SubCategorias - Filtro Igual separado con comas
		if (filter.multScat) {
			search = search.filter((e) =>
				query.multScat.split(",").includes(e.sCat.toLowerCase())
			);
		}
		*/
	return datos;
};

const buscarCodMarca = async (nombreMarca) => {
	const options = {
		attributes: ["codMarca"],
		where: {
			nombre: nombreMarca,
		},
	};
	datos = await Marca.findOne(options);
	return datos.codMarca;
};

const buscarCodSCat = async (nombreSCat) => {
	const options = {
		attributes: ["codSCat"],
		where: {
			descripcion: nombreSCat,
		},
	};
	datos = await SubCategoria.findOne(options);
	return datos.codSCat;
};

const buscarCodCat = async (nombreCat) => {
	const options = {
		attributes: ["codCat"],
		where: {
			descripcion: nombreCat,
		},
	};
	datos = await Categoria.findOne(options);
	return datos.codCat;
};

const getOne = async (id, modelo) => {
	return await modelo.findByPk(id, {
		include: [{ model: Categoria, required: false }],
	});
};

module.exports = {
	getByFiltro,
	getAll,
	getOne,
};
