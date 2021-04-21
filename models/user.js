'use strict';

const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['encrypted_password'];

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, GroupAllocation }) {
      this.hasMany(Project, { foreignKey: 'created_by' });
      this.hasMany(GroupAllocation);
    }

    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
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
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};