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

const getAll = (query) => {
	//FORMATO marca(id, nombre)

	let search = entry;
	//Filtrar por Nombre - Search Includes
	if (query.nom) {
		search = search.filter((e) => e.nombre.toLowerCase().includes(query.nom));
	}
	return search;
};

module.exports = { entry, getAll };
