const Product = require('../../../models/Product');
const formatErrors = require ('../../../utils/utils');
const ObjectID = require('mongodb').ObjectID;

const resolvers = {
    Query: {
        productById: async (root, args) => {
                return new Promise((resolve, reject) => {
                    Product.findOne({args}).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        },
        productByName: async (root, args) => {
                return new Promise((resolve, reject) => {
                    Product.find(args).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        },
        products: async () => {
                return new Promise((resolve, reject) => {
                    Product.find()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        }
    },
    Mutation: {
        registerProduct: async (root, args) => {
            
            const otherErrors = [];
            try{
            
                const newProduct = new Product(args);
                const stored = await newProduct.save();
                
                if(otherErrors.length){ 
                    throw otherErrors;
                }

                return {
                    success:true,
                    productResponse: newProduct,
                    errors:[]
                }
            }catch(error){
                return {
                    success:false,
                    productResponse: null,
                    errors: formatErrors(error, otherErrors)
                }
            }
        },
        modifyProductState: async (root, args) => {
            
            const otherErrors = [];
            try{
            
                const idObj = await new ObjectID(args.id);
                const updateProduct = await Product.updateOne(
                    { _id: idObj }, 
                    { state: args.state } 
                );

                if(updateProduct.nModified != 1){
                    otherErrors.push({path: '[Update product state]', 
                    message: 'Product not found'});
                }

                if(otherErrors.length){ 
                    throw otherErrors;
                }
                
                return {
                    success:true,
                    productResponse: newProduct,
                    errors:[]
                }
            }catch(error){
                return {
                    success:false,
                    productResponse: null,
                    errors: formatErrors(error, otherErrors)
                }
            }
        }
    }
};

module.exports = resolvers;