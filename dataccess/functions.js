/*
const getOne = (id, entry) => {
	return entry.find((registro) => registro.id == id);
};
*/
const getOne = async (id, modelo) => {
	return await modelo.findByPk(id);
};

// Las funciones save y getOne estaban generalizadas pero va a haber que volver a ponerlas en cada entry pues depende del objeto a crear para la estructura de datos. Podria llegar a plantearse generalizarlas con reflections.
const save = (body, entry) => {
	entry.push(body);
};

const borrar = (id, entry) => {
	const index = entry.findIndex((registro) => registro.id == id);
	if (index >= 0) {
		entry.splice(index, 1);
		return true;
	}
	return false;
};

const update = (body, entry) => {
	const index = entry.findIndex((registro) => registro.id == body.id);
	if (index >= 0) {
		entry[index] = body;
		return true;
	}
	return false;
};

const getMaxId = (entry) => {
	return entry.length;
};

module.exports = {
	getOne,
	save,
	borrar,
	update,
	getMaxId,
};
