const model = require('../../models/index');
const bcrypt = require('bcryptjs');

exports.login = (request, response) => {
	let { external_id, password } =  request.body;
  let hash = bcrypt.hashSync(password, 10);

	if (external_id && password) {
    model.User.findOne({ where: { external_id: external_id } })
      .then(user => {

        // If the user with the same external_id is found, check that they password matches
        if (user && bcrypt.compareSync(password, hash)) {
          request.session.signed_in = true;
          request.session.external_id = external_id;

          response.status(200).send({ message: 'Signed in!' });
        } else {
          response.send('Incorrect ID and/or Password!');
        }
      })
  } else {
    response.status(400).send({ message: 'External user id and password was not provided' })
  }
};

exports.logout = (request, response) => {
  request.session.signed_in = false;
  request.session.external_id = null;
  response.status(200).send({ message: 'Logged out!' })
};
