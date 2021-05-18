const model = require('../../../models/index');
const Sequelize = require('sequelize');
const { sequelize } = require('../../../models/index');

exports.findAll = (req, res) => {
  let queryObject = {};

  // Search for User by external_id if provided
  if(req.query['external_id']) {
    queryObject = { where: { external_id: { [Sequelize.Op.like]: req.query['external_id'] + '%' } } }

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

  // Find Students/Users that aren't in Project with project_id
  if(req.query['project_id']){
    let queryString = `
      SELECT users.*
      FROM   users 
      WHERE  users.id NOT IN (SELECT user_id FROM project_allocations WHERE project_id = ${req.query['project_id']})
    `;

    sequelize.query(queryString, {
      model: model.User
    }).then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  }
}

// Find students that are in a project but aren't assigned to a group yet
exports.findUnassigned = (req, res) => {
  if(req.query['project_id']){
    const project_id = req.query['project_id'];

    let queryString = `
      SELECT DISTINCT users.*
      FROM   users
      INNER JOIN project_allocations ON project_allocations.user_id = users.id AND project_allocations.project_id = ${project_id}
      LEFT JOIN groups ON groups.project_id = ${project_id}
      LEFT JOIN group_allocations ON group_allocations.group_id = groups.id;
    `;

    sequelize.query(queryString, {
      model: model.User
    }).then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  } else {
    res.status(500).send({ message: 'Project ID not provided as a URL parameter' })
  }
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
