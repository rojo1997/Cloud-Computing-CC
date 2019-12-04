const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const typeDefs = require('./types/');
const resolvers = require ('./resolvers/');
//Creamos el schema a partir de los tipos y resolvers definidos asociados
//a dichos schemas.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
//Exportamos el schema para su uso por graphql
module.exports = schema;