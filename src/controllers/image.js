const imgController = {};

// Ver imagenes
imgController.viewImg = (req, res) => {

};

// Agregar imagenes
imgController.addImg = (req, res) => {
	console.log(req.file);
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