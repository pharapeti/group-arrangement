module.exports = app => {
  const adminGroupsController = require('../../../controllers/admin/groups/groups.controller')
  const adminGroupRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../../middleware/admin_auth');

  // Get all projects for the logged in user
  adminGroupRouter.get('/', admin_auth, adminGroupsController.findAll)

  // Retrieve a single project with id
  adminGroupRouter.get('/:id', admin_auth, adminGroupsController.findOne);

  // Tell express to route all requests directed to /api/admin/users to the router defined in this file
  app.use('/api/admin/groups', adminGroupRouter);
}
