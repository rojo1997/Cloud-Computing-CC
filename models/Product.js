const mongoose = require ('mongoose');
const validate = require ('mongoose-validator');

const Schema = mongoose.Schema;

// Create the User Schema.
const ProductSchema = new Schema({
  //data user
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

//Create the model from the schema
const Product = mongoose.model("Product", ProductSchema);
//Export model
module.exports = Product;