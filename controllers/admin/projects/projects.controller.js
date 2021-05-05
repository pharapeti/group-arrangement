const model = require('../../../models/index')

// Return all projects
exports.findAll = (req, res) => {
  model.Project.findAll()
    .then(projects => {
      res.send(projects);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
}

// Return information about a single project
exports.findOne = (req, res) => {
  model.Project.findByPk(req.params.id)
  .then(project => {
    if (project == null) {
      res.status(404).send({ message: `Project with id: ${req.params.id} does not exist` });
    } else {
      res.send(project);
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message || 'Something went wrong' });
  })
}

// Create Project associated to the admin creating it
exports.createOne = (req, res) => {
  if (req.body.name && req.body.max_group_size) {
    model.User.findOne({ where: { external_id: req.session.external_id }}).then(user => {
      model.Project.create({
        name: req.body.name,
        max_group_size: req.body.max_group_size,
        created_by: user.id,
      }).then(project => {
        res.status(200).send(project);
      }).catch(err => {
        res.status(500).send({ message: err.message || 'Cannot create Project' })
      })
    })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}
