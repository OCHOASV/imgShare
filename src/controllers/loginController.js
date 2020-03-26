const loginController = {};
const helpers = require('../helpers/helpers');
const passport = require('passport');

// Models
const models =  require('../models/models');
// models
const userModel = models.userModel;

loginController.singup = async (req, res) => {
	// helpers.isNotLoggedIn,
	res.render('login/singup');
}

loginController.singupPost = async (req, res) => {
	// helpers.isNotLoggedIn,
	const {nick, name, email, password, confirmPass} = req.body;
	const errors = [];

	if (nick.length < 3) {
		errors.push({text: 'Nick debe ser mayor que 5 caracteres!!!'});
	}
	if (password != confirmPass) {
		errors.push({text: 'Paswords no son iguales!!!'});
	}
	/*** Podemos seguir validando errores ****/

	if (errors.length > 0) {
		res.render('login/singup', {errors, nick, name, email, password, confirmPass});
	}
	else{
		const emailExist = await userModel.findOne({email: email});
		const nickExist = await userModel.findOne({nick: nick});

		const errors = [];
		if (emailExist) {
			errors.push({text: 'Email ya existe en la Base de Datos !!!'});
		}
		if (nickExist) {
			errors.push({text: 'Usuario ya existe en la Base de Datos !!!'});
		}

		if (errors.length > 0) {
			res.render('login/singup', {errors, nick, name, email, password, confirmPass});
		}
		else{
			const newUser = new userModel(
				{nick, name, email, password}
			);
			newUser.password = await helpers.encryptPass(password);

			await newUser.save();
			req.flash('success', 'Registro Completo ' + name + ' !!!');
			res.redirect('/singin');
		}
	}
}

loginController.singin = async (req, res) => {
	// helpers.isNotLoggedIn,
	res.render('login/singin');
}

loginController.singinPost = async (req, res, next) => {
	passport.authenticate('local.singin',{
		successRedirect: '/',
		failureRedirect: '/singin',
		failureFlash: true
	}
	)(req, res, next);
}

module.exports = loginController;