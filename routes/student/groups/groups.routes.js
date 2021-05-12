module.exports = app => {
  const groupsController = require('../../../controllers/student/groups/groups.controller')
  const groupRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../../middleware/auth');

  // Get profile data
  groupRouter.get('/', auth, groupsController.findAll)

  // Retrieve a single group with id associated to the logged in user
  groupRouter.get('/:id', auth, groupsController.findOne);

  // Send a notification asking to leave a group
  groupRouter.post('/:id/leave', auth, groupsController.askToLeave);

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/student/groups', groupRouter);
}
