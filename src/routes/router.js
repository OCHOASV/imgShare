const express = require('express');
const router = express.Router();

// home controller
const home = require('../controllers/home');
// image controller
const image = require('../controllers/image');

module.exports = app =>{
	// Index del sitio
	router.get('/', home.index);
	// Ver una imagen
	router.get('/images/:image_id', image.viewImg);
	// Agregar una imagen
	router.post('/images', image.addImg);
	// Like a una imagen
	router.post('/images/:image_id/like', image.likeImg);
	// Comentar una imagen
	router.post('/images/:image_id/comment', image.commentImg);
	// Eliminar una imagen
	router.delete('/images/:image_id', image.deleteImg);

	app.use(router);
}