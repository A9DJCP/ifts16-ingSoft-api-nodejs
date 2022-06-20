const { Console } = require("console");

//FORMATO product(id, desc, price{USD}, stock, marca, cat, sCat)
let entry = [
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
	{
		id: 4,
		desc: "Zapatos Negros Clásicos",
		price: "75",
		stock: "3500",
		marca: "Adidas",
		cat: "Male",
		sCat: "Calzado",
	},
	{
		id: 5,
		desc: "Tacones Altos Rojos Brillantes",
		price: "80",
		stock: "2950",
		marca: "Nike",
		cat: "Female",
		sCat: "Calzado",
	},
	{
		id: 6,
		desc: "Remera Común Tipo B Azul",
		price: "100",
		stock: "2000",
		marca: "Rebook",
		cat: "Mixto",
		sCat: "Torso",
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

const getByFiltro = (catF, sCatF, marcaF) => {
	let entryFiltered = [];
	let cat, sCat, marca;
	for (let i = 0; i < entry.length; i++) {
		cat = entry[i].cat.toLowerCase();
		sCat = entry[i].sCat.toLowerCase();
		marca = entry[i].marca.toLowerCase();
		if (
			(cat == catF || catF == "all") &&
			(sCat == sCatF || sCatF == "all") &&
			(marca == marcaF || marcaF == "all")
		) {
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
	getMaxId,
};
