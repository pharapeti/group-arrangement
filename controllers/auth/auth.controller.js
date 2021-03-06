const model = require("../../models/index");
const bcrypt = require("bcryptjs");

exports.login = (request, response) => {
  let { external_id, password } = request.body;

  // Return early in the user is already logged in
  if (request.session.external_id) {

    // Load user to firstly ensure they exist, then to return the user_type with the response
    model.User.findOne({ where: { external_id: external_id } })
    .then((user) => response.status(200).send({ message: 'You are already logged in', user_type: user.user_type }))
    .catch(err => response.status(500).send({ message: err.message || 'Unable to load user' }))
  } else {

    // Ensure request contains the right params
    if (external_id && password) {
      model.User.findOne({ where: { external_id: external_id } }).then((user) => {
        // If the user with the same external_id is found, check that they password matches
        if (user && bcrypt.compareSync(password, user.encrypted_password)) {
          request.session.external_id = external_id;
          request.session.save((err) => {
            response.status(200).send({ message: "Signed in!", user_type: user.user_type });
          });
        } else {
          response.send({ message: "Incorrect ID and/or Password!" });
        }
      });
    } else {
      response
        .status(400)
        .send({ message: "External user id and password was not provided" });
    }
  }
};

exports.logout = (request, response) => {
  request.session.signed_in = false;
  request.session.external_id = null;
  response.status(200).send({ message: "Logged out!" });
};
