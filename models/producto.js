/*Actualizada acorde a la BD*/
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Producto extends Model {}

Producto.init(
	{
		codProd: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		descripcion: {
			type: DataTypes.STRING(120),
			allowNull: false,
		},
		precio: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			/*validate: {
				min: {
					args: 0,
					msg: "El stock debe ser mayor o igual a 0.",
				},
			},*/
		},
	},
	{
		sequelize,
		modelName: "producto",
	}
);
/*Un producto tiene una marca, una categoria y una subcategoria. Estas relaciones estan definidas en relaciones.js*/

module.exports = Producto;
