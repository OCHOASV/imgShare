/*** Guardar los comentarios de las imagenes en MongoDB ***/

// requerimos solo el Schema y el modelo de mongoose
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const commentSchema = new Schema(
	{
		// ObjectId es un ID que le pertenece a otra collection
		imageID : {type : ObjectId},
		name : {type : String, required : true},
		email : {type : String, required : true},
		comment : {type : String, required : true},
		gravatar : {type : String},
		recordate : {type : Date, default : Date.now}
	}
);

// Virtual de uniqueID de imagen
commentSchema.virtual('image')
	.set(function (image) {
			this._image = image;
		}
	)
	.get(function () {
			return this._image;
		}
	);

// Este nombre es el que tomara la collectio en MongoDB
module.exports =  model('comments', commentSchema);