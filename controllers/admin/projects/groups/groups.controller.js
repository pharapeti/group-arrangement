const model = require('../../../../models/index')

// Return all Groups associated to this Project
exports.findAll = (req, res) => {
  model.Group.findAll({ where: { project_id: req.params.project_id }})
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

// Return a single Group
exports.findOne = (req, res) => {
  model.Group.findOne({ where: { project_id: req.params.project_id, id: req.params.id }})
  .then(group => {
    if (group == null) {
      res.status(404).send({ message: `Group ${req.params.id} is not associated to Project ${req.params.project_id}` });
    } else {
      res.send(group);
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message || 'Something went wrong' });
  })
}
