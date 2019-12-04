const mongoose = require ('mongoose');
const validate = require ('mongoose-validator');

const Schema = mongoose.Schema;

//Creación del esquema de producto.
//Con el uso de 'validate' podemos comprobar que se cumplen los 
//pre-requisitos que deseemos desde el propio modelo de datos,
//sin necesitar funciones o código adicional.
const ProductSchema = new Schema({
	name: {
		type: String,
		validate: [
			validate({
				validator: 'isLength',
				arguments: [2,20],
				message: 'El nombre de producto debe contener entre {ARGS[0]} Y {ARGS[1]} caracteres.'
			})
		]
	},
	description: {
		textDescription:{
			type: String,
			default: "Default"
		},
		price:{
			type: Number,
			default: 0.0
		},
		reducedPrice:{
			type: String,
			default: 0.0
		},
		expiration:{
			type: String,
			default: "Default"
		}
	},
	state: {
		type: String,
		default: "Disponible"
	},
	owner: {
		type: String,
		default: "Default"
	},
	createdAt:{
		type: Date,
		default: Date.now()
	}
	
});

//Creación del modelo del esquema para mongoose
const Product = mongoose.model("Product", ProductSchema);
//Exportamos el  modelo
module.exports = Product;