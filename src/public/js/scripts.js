// Ver formulario para comentarios
$('#formComments').hide();
$('#comentar').click(function(e) {
	e.preventDefault();
	$('#formComments').slideToggle();
});

// Likes
$('#imgLike').click(function(e) {
	e.preventDefault();
	let imgID = $(this).data('id');
	// console.log('imgID ===> ' + imgID);

	$.post('/images/' + imgID + '/like')
		.done(
			data => {
				$('.counterLikes').text(data.likes);
			}
		);
});

// Eliminar Imagen
$('#imgDelete').click(function(e) {
	e.preventDefault();
	let imgID = $(this).data('id');
	let imgName = $(this).data('name');

	const confirmUser = confirm('Seguro de Eliminar la Imagen ' + imgName + '???');

	if (confirmUser) {
		$.ajax(
			{
				url: '/images/' + imgID,
				type: 'DELETE'
			}
		)
		.done(
			(result) => {
				window.location.replace('/')
			}
		);
	}
});