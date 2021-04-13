module.exports = app => {
  const users = require('../controllers/users/users.controller')
  var router = require('express').Router();

  // Get all Users
  router.get('/', users.findAll)

  // Retrieve a single User with id
  router.get('/:id', users.findOne);

  app.use('/api/users', router);
}