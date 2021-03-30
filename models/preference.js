'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Preference.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        max: 32,
        is: ["[a-z]",'i']
      }
    },
    project_category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'PreferenceCategories', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};