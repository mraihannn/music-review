"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Review.init(
    {
      userId: DataTypes.INTEGER,
      spotifyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "SpotifyId is required",
          },
          notEmpty: {
            args: true,
            msg: "SpotifyId is required",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Rating is required",
          },
          notEmpty: {
            args: true,
            msg: "Rating is required",
          },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Comment is required",
          },
          notEmpty: {
            args: true,
            msg: "Comment is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
