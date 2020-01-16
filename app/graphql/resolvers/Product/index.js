const Product = require('../../../models/Product');
const formatErrors = require ('../../../utils/utils');
const ObjectID = require('mongodb').ObjectID;
const amqp = require('amqplib/callback_api')
const codec = require('codec');

const resolvers = {
    Query: {
        //Obtener un producto por el identificador
        productById: async (root, args) => {
                return new Promise( (resolve, reject) => {
                    Product.findOne({_id: args._id}).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        },
        //Obtener una lista de productos por nombre (como
        //solo se le pasa un argumento, no es necesario
        //indicar el atributo concreto)
        productByName: async (root, args) => {
                return new Promise((resolve, reject) => {
                    Product.find(args).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        },
        //Obtener una lista de todos los productos
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
        //Registrar producto
        registerProduct: async (root, args) => {
            
            const otherErrors = [];
            try{
                // Creamos el producto con el modelo de datos definido
                //en la carpeta models
                const newProduct = await new Product(args);
                // Guardamos el producto en la colección Products
                // de la BD.
                const stored = await newProduct.save();
                const productList = await Product.distinct("name");
                /*require('dotenv').config();
                const AMQP_SERVER = process.env.URI_AMQP_SERVER;
                amqp.connect(AMQP_SERVER, function(error0, connection){
                    if(error0){
                        throw error0;
                    }
                    connection.createChannel(function(error1, channel){
                        if(error1){
                            throw error1;
                        }
                        var queue = 'analyze_queue';
                        channel.assertQueue(queue, {
                            durable: false
                        });

                        channel.sendToQueue(queue, Buffer.from(codec.json.encode(productList)));
                    });
                    setTimeout(function() {
                        connection.close();
                    }, 5000);
                });*/
                //Devolvemos el estado de éxito y el objeto creado
                return {
                    success:true,
                    productResponse: newProduct,
                    errors:[]
                }
            }catch(error){
                //Capturamos el error producido y lo devolvemos junto
                //al estado de éxito no satisfactorio
                return {
                    success:false,
                    productResponse: null,
                    errors: formatErrors(error, otherErrors)
                }
            }
        },
        //Modificar estado de consumo de un producto
        modifyProductState: async (root, args) => {
            
            const otherErrors = [];
            try{
            
                const idObj = await new ObjectID(args._id);
                //Actualizamos el producto cuyo identificador
                //coincida con el pasado como argumento, cambiando
                //el estado por el nuevo indicado en el argumento.
                const updateProduct = await Product.updateOne(
                    { _id: idObj }, 
                    { state: args.state } 
                );
                
                //En caso de que el producto no exista, se devuelve el
                //error correspondiente
                if(updateProduct.nModified != 1){
                    otherErrors.push({path: '[Update product state]', 
                    message: 'Product not found'});
                }

                //Lanzamos la excepción se se ha dado
                if(otherErrors.length){ 
                    throw otherErrors;
                }
                
                //Devolvemos el estado de éxito y el objeto actualizado
                return {
                    success:true,
                    productResponse: updateProduct,
                    errors:[]
                }
            }catch(error){
                //Capturamos el error producido y lo devolvemos junto
                //al estado de éxito no satisfactorio
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