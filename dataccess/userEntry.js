//FORMATO user(id, nickname, name, sname, email, permisos)
let entry = [
	{
		id: 1,
		nickname: "admin",
		psw: "12345",
		name: "Emanuel",
		sname: "Ramirez",
		email: "emaR123@hotmail.com",
		permisos: "admin",
	},
	{
		id: 2,
		nickname: "lulaluna",
		psw: "1234",
		name: "Luna",
		sname: "Gomez",
		email: "lluna@gmail.com",
		permisos: "cliente",
	},
	{
		id: 3,
		nickname: "mariaMF",
		psw: "hola1234",
		name: "Maria",
		sname: "Fernandez",
		email: "MF_123@yahoo.com.ar",
		permisos: "cliente",
	},
];

const buscarUsuario = (nick) => {
	const index = entry.findIndex((registro) => registro.nickname == nick);
	if (index >= 0) {
		return index;
	} else {
		return -1;
	}
};

const getByFiltro = (permisosFiltro) => {
	const permiso = entry.filter(
		(personas) => personas.permisos == permisosFiltro
	);
	if (permiso) {
		return permiso;
	}
};

const getAll = (query) => {
	//FORMATO user(id, nickname, name, sname, email, permisos)

	let search = entry;
	//Filtrar por nick - Search Includes
	if (query.nick) {
		search = search.filter((e) =>
			e.nickname.toLowerCase().includes(query.nick)
		);
	}

	//Filtrar por nombre - Search Includes
	if (query.nom) {
		search = search.filter((e) => e.name.toLowerCase().includes(query.nom));
	}

	//Filtrar por apellido - Search Includes
	if (query.ape) {
		search = search.filter((e) => e.sname.toLowerCase().includes(query.ape));
	}

	//Filtrar por email - Search Includes
	if (query.email) {
		search = search.filter((e) => e.email.toLowerCase().includes(query.email));
	}

	//Filtrar por Permisos - Filtro Igual
	if (query.permisos) {
		search = search.filter((e) => e.permisos.toLowerCase() === query.permisos);
	}

	//Filtrar por varios permisos marcas - Filtro Igual separado con comas
	if (query.multperm) {
		search = search.filter((e) =>
			query.multperm.split(",").includes(e.permisos.toLowerCase())
		);
	}

	return search;
};

module.exports = {
	entry,
	getByFiltro,
	buscarUsuario,
	getAll,
};
