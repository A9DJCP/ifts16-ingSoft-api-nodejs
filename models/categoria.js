/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Categoria extends Model {}

Categoria.init(
	{
		codCat: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		descripcion: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "categoria",
	}
);

module.exports = Categoria;
