/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Marca extends Model {}

Marca.init(
	{
		codMarca: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		modelName: "Marca",
	}
);

module.exports = Marca;
