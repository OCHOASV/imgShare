/*** Autenticaciones ***/
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const helpers = require('../helpers/helpers');
const userModel = require('../models/userModel');

// LogIn de usuario => local.singin
passport.use('local.singin',
	new strategy({
			usernameField: 'nick',
			passwordField: 'password',
			passReqToCallback: true
		},
		async(req, nick, password, done) => {

			// Selecciono todo con el nick como llave
			const user = await userModel.findOne({nick: nick});
			// Si encuentra resultados
			if (user) {
				/*
					Validamos el Password ingresado, llamamos a la funcion comparePass de helpers y le pasamos el pass que el usuario a metido y lo comparamos con el que se guarda en la DB. Devuelve TRUE o FALSE y lo guardamos en la variable validPassword
				*/
				const validPassword = await helpers.comparePass(password, user.password);
				// Si el pass es correcto
				if (validPassword) {
					// Termino el proceso con done, con null, se le pasa el user para que lo serialize y un mensaje
					// done(null, user, req.flash('success', 'Welcome ' + user.nick + ' !!!'));
					done(null, user);
				}
				// Si no
				else{
					done(null, false, req.flash('danger', 'Invalid password !!!'));
				}
			}
			// si no hay resultados
			else{
				return done(null, false, req.flash('danger', 'User ' + nick + ' doesn\'t exist !!!'));
			}
		}
	)
);

// Registro de usuario => local.singup
passport.use('local.singup',
	new strategy({
			usernameField: 'nick',
			passwordField: 'password',
			passReqToCallback: true
		},
		async(req, nick, password, done) => {
			const {name, email} = req.body;
			const newUser = new userModel(
				{
					nick,
					name,
					email,
					password
				}
			);
			newUser.password = await helpers.encryptPass(password);

			await newUser.save();
			return done(null, newUser);
		}
	)
);


// Serializar usuario (guardar ID del usuario en user.id)
passport.serializeUser(
	(user, done) => {
		done(null, user.id);
	}
);

// Deserializar usuario (obtengo datos del ID que serialize antes)
passport.deserializeUser(
	async (id, done) => {
		await userModel.findById(id,
			(err, user) => {
				done(err, user);
			}
		);
	}
);
