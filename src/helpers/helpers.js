const bcrypt = require('bcryptjs');
const helpers = {};

helpers.randomName = () => {
	const pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let randomName = 0;
	for (let i = 0; i < 5; i++) {
		randomName += pattern.charAt(Math.floor(Math.random() * pattern.length));
	}

	return randomName;
}

// Encriptar Passwords
helpers.encryptPass = async(password) =>{
	// Generar un hash en 10 saltos
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);
	return hashPass;
};

// Comparar Passwords para login
helpers.comparePass = async(password, DBpassword) => {
	try{
		return await bcrypt.compare(password, DBpassword);
	}
	catch(e){
		console.log(e);
	}
};

// Si hay sesion activa
helpers.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('danger', 'No hay sesión activa !!!')
	return res.redirect('/singin');
}

// Si NO hay sesion activa
helpers.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/profile');
}

module.exports = helpers;