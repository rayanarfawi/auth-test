const User = require("../models/User");
const Tokens = require("csrf");
const client = require('../db/redis-client');
//https://medium.com/@laosb/how-we-connect-to-backend-accounts-system-on-nuxt-js-2e35a99a541
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
  login: (req, res) => { },
  getCSRF: async (req, res) => {
    const tokens = new Tokens();
    const secret = await tokens.secret();
    //! SETEX WITH EXPIRATION
    client.set('csrf', secret);
    return res.json({ csrf: secret });
  },
  logout: (req, res) => {
    return res.redirect("/");
  }
};
