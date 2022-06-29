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

const getAll = (query) => {
	//FORMATO categoria(id, desc)

	let search = entry;
	//Filtrar por Descripcion - Search Includes
	if (query.desc) {
		search = search.filter((e) => e.desc.toLowerCase().includes(query.desc));
	}

	return search;
};

module.exports = { entry, getAll };
