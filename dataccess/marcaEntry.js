//FORMATO marca(id, nombre)
let entry = [
	{
		id: 1,
		nombre: "Adidas",
	},
	{
		id: 2,
		nombre: "Nike",
	},
	{
		id: 3,
		nombre: "Rebook",
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

module.exports = { getAll, getOne, save, borrar, update };
