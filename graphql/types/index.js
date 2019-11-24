const mergeTypes = require("merge-graphql-schemas").mergeTypes;

const Product = require("./Product/");

const typeDefs = [Product];

module.exports = mergeTypes(typeDefs, { all: true });