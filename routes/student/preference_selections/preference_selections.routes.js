module.exports = app => {
  const preferenceSelectionController = require('../../../controllers/student/preference_selections/preference_selection.controller')
  const preferenceSelectionRouter = require('express').Router({ mergeParams: true });

  // Ensure user is logged in for all requests handled by this router
  const auth = require('../../../middleware/auth');

  // Get data of all associated Preference Selections
  preferenceSelectionRouter.get('/', auth, preferenceSelectionController.findAll)

  // Create Preference Selection
  preferenceSelectionRouter.post('/', auth, preferenceSelectionController.createOne)

  // Retrieve a single Preference Selection with id associated to the logged in user
  preferenceSelectionRouter.get('/:id', auth, preferenceSelectionController.findOne);

  // Delete a single Preference Selection by id associated to the logged in user
  preferenceSelectionRouter.delete('/:id', auth, preferenceSelectionController.deleteOne);


  // Tell express to route all requests directed to /api/student/preference_selections to the router defined in this file
  app.use('/api/student/preference_selections', preferenceSelectionRouter);
}
