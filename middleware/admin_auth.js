const model = require('../models/index');

module.exports = (request, response, next) => {
  // If the user is an admin, continue with the request
  // If they aren't an admin, response with Unauthorized(401)
  if (request.session.signed_in && request.session.external_id) {
    model.User.findAll({ where: { external_id: request.session.external_id, user_type: 2 }})
    .then(user => {
      if (user.length === 0) {
        response.status(401).send({ message: 'You cannot see this page as you are not an admin' });
      } else {
        next();
      }
    })
    .catch(err => {
      response.status(500).send({ message: 'Server crapped itself' });
    })
  } else {
    response.status(401).send({ message: 'You are not logged in' });
  }
};
