const stats = require('./stats');
const images = require('./images');
const comments = require('./comments');

module.exports = async () => {
	const sidebar = await Promise.all(
		[
			stats(),
			images.popularLikes(),
			images.popularViews(),
			comments.newest()
		]
	)

	return {
		stats: sidebar[0],
		popularLikes: sidebar[1],
		popularViews: sidebar[2],
		comments: sidebar[3]
	}
}