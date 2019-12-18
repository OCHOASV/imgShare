const homeController = {};

homeController.index = (req, res) => {
	// helpers.isNotLoggedIn,
	res.render('index')
}

module.exports = homeController;