const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupAllocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group, User }) {
      this.belongsTo(Group, { foreignKey: 'group_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  };
  GroupAllocation.init({
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'groups', key: 'id' }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'group_allocations',
    modelName: 'GroupAllocation',
  });
  return GroupAllocation;
};