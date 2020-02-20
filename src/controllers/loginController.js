const loginController = {};

// Models
const models =  require('../models/models');

loginController.singup = async (req, res) => {
	// helpers.isNotLoggedIn,
	res.render('login/singup');
}

loginController.singupPost = async (req, res) => {
	// helpers.isNotLoggedIn,
	console.log(req.body);
	res.send('Singup works!');
}

loginController.singin = async (req, res) => {
	// helpers.isNotLoggedIn,
	res.render('login/singin');
}

module.exports = loginController;