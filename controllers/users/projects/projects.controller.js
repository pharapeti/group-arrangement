const model = require('../../../models/index');

// Return all projects of logged in user
exports.findAll = (req, res) => {
  // model.User.findAll()
  //   .then(users => {
  //     res.send(users);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving users."
  //     });
  //   });
  res.send([]);
}

// Return information about a single project
exports.findOne = (req, res) => {
  res.send([]);
}
