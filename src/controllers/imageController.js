const path = require('path');
const { randomName } = require('../helpers/helpers');
const fs = require('fs-extra');
const md5 = require('md5');

// Models
models =  require('../models/models');
// models
const imageModel = models.imageModel;
const commentsModel = models.commentsModel;

// sidebar
const sidebarHelper =  require('../helpers/sidebar');

// Constructor
const imgController = {};

// Ver imagenes
imgController.viewImg = async (req, res) => {
	const imgID = req.params.image_id;
	/* Busco la imagen que contenga en el "filename" mi imgID
	   ya que en la DB este dato tambien tiene la extencion */
	const image = await imageModel.findOne({filename: {$regex: imgID}});

	if (image) {
		// Comments
		const comments = await commentsModel.find({imageID : image._id}).sort({recordate : -1});

		// Alterando las vistas
		image.views = image.views + 1;
		await image.save();

		const sidebar = await sidebarHelper();

		res.render('viewImage', {image, comments, sidebar});
	}
	else{
		res.redirect('/');
	}
};

// Guardar imagenes
imgController.addImg = (req, res) => {

	const saveImageInDB = async () => {
		const imgRandomName = randomName();

		const imgInDB = await imageModel.find({filename: imgRandomName});
		if (imgInDB.length > 0) {
			saveImageInDB();
		}
		else{
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
					const imgNew = new imageModel(
						{
							name : reqBody.name,
							description : reqBody.descripcion,
							filename : imgRandomName + imgExt
						}
					);
					const imgSaved = await imgNew.save();
					req.flash('success', 'Imagen guardada con Exito !!!');
					res.redirect('/images/' + imgRandomName);
				}
				catch(e){
					console.log(e);
				}
			}
			else{
				await fs.unlink(imgTempPath);
				req.flash('danger', 'Tipo de archivo (' + imgExt + ') no valido !!!');
				// res.send('Not allowed file...');
				res.redirect('/');
			}
		}
	}

	saveImageInDB();
};

// Like imagenes
imgController.likeImg = async (req, res) => {
	const imgID = req.params.image_id;
	const image = await imageModel.findOne({filename: {$regex: imgID}});
	if (image) {
		image.likes = image.likes + 1;
		image.save();
		// Retornamos con todos los likes de la imagen
		res.json({likes : image.likes})
	}
	else{
		res.redirect('/');
	}
};

// Comentar imagenes
imgController.commentImg = async (req, res) => {
	// Recupero la imagen
	const uniqueID = req.params.image_id;
	const image = await imageModel.findOne({filename: {$regex: uniqueID}});

	if (image) {
		const newComment = new commentsModel(req.body);
		newComment.gravatar = md5(newComment.email);
		// Este ID es el de mongo
		newComment.imageID = image.id;
		await newComment.save(
			(err, inserted) => {
				const lastID = inserted._id;
				res.redirect('/images/' + uniqueID + '/#' + lastID)
			}
		);
	}
	else{
		res.redirect('/');
	}
};

// Eliminar imagenes
imgController.deleteImg = async (req, res) => {
	const imgID = req.params.image_id;
	const image = await imageModel.findOne({filename: {$regex: imgID}});
	if (image) {
		await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
		await commentsModel.deleteOne({imageID : image._id});
		await image.remove();
		res.json(true);
	}
	else{
		res.redirect('/');
	}
};

module.exports = imgController;