const express = require("express");
const bodyParser = require("body-parser");
const slowDown = require("express-slow-down");
const helemt = require("helmet");
const cors = require("cors");
const compression = require("compression");
const app = express();
require("dotenv").config();

require("./db/db");




//!Express Rate limit and Express Slow Down
const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minutes
  delayAfter: 50, // allow 5 requests per 1 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

//!Security
app.disable('x-powered-by');

//!Express Plugins
app.use(compression());
app.use(cors());
app.use(speedLimiter);
app.use(helemt());
app.use(bodyParser.json());

//! All router are packaged in bootstrap.js
app.use("/api", require("./routes/bootstrap"));

//! Redirect all other routes
app.all("*", (req, res) => {
  return res.redirect("/api");
});

// !error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return res.status(403).send(err.message);

  // handle CSRF token errors here
  res.status(403);
  return res.send(err);
  //res.send("form tampered with");
});

//! Run the express Server
app.listen(process.env.port || 3000, () => {
  console.log(`Server running on port ${process.env.port || 3000}`);
});
