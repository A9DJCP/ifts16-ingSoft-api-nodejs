//FORMATO user(id, nick, nom, ape, email, permisos)
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
		psw: "algopsw",
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

const getAll = () => {
	return entry;
};

const getOne = (id) => {
	return entry.find((registro) => registro.id == id);
};

const save = (body) => {
	entry.push(body);
};

const borrar = (id) => {
	const index = entry.findIndex((registro) => registro.id == id);
	if (index > 0) {
		entry.splice(index, 1);
		return true;
	}
	return false;
};

const update = (id) => {
	const index = entry.findIndex((registro) => registro.id == id);
	if (index >= 0) {
		entry[index] = req.body;
		return true;
	}
	return false;
};

const buscarUsuario = (nick) => {
	const index = entry.findIndex((registro) => registro.nickname == nick);
	if (index >= 0) {
		return index;
	} else {
		return -1;
	}
};

const getByFiltro = (permisosF) => {
	let entryFiltered = [];
	let permisos;
	for (let i = 0; i < entry.length; i++) {
		permisos = entry[i].permisos.toLowerCase();
		if (permisos == permisosF || permisosF == "all") {
			entryFiltered.push(entry[i]);
		}
	}
	return entryFiltered;
};

const getMaxId = () => {
	return entry.length;
};

module.exports = {
	getAll,
	getOne,
	save,
	borrar,
	update,
	getByFiltro,
	buscarUsuario,
	getMaxId,
};
