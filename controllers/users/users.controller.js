const model = require('../../models/index');
const bcrypt = require('bcryptjs');

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
