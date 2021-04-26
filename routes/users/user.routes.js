module.exports = app => {
  const usersController = require('../../controllers/users/users.controller')
  var users = require('express').Router();
  var projects = require('./projects/project.routes')

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../middleware/auth');

  // All requests to /api/users/projects get handled by projects router
  app.use('/api/users/projects', projects)

  // Do not require user to already be logged to access the login endpoint
  users.post('/auth', usersController.login);

  // users allow user to reach logout endpoint if they're already signed in
  users.delete('/auth', auth, usersController.logout);

  // Get all Users
  users.get('/', auth, usersController.findAll)

  // Retrieve a single User with id
  users.get('/:id', auth, usersController.findOne);

  // Tell express to route all requests directed to /api/users to the router defined in this file
  app.use('/api/users', users);
}
