const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectRequirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, PreferenceCategory }) {
      this.belongsTo(Project, { foreignKey: 'project_id' });
      this.belongsTo(PreferenceCategory, { foreignKey: 'preference_category_id' });
    }
  };
  ProjectRequirement.init({
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' }
    },
    preference_category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'preference_categories', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'project_requirements',
    modelName: 'ProjectRequirement',
  });
  return ProjectRequirement;
};