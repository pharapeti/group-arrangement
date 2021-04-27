const model = require('../../../models/index')

// Return all groups associated to the logged in user
exports.findAll = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
    .then(user => {
      const userID = user.id;

      model.GroupAllocation.findAll({ where: { user_id: userID } })
        .then(group_allocations => {
          const groupIds = group_allocations.map(group_alloc => { return group_alloc.group_id; })

          model.Group.findAll({ where: { id: groupIds } })
            .then(groups => {
              res.send(groups);
            })
            .catch(err => {
              res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups." });
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups." });
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups." });
    })
}

// Return information about a single group that is associated to the logged in user
exports.findOne = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
    .then(user => {
      const userID = user.id;

      model.GroupAllocation.findAll({ where: { user_id: userID } })
        .then(group_allocations => {
          const groupIds = group_allocations.map(group_alloc => { return group_alloc.group_id; })

          if (groupIds && groupIds.find(id => { return id === parseInt(req.params.id)} )) {
            model.Group.findOne({ where: { id: req.params.id }}).then(group => { res.send(group) });
          } else {
            res.status(404).send({ message: `You do not have access to Group with id: ${req.params.id}` });
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups." });
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups." });
    })
}
