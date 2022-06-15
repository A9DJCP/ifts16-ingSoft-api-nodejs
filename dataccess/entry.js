//Esta clase va a simular ser la BD
let entry = [
	{
		id: 1,
		title: "primer post",
		content: "mucho bla bla bla",
	},
	{
		id: 2,
		title: "primer post",
		content: "mucho bla bla bla",
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
	//Filtro la entrada y mantengo todos los que tengan un id distinto al que tengo
	const index = entry.findIndex((registro) => registro.id == id);
	if (index > 0) {
		Entry.splice(index, 1); //Borro un elemento a partir del index del array.
		return true;
	}
	return false;
};

const update = (id) => {
	const index = Entry.findIndex((registro) => registro.id == id);
	if (index >= 0) {
		Entry[index] = req.body;
		return true;
	}
	return false;
};

module.exports = { getAll, getOne, save, borrar, update };
