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
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Preference, { foreignKey: 'preference_id' });
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
      references: { model: 'preferences', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'preference_selections',
    modelName: 'PreferenceSelection',
  });
  return PreferenceSelection;
};