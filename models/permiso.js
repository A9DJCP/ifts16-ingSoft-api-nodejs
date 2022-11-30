/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Permiso extends Model {}

Permiso.init(
	{
		codPermiso: {
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
		modelName: "permiso",
	}
);

module.exports = Permiso;
