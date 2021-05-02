const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    model.ProjectAllocation.create({
      user_id: (await model.User.findOne()).id,
      project_id: (await model.Project.findOne()).id,
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch(err => console.log(err.message));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("project_allocations", null, {});
  }
};
