const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, GroupAllocation }) {
      this.belongsTo(Project, { foreignKey: 'project_id' });
      this.hasMany(GroupAllocation, { foreignKey: 'group_id' });
    }
  };
  Group.init({
    group_number: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'groups',
    modelName: 'Group',
  });
  return Group;
};