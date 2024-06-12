const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  signToken: (payload) => jwt.sign(payload, secret),
  verifyToken: (token) => jwt.verify(token, secret),
};
