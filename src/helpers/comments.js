// Models
const models =  require('../models/models');

const imageModel = models.imageModel;
const commentsModel = models.commentsModel;

module.exports = {
	async newest() {
		const comments = await commentsModel.find().limit(5).sort({recordate:-1});

		for (const comment of comments) {
			const image = await imageModel.findOne({_id : comment.imageID});
			comment.image = image;
		}

		return comments;
	}
}