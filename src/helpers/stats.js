// Models
const models =  require('../models/models');

const imageModel = models.imageModel;
const commentsModel = models.commentsModel;
const userModel = models.userModel;

// Imagenes totales
async function imagesCounter() {
	// Esto lo que hace es que cuenta todos los elementos de una collection
	return await imageModel.countDocuments();
}

// Comentarios totales
async function commentsCounter() {
	return await commentsModel.countDocuments();
}

// Usuarios totales
async function usersCounter() {
	return await userModel.countDocuments();
}

// Vistas totales
async function viewsCounter(){
	/*
		Vamos a recorrer cada imagen y tomare el valor de las vistas y las guardare en viewsTotal, aggregate sirve para agrupar o contar registros

		$group toma otro objeto como parametro
		$views sin ese $ mongo no hace la sumatoria
	*/
	const views = await imageModel.aggregate(
		[
			{
				$group: {
					_id: '1',
					viewsTotal : {
						$sum : '$views'
					}
				}
			}
		]
	);

	return views[0].viewsTotal;
}

// Likes totales
async function likesCounter() {
	const likes = await imageModel.aggregate(
		[
			{
				$group: {
					_id: '1',
					likesTotal : {
						$sum : '$likes'
					}
				}
			}
		]
	);

	return likes[0].likesTotal;
}

module.exports = async () => {
	// Promise ejecuta varias funciones al mismo tiempo
	const stats = await Promise.all(
		[
			imagesCounter(),
			commentsCounter(),
			viewsCounter(),
			likesCounter(),
			usersCounter()
		]
	)

	// Devolviendo un objeto nada mas
	return {
		images: stats[0],
		comments: stats[1],
		views: stats[2],
		likes: stats[3],
		users: stats[4]
	}
}