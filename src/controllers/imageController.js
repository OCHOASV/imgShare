const path = require('path');
const { randomName } = require('../helpers/helpers');
const fs = require('fs-extra');

// Models
models =  require('../models/models');
// image model
const imageModel = models.imageModel;

const imgController = {};

// Ver imagenes
imgController.viewImg = (req, res) => {

};

// Agregar imagenes
imgController.addImg = async (req, res) => {

	const imgRandomName = randomName();

	const reqFile = req.file;
	const reqBody = req.body;
	const imgTempPath = reqFile.path;
	const imgExt = path.extname(reqFile.originalname).toLowerCase();

	// Sin esas comillas no funciona
	const imgTargetPath = path.resolve(`src/public/upload/${imgRandomName}${imgExt}`);

	imgValidExts = ['.png','.jpg','.jpeg','.gif'];

	if (imgValidExts.includes(imgExt)) {
		try{
			await fs.rename(imgTempPath, imgTargetPath);
			const newImg = new imageModel(
				{
					name : reqBody.name,
					description : reqBody.descripcion,
					filename : imgRandomName + imgExt
				}
			);
			console.log(newImg);
		}
		catch(e){
			console.log(e);
		}
	}
	else{
		console.log('Nope...');
	}

	res.send('works!');
};

// Like imagenes
imgController.likeImg = (req, res) => {

};

// Comentar imagenes
imgController.commentImg = (req, res) => {

};

// Eliminar imagenes
imgController.deleteImg = (req, res) => {

};

module.exports = imgController;