const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'to' });
      this.belongsTo(User, { foreignKey: 'from' });
    }
  };

  Notification.init({
    message: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        max: 128
      }
    },
    from: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    to: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'notifications',
    modelName: 'Notification',
  });
  return Notification;
};
