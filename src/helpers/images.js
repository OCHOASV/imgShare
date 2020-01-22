// Models
const models =  require('../models/models');
// image model
const imageModel = models.imageModel;

module.exports = {
	async populars() {
		const images = await imageModel.find().limit(5).sort({likes:-1});
		return images;
	}
}