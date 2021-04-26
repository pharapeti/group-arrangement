module.exports = app => {
  const projectsController = require('../../controllers/projects/projects.controller')
  const projectRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../middleware/auth');

  // Get all projects for the logged in user
  projectRouter.get('/', auth, projectsController.findAll)

  // Retrieve a single project with id associated to the logged in user
  projectRouter.get('/:id', auth, projectsController.findOne);

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/projects', projectRouter);
}
