/*** Guardar los Usuarios en MongoDB ***/

// requerimos solo el Schema y el modelo de mongoose
const { Schema, model } = require('mongoose');
const path = require('path');

const userSchema = new Schema(
	{
		nick : {type : String, required : true},
		name : {type : String, required : true},
		email : {type : String, required : true},
		password : {type : String, required : true},
		recordate : {type : Date, default : Date.now}
	}
);

// Este nombre es el que tomara la collectio en MongoDB
module.exports =  model('user', userSchema);