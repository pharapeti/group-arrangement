module.exports = app => {
  const preferenceSelectionController = require('../../../controllers/student/preference_selections/preference_selection.controller')
  const preferenceSelectionRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../../middleware/auth');

  // Get profile data
  preferenceSelectionRouter.get('/', auth, preferenceSelectionController.findAll)

  // Create preference selectiom
  preferenceSelectionRouter.post('/', auth, preferenceSelectionController.createOne)

  // Retrieve a single group with id associated to the logged in user
  preferenceSelectionRouter.get('/:id', auth, preferenceSelectionController.findOne);

  // Tell express to route all requests directed to /api/projects to the router defined in this file
  app.use('/api/student/preference_selections', preferenceSelectionRouter);
}
