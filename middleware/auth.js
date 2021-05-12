module.exports = (request, response, next) => {
  // If the user is signed in, then continue with the request
  // If they aren't signed in, response with Unauthorized(401)
	console.log('In middleware');
	console.log(request.session.id);
	console.log(request.session);

  if (request.session.external_id) {
		next();
	} else {
		response.status(401).send({ message: 'Sorry, you do not have the permission to do that' });
	}
};
