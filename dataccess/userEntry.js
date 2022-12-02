//FORMATO user(id, nickname, name, sname, email, permisos)
const { Usuario } = require("../models/relaciones.js");
const { Permiso } = require("../models/relaciones.js");

const buscarUsuario = async (nickname) => {
	let options;
	query = "select codUsuario from usuarios where nickname = " + nickname;
	options = {
		attributes: ["codUsuario"],
		where: {
			nickname: nickname,
		},
	};
	const index = (await Usuario.findOne(options)).codUsuario;
	if (index >= 0) {
		return index;
	} else {
		return -1;
	}
};
const getByFiltro = async (permisosFiltro) => {
	let options;
	if (permisosFiltro) {
		options = {
			attributes: ["codPermiso"],
			where: {
				descripcion: permisosFiltro,
			},
		};
	}
	const PermisoX = await Permiso.findOne(options);
	const codPermiso = PermisoX.codPermiso;

	if (codPermiso >= 0 && codPermiso <= 2)
		options = {
			attributes: [
				"codUsuario",
				"nickname",
				"password",
				"nombre",
				"apellido",
				"email",
			],
			where: {
				permisoCodPermiso: codPermiso,
			},
		};
	const datos = await Usuario.findAll(options);
	return datos;
};

const save = async (body) => {
	const data = { ...body };
	const Usuario = await Usuario.create(data);
	return Usuario;
};

const getAll = async (filter) => {
	let datos;
	let options = { include: [{ model: Usuario, required: false }] };
	//Filtro Completo
	if (
		filter.nickname != null &&
		filter.nombre != null &&
		filter.email != null &&
		filter.apellido != null
	) {
		options = {
			where: {
				nickname: filter.nickname.toLowerCase(),
				nombre: filter.nombre.toLowerCase(),
				apellido: filter.apellido.toLowerCase(),
				email: filter.email.toLowerCase(),
			},
		};
		datos = await Usuario.findAll(options);
	} else {
		if (
			filter.nickname == null &&
			filter.nombre == null &&
			filter.apellido == null &&
			filter.email == null
		) {
			datos = await Usuario.findAll();
		} else {
			//Filtros Individuales - Pendiente
			//Filtrar por nickname
			if (filter.nickname != null) {
				options = {
					...options,
					where: {
						...options.where,
						nickname: filter.nickname.toLowerCase(),
					},
				};
			}

			//Filtrar por nombre
			if (filter.nombre != null) {
				options = {
					...options,
					where: {
						...options.where,
						nombre: filter.nombre.toLowerCase(),
					},
				};
			}

			//Filtrar por apellido
			if (filter.apellido != null) {
				options = {
					...options,
					where: {
						...options.where,
						apellido: filter.apellido.toLowerCase(),
					},
				};
			}
			//Filtrar por email
			if (filter.email != null) {
				options = {
					...options,
					where: {
						...options.where,
						email: filter.email.toLowerCase(),
					},
				};
			}
			/* PENDIENTE. HAY QUE VER LA RELACION CON LA TABLA PERMISOS
			//Filtrar por Permisos
			if (filter.permisoCodPermiso != null) {
			options = {
			...options,
			where: {
				...options.where,
				permisoCodPermiso: filter.permisoCodPermiso,
				},
			};
		}
		*/
			datos = await Usuario.findAll(options);
		}
	}
	return datos;
};

const borrar = async (id, entry) => {
	await Usuario.destroy({
		where: { id },
	});
	return false;
};

const update = async (body, entry) => {
	const id = entry.findIndex((registro) => registro.id == body.id);
	const data = await getOne(id);
	data.title = body.title;
	data.nickname = body.nickname;
	data.password = body.password;
	data.nombre = body.nombre;
	data.apellido = body.apellido;
	data.email = body.email;
	await data.save();
	return data;
};

const getOne = async (id) => {
	return Usuario.findByPk(id);
};

module.exports = {
	getByFiltro,
	buscarUsuario,
	getAll,
	borrar,
	save,
	getOne,
	update,
};
