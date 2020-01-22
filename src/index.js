/*** Modules ***/
const express = require('express');

/*** Inits ***/
const config = require('./server/config');

// Inicio la base de datos
require('./database');

const app = config(express());

/*** Run Server ***/
app.listen(
	app.get('port'), () => {
		console.log('Server on ' + app.get('port') + ' port...');
	}
);