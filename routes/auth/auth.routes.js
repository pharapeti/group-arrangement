module.exports = app => {
  const authController = require('../../controllers/auth/auth.controller')
  const authRouter = require('express').Router();

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../middleware/auth');

  // Do not require user to already be logged to access the login endpoint
  authRouter.post('/auth', authController.login);

  // users allow user to reach logout endpoint if they're already signed in
  authRouter.delete('/auth', auth, authController.logout);

  // Tell express to route all requests directed to /api/users to the router defined in this file
  app.use('/api/users', authRouter);
}
