const Product = require('./Product/');
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const resolversDefs = [Product];
module.exports = mergeResolvers(resolversDefs, {all:true});