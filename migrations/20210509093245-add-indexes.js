module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addIndex('group_allocations', ['group_id', 'user_id'], {
      unique: true,
      name: 'unique_index_group_allocation'
    });

    queryInterface.addIndex('project_allocations', ['project_id', 'user_id'], {
      unique: true,
      name: 'unique_index_project_allocation'
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeIndex('group_allocations', 'unique_index_group_allocation');
    queryInterface.removeIndex('project_allocations', 'unique_index_project_allocation');
  }
};
