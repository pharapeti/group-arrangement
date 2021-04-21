module.exports = (request, response, next) => {
  // If the user is signed in, then continue with the request
  // If they aren't signed in, response with Unauthorized(401)
  if (request.session.signed_in && request.session.external_id) {
		next();
	} else {
		response.status(401).send('Sorry, you do not have the permission to do that');
	}
};
