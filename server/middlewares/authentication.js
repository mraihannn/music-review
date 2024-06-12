const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const CustomError = require("../utils/CustomError");

async function Authentication(req, res, next) {
  try {
    const { author } = req.headers;

    if (!author) {
      throw new CustomError("Unathorized");
    }

    const token = author.split(" ")[1];

    const { id } = verifyToken(token);

    const user = await User.findByPk(id);

    if (!user) throw new CustomError("Unathorized");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = Authentication;
