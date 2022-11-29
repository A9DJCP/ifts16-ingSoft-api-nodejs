//En este archivo relacionamos las diferentes estructuras de datos (relaciones entre las "tablas")
const Categoria = require("./categoria");
const SubCategoria = require("./subcategoria");
const Marca = require("./marca");
const Permiso = require("./permiso");
const Producto = require("./producto");
const Usuario = require("./usuario");

/*Un producto tiene una marca, una categoria y una subcategoria. Una marca, una subcategoria y una categoria pueden aparecer en varios productos. 
Relacion 1N donde Producto N ---- 1 Marca, Categoria, Subcategoria */

Producto.belongsTo(Marca);
Marca.hasMany(Producto);

Producto.belongsTo(Categoria);
Categoria.hasMany(Producto);

Producto.belongsTo(SubCategoria);
SubCategoria.hasMany(Producto);

/*Un usuario tiene un permiso de usuario. Relación 1N donde Usuario N -------- 1 Permiso*/

Usuario.belongsTo(Permiso);
Permiso.hasMany(Usuario);

module.exports = {
	Producto,
	Marca,
	SubCategoria,
	Categoria,
	Permiso,
	Usuario,
};
