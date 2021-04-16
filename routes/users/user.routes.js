module.exports = app => {
  const users = require('../../controllers/users/users.controller')
  var router = require('express').Router();

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../middleware/auth');

  // Do not require user to already be logged to access the login endpoint
  router.post('/auth', users.login);

  // Only allow user to reach logout endpoint if they're already signed in
  router.delete('/auth', auth, users.logout);

  // Get all Users
  router.get('/', auth, users.findAll)

  // Retrieve a single User with id
  router.get('/:id', auth, users.findOne);

  require('./projects/project.routes')(app);

  // Tell express to route all requests directed to /api/users to the router defined in this file
  app.use('/api/users', router);
}
