const homeController = {};

// Models
const models =  require('../models/models');
// image model
const imageModel = models.imageModel;

// sidebar
const sidebarHelper =  require('../helpers/sidebar');

homeController.index = async (req, res) => {
	// helpers.isNotLoggedIn,
	res.locals.metaTags = {
        title: "imgShare By OCHOA",
        description: "imgShare By OCHOA",
        keywords: "Keywords for this page"
    };
	const images = await imageModel.find().sort({recordate : -1});
	const sidebar = await sidebarHelper();
	// console.log(sidebar.comments[2].image);

	res.render('index', {images, sidebar});
}

homeController.profile = async (req, res) => {
	// helpers.isNotLoggedIn,
	// const images = await imageModel.find().sort({recordate : -1});
	// const sidebar = await sidebarHelper();
	// console.log(sidebar.comments[2].image);
	res.locals.metaTags = {
        title: "Perfil de ",
        description: "imgShare By OCHOA",
        keywords: "Keywords for this page"
    };

	// res.render('profile', {images, sidebar});
	res.render('profile');
}

module.exports = homeController;