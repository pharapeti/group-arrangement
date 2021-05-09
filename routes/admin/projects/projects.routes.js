module.exports = app => {
  const adminProjectsController = require('../../../controllers/admin/projects/projects.controller')
  const adminProjectRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../../middleware/admin_auth');

  // Get all projects for the logged in user
  adminProjectRouter.get('/', admin_auth, adminProjectsController.findAll)

  // Retrieve a single project with id
  adminProjectRouter.get('/:id', admin_auth, adminProjectsController.findOne);

  // Create a single project
  adminProjectRouter.post('/', admin_auth, adminProjectsController.createOne);

  // Arrange students to groups
  adminProjectRouter.post('/:id/arrange', admin_auth, adminProjectsController.arrange);

  // Tell express to route all requests directed to /api/admin/users to the router defined in this file
  app.use('/api/admin/projects', adminProjectRouter);
}
