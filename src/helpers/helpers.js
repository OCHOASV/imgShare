const helpers = {};

helpers.randomName = () => {
	const pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let randomName = 0;
	for (let i = 0; i < 5; i++) {
		randomName += pattern.charAt(Math.floor(Math.random() * pattern.length));
	}

	return randomName;
}

module.exports = helpers;