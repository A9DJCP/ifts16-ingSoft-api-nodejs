//FORMATO categoria(id, desc)
let entry = [
	{
		id: 1,
		desc: "Male",
	},
	{
		id: 2,
		desc: "Female",
	},
	{
		id: 3,
		desc: "Mixt",
	},
	{
		id: 4,
		desc: "Undefined",
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

const getMaxId = () => {
	return entry.length;
};

module.exports = { getAll, getOne, save, borrar, update, getMaxId };
