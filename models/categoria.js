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
		underscored: true, //Desarma los camel cases separando las palabras por guiones
		modelName: "Categoria",
	}
);

module.exports = Categoria;
