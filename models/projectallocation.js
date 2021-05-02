const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectAllocation extends Model {
    static associate({ User, Project }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Project, { foreignKey: 'project_id' });
    }
  };
  ProjectAllocation.init({
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "projects", key: "id" },
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    }
  }, {
    sequelize,
    tableName: "project_allocations",
    modelName: 'ProjectAllocation',
  });
  return ProjectAllocation;
};