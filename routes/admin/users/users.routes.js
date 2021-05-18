module.exports = app => {
  const adminUsersController = require('../../../controllers/admin/users/users.controller')
  const adminUserRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../../middleware/admin_auth');

  // Get all users
  adminUserRouter.get('/', admin_auth, adminUsersController.findAll)

  // Get all unassigned users in a project
  adminUserRouter.get('/unassigned', admin_auth, adminUsersController.findUnassigned)

  // Retrieve a user with id
  adminUserRouter.get('/:id', admin_auth, adminUsersController.findOne);

  // Tell express to route all requests directed to /api/admin/users to the router defined in this file
  app.use('/api/admin/users', adminUserRouter);
}
