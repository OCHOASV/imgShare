/*** Guardar las imagenes en MongoDB ***/

// requerimos solo el Schema y el modelo de mongoose
const { Schema, model } = require('mongoose');
const path = require('path');

const imgSchema = new Schema(
	{
		name : {type : String, required : true},
		description : {type : String, required : true},
		filename : {type : String, required : true},
		views : {type : Number, default : 0},
		likes : {type : Number, default : 0},
		recordate : {type : Date, default : Date.now}
	}
);

// Nombre de archivo con extencion, esta propiedad es virtual, no se guarda en DB
imgSchema.virtual('uniqueID')
	.get( function() {
			return this.filename.replace(path.extname(this.filename), '')
		}
	);

// Este nombre es el que tomara la collectio en MongoDB
module.exports =  model('images', imgSchema);