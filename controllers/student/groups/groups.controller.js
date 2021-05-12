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
      res.status(500).send({ message: err.message || "Some error occurred while retrieving the User." });
    })
}

exports.askToLeave = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
  .then(user => {
    const userID_leave = user.id;

    model.GroupAllocation.findAll({ where: {user_id: userID_leave } })
    .then(group_allocations => {
      const groupIDs = group_allocations.map(group_alloc => {return group_alloc.group_id })
      console.log(groupIDs);
      if (groupIDs && groupIDs.find(id => { return id === parseInt(req.params.id)} )) {
        model.Group.findOne({ where: { id: req.params.id }})
        .then(group => { 
          const group_number = group.group_number;
           model.Project.findOne({where: { id: group.project_id}}).then(project => {
            const project_creator_id = project.created_by;

            model.Notification.create({ message: `Student number ${userID_leave} would like to leave group ${group_number} of project ${project.name}` , from: userID_leave, to: project_creator_id, read: false})
            .then(_notification => {
              res.send({message: "Request has been made"});
            })
            .catch( err => {
              res.status(500).send({message: err.message || "Some error occurred while sending a notification."})
              console.log(err);
            });
          })
      })}
      else {
        res.status(404).send({ message: `You do not have access to Group with id: ${req.params.id}` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving Groups"})
    })
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving the User."});
  })
}
