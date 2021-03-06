"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PreferenceCategory, PreferenceSelection }) {
      this.belongsTo(PreferenceCategory, { foreignKey: 'preference_category_id' });
      this.hasMany(PreferenceSelection, { foreignKey: 'preference_id' });
    }
  }
  Preference.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          max: 32,
          is: ["[a-z]", "i"],
        },
      },
      preference_category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "preference_categories", key: "id" },
      },
    },
    {
      sequelize,
      tableName: "preferences",
      modelName: "Preference",
    }
  );
  return Preference;
};
