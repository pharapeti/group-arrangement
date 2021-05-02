module.exports = app => {
  const notificationsController = require('../../../controllers/student/notifications/notifications.controller')
  const groupRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../../middleware/auth');

  // Get all unread notifications for the logged in user
  groupRouter.get('/', auth, notificationsController.findAll)

  // Read a specific notification
  groupRouter.post('/:id/read', auth, notificationsController.read);

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/student/notifications', groupRouter);
}
