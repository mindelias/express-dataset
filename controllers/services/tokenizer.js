const jwt = require("jsonwebtoken");

const issue = (payload) =>
  jwt.sign(payload, process.env.jwtSecret, { expiresIn: 86400 });
const verify = (token, cb) => jwt.verify(token, process.env.jwtSecret, cb);

module.exports = {
  issue,
  verify,
};
