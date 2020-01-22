const stats = require('./stats');
const images = require('./images');
const comments = require('./comments');

module.exports = async () => {
	const sidebar = await Promise.all(
		[
			stats(),
			images.populars(),
			comments.newest()
		]
	)

	return {
		stats: sidebar[0],
		populars: sidebar[1],
		comments: sidebar[2]
	}
}