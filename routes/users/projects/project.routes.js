module.exports = app => {
  const projects = require('../../../controllers/projects/projects.controller')
  var router = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../../middleware/auth');

  // Get all projects for the logged in user
  router.get('/', auth, projects.findAll)

  // Retrieve a single project with id
  router.get('/:id', auth, projects.findOne);

  // Tell express to route all requests directed to /api/users/projects to the router defined in this file
  app.use('/api/users/projects', router);
}
