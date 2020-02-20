const express = require('express');
const router = express.Router();

// Controllers
controllers = require('../controllers/controllers');

// Home controller
const homeController = controllers.homeController;
// Image controller
const imageController = controllers.imageController;
// Login controller
const loginController = controllers.loginController;

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
	// SingUp
	router.get('/singup', loginController.singup);
	router.post('/singup', loginController.singupPost);
	// SingIn
	router.get('/singin', loginController.singin);

	app.use(router);
}