'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, GroupAllocation }) {
      this.hasMany(Project);
      this.hasMany(GroupAllocation);
    }
  };
  User.init({
    user_type: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    external_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    encrypted_password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};