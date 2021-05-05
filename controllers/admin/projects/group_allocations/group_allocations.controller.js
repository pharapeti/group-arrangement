const model = require('../../../../models/index')

// Return all GroupAllocations of this project
exports.findAll = (req, res) => {
  model.Group.findAll({ where: { project_id: req.params.project_id }})
  .then(groups => {
    const group_ids = groups.map(group => group.id);

    model.GroupAllocation.findAll({ where: { group_id: group_ids }})
      .then(group_allocations => {
        res.send(group_allocations);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving Group Allocations for Project ${req.params.project_id}`
        });
      });
  })
  .catch(err => {
    res.status(500).send({message: err.message || `Error occurred retrieving Groups for Project ${req.params.project_id}`});
  })
}

// Create a Group Allocation associated to this Project
exports.createOne = (req, res) => {
  if (req.body.group_id && req.body.external_id) {
    model.User.findOne({ where: { external_id: req.body.external_id }}).then(user => {
      model.Group.findOne({ where: { id: req.body.group_id }})
        .then(group => {
          model.Project.findOne({ where: { id: group.project_id } }).then(project => {
            model.GroupAllocation.create({ user_id: user.id, group_id: group.id})
              .then(group_allocation => {
                model.User.findOne({ where: { external_id: req.session.external_id }}).then(admin_user => {
                  // Create notification to notify user about being added to the group
                  model.Notification.create({ 
                    to: user.id, 
                    from: admin_user.id,
                    message: `You have been added to Group ${group.group_number} in Project: ${project.name}.`
                  }).then(_notification => {
                    res.send(group_allocation)
                  })
                })
              })
              .catch(err => res.status(500).send({ message: err.message || 'Cannot create Group Allocation' }))
          })
        })
        .catch(err => {
          res.status(500).send({ message: err.message || 'Cannot find Group' });
        })
    }).catch(err => {
      res.status(500).send({ message: err.message || 'Cannot find User/Student' });
    })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}

// Delete a single Group Allocation
exports.deleteOne = (req, res) => {
  if (req.body.group_id && req.body.external_id) {

    model.User.findOne({ where: { external_id: req.body.external_id }})
    .then(user => {
      model.GroupAllocation.findOne({ 
        where: { group_id: req.body.group_id, user_id: user.id }
      })
        .then(group_allocation => {
          if(group_allocation) {
            group_allocation.destroy();
            res.status(200).send({ message: 'Deleted!'});
          } else {
            res.status(200).send({ message: 'Already deleted!'});
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Could not find GroupAllocation to delete" });
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Could not find User" });
    })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}
