/*** Modules ***/
const express = require('express');
const path = require('path');
const handlerbars = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const errorHandler = require('errorhandler');
const session = require('express-session');
const flash = require('connect-flash');

// Importo mi archivo de rutas
const routes = require('../routes/router');

module.exports = app =>{

	/*** Settings ***/
	// Port
	app.set('port', process.env.PORT || 3000);
	// Public Files
	app.use('/public', express.static(path.join(__dirname, '../public')));
	// Views directory
	app.set('views', path.join(__dirname, '../views'));
	// Templates Engine handlerbars config
	app.engine(
		// Handlerbars def
		'.hbs',
		handlerbars({
			// Archivo que manejara todas las vistas
			defaultLayout: 'main',
			// main Dir
			layoutsDir: path.join(app.get('views'), 'layouts'),
			// Partials Dir
			partialsDir: path.join(app.get('views'), 'partials'),
			// Extension Files
			extname: '.hbs',
			// Funciones de handlebars
			helpers: require('./handlebarsHelpers')
		})
	);
	// Call template engine
	app.set('view engine', '.hbs');


	/*** Middlewares ***/
	// HTTP request
	app.use(morgan('dev'));
	// Sessions
	app.use(session ({
			secret: 'imgShareOCHOA',
			resave: 'false',
			saveUninitialized: 'false'
		})
	);
	// Messages
	app.use(flash());
	// Para subir imagenes
	app.use(multer({
			dest: path.join(__dirname, '../public/upload/tempIMG')
		}).single('upImg') // <= este nombre es el name e id del input file del form de subida
	);
	// Manejar peticiones de usuarios
	app.use(express.urlencoded({extended: false}));
	// Enviar y Recibir JSON
	app.use(express.json());

	/*** Global Variables ***/
	// Pasa a la siguiente funcion mientras el server procesa los req y res
	app.use(
		(req, res, next) =>{
			app.locals.success = req.flash('success');
			app.locals.danger = req.flash('danger');
			// Cuando serializamos el user, ponemos en variable global toda su info
			// app.locals.user = req.user;
			next();
		}
	);

	/*** Routes ***/
	routes(app);
	/*** Evitar ingreso a cualquier archivo/directorio ***/
	app.use('/*',
		(req, res, next) => {
			// res.send('403...');
			res.render('403');
		}
	);

	/*** ErrorHandler ***/
	if ('development' === app.get('env')) {
		app.use(errorHandler);
	};

	return app;
}