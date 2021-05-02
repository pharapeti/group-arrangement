const model = require('../../../models/index')

// Return all preference selections associated to the logged in user
exports.findAll = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
    .then(user => {
      model.PreferenceSelection.findAll({ where: { user_id: user.id } })
        .then(preference_selections => {
          const preference_ids = preference_selections.map(preference_selection => preference_selection.preference_id)

          model.Preference.findAll({ where: { id: preference_ids } })
            .then(preferences => {
              res.send(preferences);
            })
            .catch(err => {
              res.status(500).send({ message: err.message || "Some error occurred while retrieving Preferences." });
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while retrieving Preference Selections." });
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving User." });
    })
}

// Create one Preference Selection that will be associated with the logged in user
exports.createOne = (req, res) => {
  console.log(req.session.external_id);

  if (req.body.name && req.body.preference_category_id) {
    model.User.findOne({ where: { external_id: req.session.external_id }})
      .then(user => {
        model.Preference.create({ name: req.body.name, preference_category_id: req.body.preference_category_id })
          .then(preference => {
            model.PreferenceSelection.create({ user_id: user.id, preference_id: preference.id })
              .then(preference_selection => {
                res.status(200).send(preference_selection);
              })
              .catch(err => {
                res.status(500).send({ message: err.message || 'Cannot create Preference Selection' })
              })
          })
          .catch(err => {
            res.status(500).send({ message: err.message || 'Cannot create Preference' })
          })
      })
      .catch(err => {
        res.status(400).send({ message: err.message || 'Could not find associated User' });
      })
  } else {
    res.status(400).send({ message: 'The request does not contain the necessary parameters' });
  }
}

// Return information about a single preference selection that is associated to the logged in user
exports.findOne = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
  .then(user => {
    const userID = user.id;

    model.PreferenceSelection.findAll({ where: { user_id: userID } })
      .then(preference_selections => {
        const preference_ids = preference_selections.map(preference_selection => { return preference_selection.preference_id; })

        if (preference_ids && preference_ids.find(id => { return id === parseInt(req.params.id)} )) {
          model.PreferenceSelection.findOne({ where: { id: req.params.id }}).then(preference_selection => { res.send(preference_selection) });
        } else {
          res.status(404).send({ message: `You do not have access to Preference Selection with id: ${req.params.id}` });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving Preference Selections." });
      })
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving User." });
  })
}

// Delete a single preference selection that is associated to the logged in user
exports.deleteOne = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id } })
  .then(user => {
    model.PreferenceSelection.findOne({ where: { user_id: user.id, id: req.params.id } })
      .then(preference_selection => {
        preference_selection.destroy();
        res.status(200).send('Deleted!');
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving Preference Selection." });
      })
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving User." });
  })
}

