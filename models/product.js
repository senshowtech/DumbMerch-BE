"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      product.belongsToMany(models.user, {
        as: "cartUser",
        // through is required in this association
        through: {
          model: "cart", // this is "bridge" table
          as: "bridge",
        },
        foreignKey: "idProduct",
      });
    }
  }
  product.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      kurir: DataTypes.JSON,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
