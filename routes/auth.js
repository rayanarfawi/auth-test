const User = require("../models/User");

module.exports = {
  signup: (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.status(500).send("Missing info");

    //* Validation Handled in the UserSchema
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    user
      .save()
      .then(u => {
        return res
          .status(200)
          .json({ user_id: u._id, token: u.generateAuthToken() });
      })
      .catch(err => {
        return res.status(500).json({ Error: err.message });
      });
  },
  login: (req, res) => {},
  getCSRF: (req, res) => {
    return res.json({ csrf: req.csrfToken() });
  },
  logout: (req, res) => {
    return res.redirect("/");
  }
};
