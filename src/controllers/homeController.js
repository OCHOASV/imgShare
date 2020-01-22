const homeController = {};

// Models
models =  require('../models/models');
// image model
const imageModel = models.imageModel;

homeController.index = async (req, res) => {
	// helpers.isNotLoggedIn,
	const images = await imageModel.find().sort({recordate : -1});
	res.render('index', {images});
}

module.exports = homeController;