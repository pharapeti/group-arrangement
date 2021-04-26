module.exports = app => {
  const profileController = require('../../controllers/profile/profile.controller')
  const profileRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../middleware/auth');

  // Get profile data
  profileRouter.get('/', auth, profileController.profileData)

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/profile', profileRouter);
}
