'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          max: 32,
          is: ["[a-z]",'i']
        }
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          max: 32,
          is: ["[a-z]",'i']
        }
      },
      external_id: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          max: 32,
          is: ["[0-9]",'i']
        }
      },
      encrypted_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};