/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Usuario extends Model {}

Usuario.init(
	{
		codUsuario: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nickname: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "usuario",
	}
);
/*El usuario tiene un permiso. Esta relación está definida en relaciones.js*/
module.exports = Usuario;
