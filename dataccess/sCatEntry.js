//FORMATO subcategoria(id, desc)
let entry = [
	{
		id: 1,
		desc: "Torso",
	},
	{
		id: 2,
		desc: "Pantalones",
	},
	{
		id: 3,
		desc: "Calzado",
	},
];

const getAll = (query) => {
	//FORMATO subcategoria(id, desc)

	let search = entry;
	//Filtrar por Descripcion - Search Includes
	if (query.desc) {
		search = search.filter((e) => e.desc.toLowerCase().includes(query.desc));
	}

	return search;
};

module.exports = { entry, getAll };
