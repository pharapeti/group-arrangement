'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreferenceSelection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Preference }) {
      this.belongsTo(User);
      this.belongsTo(Preference);
    }
  };
  PreferenceSelection.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    preference_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Preferences', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'PreferenceSelection',
  });
  return PreferenceSelection;
};