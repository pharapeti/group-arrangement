'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectRequirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' }
      },
      preference_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'PreferenceCategories', key: 'id' }
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
    await queryInterface.dropTable('ProjectRequirements');
  }
};