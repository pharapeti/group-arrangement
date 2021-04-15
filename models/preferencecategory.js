"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PreferenceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreferenceCategory.init(
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          max: 1000,
          //isNumeric: false, // ask patrice why this validation is failing
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: "preference_categories",
      modelName: "PreferenceCategory",
    }
  );
  return PreferenceCategory;
};
