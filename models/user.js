"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      user.hasOne(models.profile, {
        as: "profiles",
        foreignKey: {
          name: "idUser",
        },
      });

      user.belongsToMany(models.product, {
        as: "productsCart",
        // through is required in this association
        through: {
          model: "cart", // this is "bridge" table
          as: "bridge",
        },
        foreignKey: "idUser",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
