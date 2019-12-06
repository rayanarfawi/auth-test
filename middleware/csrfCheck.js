const Tokens = require("csrf");
const client = require('../db/redis-client');
module.exports = (req, res, next) => {
  client.get('csrf', function (error, result) {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(result, req.headers['x-csrf-token']);
    console.log(new Tokens().verify(result, req.headers['x-csrf-token']))
  });
  next();
};
