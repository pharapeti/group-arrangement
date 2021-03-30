'use strict';
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
    static associate(models) {
      // define association here
    }
  };
  Group.init({
    group_number: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    project_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};