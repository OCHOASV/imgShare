const express = require('express');
const router = express.Router();

// Controllers
controllers = require('../controllers/controllers');

// home controller
const homeController = controllers.homeController;
// image controller
const imageController = controllers.imageController;

module.exports = app =>{
	// Index del sitio
	router.get('/', homeController.index);
	// Ver una imagen
	router.get('/images/:image_id', imageController.viewImg);
	// Agregar una imagen
	router.post('/images', imageController.addImg);
	// Like a una imagen
	router.post('/images/:image_id/like', imageController.likeImg);
	// Comentar una imagen
	router.post('/images/:image_id/comment', imageController.commentImg);
	// Eliminar una imagen
	router.delete('/images/:image_id', imageController.deleteImg);

	app.use(router);
}