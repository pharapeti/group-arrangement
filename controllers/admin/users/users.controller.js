const model = require('../../../models/index');
const Sequelize = require('sequelize')

exports.findAll = (req, res) => {
  console.log(req.query);

  let queryObject = {};

  // Search for User by external_id if provided
  if(req.query['external_id']) {
    queryObject = { where: { external_id: { [Sequelize.Op.like]: req.query['external_id'] + '%' } } }
  }

  model.User.findAll(queryObject)
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
      res.status(500).send({ message: err.message || 'Something went wrong' });
    })
}
