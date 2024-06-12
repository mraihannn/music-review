const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password, salt),
  comparePassword: (password, dbPassword) =>
    bcrypt.compareSync(password, dbPassword),
};
