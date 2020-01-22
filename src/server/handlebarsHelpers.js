const moment = require('moment');

// Este objeto lo ocuparemos en las vistas
const helpers = {};

// Este metodo timeago es el que llamaremos en la vista
helpers.timeago = (date) => {
	return moment(date).startOf('minute').fromNow();
};

module.exports = helpers;