const homeController = {};

// Models
const models =  require('../models/models');
// image model
const imageModel = models.imageModel;

// sidebar
const sidebarHelper =  require('../helpers/sidebar');

homeController.index = async (req, res) => {
	// helpers.isNotLoggedIn,
	const images = await imageModel.find().sort({recordate : -1});
	const sidebar = await sidebarHelper();
	// console.log(sidebar.comments[2].image);

	res.render('index', {images, sidebar});
}

module.exports = homeController;