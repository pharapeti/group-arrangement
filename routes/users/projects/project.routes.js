const projects = require('express').Router();
const projectsController = require('../../../controllers/users/projects/projects.controller')

// Ensure user is logged in for all requests handled by this router
const auth = require('../../../middleware/auth');

// Get all projects for the logged in user
projects.get('/', auth, projectsController.findAll)

// Retrieve a single project with id
projects.get('/:id', auth, projectsController.findOne);

// // Tell express to route all requests directed to /api/users/projects to the router defined in this file
// projects.use('/projects', router);

module.exports = projects;
