const model = require('../../../models/index');

// Return all projects of logged in user
exports.findAll = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
    .then(user => {
      const userID = user.id;

      model.GroupAllocation.findAll({ where: { user_id: userID } })
        .then(group_allocations => {
          const projectIds = group_allocations.map(group_alloc => { return group_alloc.id; });

          model.Project.findAll({ where: { id:  projectIds }})
            .then(projects => {
              res.send(projects)
            })
            .catch(err => {
              res.status(500).send({ message: err.message || "Some error occurred while retrieving projects." });
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while retrieving projects." });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving projects." });
    });
}

// Return information about a single project
exports.findOne = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
    .then(user => {
      const userID = user.id;

      model.GroupAllocation.findAll({ where: { user_id: userID } })
        .then(group_allocations => {
          const groupIds = group_allocations.map(group_alloc => { return group_alloc.group_id; });

          model.Group.findAll({ where: { id: groupIds } })
            .then(groups => {
              const projectIds = groups.map(group => { return group.project_id });

              if (projectIds && projectIds.find(id => { return id === parseInt(req.params.id)} )) {
                model.Project.findOne({ where: { id: req.params.id }}).then(project => { res.send(project) });
              } else {
                res.status(404).send({ message: `You do not have access to Project with id: ${req.params.id}` });
              }
            })
            .catch(err => {
              res.status(500).send({ message: err.message || 'Something went wrong'});
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message || 'Something went wrong'});
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Something went wrong'});
      })
}
