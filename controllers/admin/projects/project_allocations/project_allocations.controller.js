const model = require('../../../../models/index')

// Return all Project Allocations for this specific Project
exports.findAll = (req, res) => {
  model.ProjectAllocation.findAll({ 
    where: { project_id: req.params.project_id },
    include: model.User
  })
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
        model.Project.findOne({ where: { id: req.params.project_id }}).then(project => {
          model.ProjectAllocation.create({
            user_id: user.id,
            project_id: req.params.project_id
          }).then(project_allocation => {
            model.User.findOne({ where: { external_id: req.session.external_id } }).then (admin_user => {
              // Create notification to notify user about being added to the project
              model.Notification.create({
                to: user.id,
                from: admin_user.id,
                message: `You have been added to Project: ${project.name}.`
              }).then(_notification => {
                res.send(project_allocation)
              })
            })
          }).catch(err => {
            res.status(500).send({ message: err.message || 'Cannot create Project Allocation' })
          })
        })
      })
      .catch(err => {
        res.status(400).send({ message: err.message || 'User does not exist' });
      })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}
