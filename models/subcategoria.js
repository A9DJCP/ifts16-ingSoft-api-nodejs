/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class SubCategoria extends Model {}

SubCategoria.init(
	{
		codSCat: {
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
		underscored: false,
		modelName: "SubCategoria",
	}
);

module.exports = SubCategoria;
