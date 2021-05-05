const model = require('../../../../models/index')

// Return all Project Allocations for this specific Project
exports.findAll = (req, res) => {
  model.ProjectAllocation.findAll({ where: { project_id: req.params.project_id } })
    .then(project_allocations => res.send(project_allocations))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Project Allocations."
      });
    });
}

// Create a Project Allocation associated to this Project
exports.createOne = (req, res) => {
  if (req.body.external_id) {
    model.User.findOne({ where: { external_id: req.body.external_id }})
      .then(user => {
        model.ProjectAllocation.create({
          user_id: user.id,
          project_id: req.params.project_id
        })
          .then(project_allocation => {
            res.status(200).send(project_allocation);
          })
          .catch(err => {
            res.status(500).send({ message: err.message || 'Cannot create Project Allocation' })
          })
      })
      .catch(err => {
        res.status(400).send({ message: err.message || 'User does not exist' });
      })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}
