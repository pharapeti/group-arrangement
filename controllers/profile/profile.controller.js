const model = require('../../models/index');

// Return information information about the logged in user
exports.profileData = (req, res) => {
  model.User.findOne({
    where: { external_id: req.session.external_id },
    include: [
      { model: model.GroupAllocation },
      { model: model.PreferenceSelection }
    ]
   }).then(user => {
     res.send(user);
   }).catch(err => {
     res.send({ message: err.message || 'Something went wrong' })
   })
}
