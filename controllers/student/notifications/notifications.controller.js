const model = require('../../../models/index')

// Return all unread notifications for the logged in user
exports.findAll = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id }})
    .then(user => {
      model.Notification.findAll({ where: { to: user.id, read: false } })
        .then(notifications => res.send(notifications))
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while retrieving Notifications." });
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding User" });
    })

}

// Read a notification associated to the logged in user
exports.read = (req, res) => {
  model.User.findOne({ where: { external_id: req.session.external_id }})
  .then(user => {
    model.Notification.findOne({ where: { to: user.id, id: req.params.id }})
      .then(notification => {
        if (notification == null) {
          res.status(404).send({ message: 'Notification not found' })
        } else {
          if (notification.read === true) {
            res.status(200).send({ message: 'Notification has already been read!' })
          } else {
            notification.read = true;
            notification.save();
            res.status(200).send({ message: 'Notification has now been read!' })
          }
        }
      })
  })
}
