const mongoose = require('mongoose');

const {database} = require('./keys');

mongoose.connect(database.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(db => console.log('DataBase works...'))
	.catch(err => console.error('Server DB is offline => ' + err));