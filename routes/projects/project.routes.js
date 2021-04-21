module.exports = app => {
  const projects = require('../../controllers/projects/projects.controller')
  var router = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../middleware/admin_auth');

  // Get all projects for the logged in user
  router.get('/', admin_auth, projects.findAll)

  // Retrieve a single project with id
  router.get('/:id', admin_auth, projects.findOne);

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/projects', router);
}
