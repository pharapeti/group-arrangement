'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectRequirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProjectRequirement.init({
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'id' }
    },
    preference_category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'PreferenceCategories', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'project_requirements',
    modelName: 'ProjectRequirement',
  });
  return ProjectRequirement;
};