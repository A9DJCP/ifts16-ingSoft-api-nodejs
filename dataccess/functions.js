/*
const getOne = (id, entry) => {
	return entry.find((registro) => registro.id == id);
};
*/
const getOne = async (id, modelo) => {
	return await modelo.findByPk(id);
};

// Las funciones save y getOne estaban generalizadas pero va a haber que volver a ponerlas en cada entry pues depende del objeto a crear para la estructura de datos. Podria llegar a plantearse generalizarlas con reflections.
const save = async (body, modelo) => {
	const data = { ...body };
	const model = await modelo.create(data);
	return model;
};

const borrar = async (id, modelo) => {
	await modelo.destroy({
		where: {
			id,
		},
	});
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
