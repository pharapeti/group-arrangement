"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group, User, ProjectRequirement }) {
      this.belongsTo(User, { foreignKey: 'created_by' });
      this.hasMany(Group, { foreignKey: 'project_id' });
      this.hasMany(ProjectRequirement, { foreignKey: 'project_id' });
    }
  }
  Project.init(
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          max: 32,
          is: ["[a-z]", "i"],
        },
      },
      max_group_size: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          max: 32,
        },
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
    },
    {
      sequelize,
      tableName: "projects",
      modelName: "Project",
    }
  );
  return Project;
};
