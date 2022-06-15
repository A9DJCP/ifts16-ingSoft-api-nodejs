//FORMATO product(id, desc, price{USD}, stock, marca, cat, sCat)
let prodEntry = [
	{
		id: 1,
		desc: "Zapatillas Airband Azules",
		price: "150",
		stock: "2300",
		marca: "Adidas",
		cat: "Mixto",
		sCat: "Calzado",
	},
	{
		id: 2,
		desc: "Remera Clasica Tipo A Roja",
		price: "50",
		stock: "10000",
		marca: "Puma",
		cat: "Male",
		sCat: "Torso",
	},
	{
		id: 3,
		desc: "Jean Semi roto Azul",
		price: "100",
		stock: "2000",
		marca: "Rebook",
		cat: "Female",
		sCat: "Pantalon",
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
