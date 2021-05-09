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

// Arrange students associated via ProjectAllocations into Groups
exports.arrange = (req, res) => {
  model.Project.findByPk(req.params.id)
  .then(project => {
    model.ProjectAllocation.findAll({
      where: { project_id: project.id },
      include: model.User
    }).then(project_allocations => {

      // Randomise student ids
      let student_ids = project_allocations.map(project_allocation => project_allocation['User']['id']);
      student_ids = student_ids.sort(() => Math.random() - 0.5);

      // Creates groups of student ids
      const grouped_student_ids = [];
      while (student_ids.length) {
        const chunk = student_ids.splice(0, project.max_group_size);
        grouped_student_ids.push(chunk);
      }

      grouped_student_ids.forEach((student_id_group, index) => {
        // Create group with group number index + 1
        model.Group.create({ group_number: index + 1, project_id: project.id }).then(group => {

          // Create group allocations associated to said group
          student_id_group.forEach(student_id => {
            model.GroupAllocation.create({ group_id: group.id, user_id: student_id })
              .catch(err => res.status(500).send({ message: err.message || 'Could not find or create Group Allocation' }))
          })
        })
      });
      res.status(200).send('Arranged!');
    }).catch(err => {
      res.status(500).send({ message: err.message || 'Cannot find Project Allocations' });
    })
  }).catch(err => {
    res.status(404).send({ message: err.message || 'Could not find Project' });
  })
}
