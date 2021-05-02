module.exports = app => {
  const adminGroupAllocationsController = require('../../../../controllers/admin/projects/group_allocations/group_allocations.controller')
  const adminGroupAllocationsRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../../../middleware/admin_auth');

  // Get all Group Allocations for this Project
  adminGroupAllocationsRouter.get('/', admin_auth, adminGroupAllocationsController.findAll)

  // Create a Group Allocation under this Project
  adminGroupAllocationsRouter.post('/', admin_auth, adminGroupAllocationsController.createOne);

  // Delete a Group Allocation under this Project
  adminGroupAllocationsRouter.delete('/', admin_auth, adminGroupAllocationsController.deleteOne);

  // Tell express to route all requests directed to /api/admin/users to the router defined in this file
  app.use('/api/admin/projects/:project_id/group_allocations', adminGroupAllocationsRouter);
}
