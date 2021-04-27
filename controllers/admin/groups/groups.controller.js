const model = require('../../../models/index')

// Return all groups
exports.findAll = (req, res) => {
  model.Group.findAll()
    .then(groups => {
      res.send(groups);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving groups."
      });
    });
}

// Return information about a single group
exports.findOne = (req, res) => {
  model.Group.findByPk(req.params.id)
  .then(group => {
    if (group == null) {
      res.status(404).send({ message: `Group with id: ${req.params.id} does not exist` });
    } else {
      res.send(group);
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message || 'Something went wrong' });
  })
}
