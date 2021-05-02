module.exports = app => {
  const projectAllocationsController = require('../../../../controllers/admin/projects/project_allocations/project_allocations.controller')
  const projectAllocationsRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const admin_auth = require('../../../../middleware/admin_auth');

  // Get all Project Allocations for this project
  projectAllocationsRouter.get('/', admin_auth, projectAllocationsController.findAll)

   // Create a Project Allocation
   projectAllocationsRouter.post('/', admin_auth, projectAllocationsController.createOne);

  // Tell express to route all requests directed to /api/admin/projects/:id/project_allocations to the router defined in this file
  app.use('/api/admin/projects/:project_id/project_allocations', projectAllocationsRouter);
}
