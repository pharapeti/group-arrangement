const model = require('../../models/index');

exports.findAll = (req, res) => {
  model.User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}

exports.findOne = (req, res) => {
  model.User.findByPk(req.params.id)
    .then(user => {
      if (user == null) {
        res.status(404).send({ message: `User with id: ${req.params.id} does not exist` });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Server crapped itself' });
    })
}

exports.login = (request, response) => {
	var external_id = request.body.external_id;
	var password = request.body.encrypted_password;

	if (external_id && password) {
    model.User.findOne({ where: { external_id: external_id,  encrypted_password: password } })
      .then(_user => {
        request.session.signed_in = true;
        request.session.external_id = external_id;
        response.status(200).send({ message: 'Logged in' })
      })
      .catch(_err => {
        response.send('Incorrect ID and/or Password!');
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
