const mergeTypes = require("merge-graphql-schemas").mergeTypes;
const Product = require("./Product/");
//En el caso de añadir nuevas clases, podremos establecer una
//organización de éstas, unificando la definición de tipos,
//en lugar de tener las diferentes definiciones en un mismo
//archivo
const typeDefs = [Product];
//Exportamos las definiciones de tipos
module.exports = mergeTypes(typeDefs, { all: true });