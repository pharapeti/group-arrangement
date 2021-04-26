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
