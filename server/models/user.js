"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Email is required",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required",
          },
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          len: {
            args: [5, 255],
            msg: "Minimal password is 5 character",
          },
        },
      },
      goodgleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
