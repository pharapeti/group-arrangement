'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupAllocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group, User }) {
      this.belongsTo(Group);
      this.belongsTo(User);
    }
  };
  GroupAllocation.init({
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Groups', key: 'id' }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'GroupAllocation',
  });
  return GroupAllocation;
};