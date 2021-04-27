const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = await model.User.findAll({ where: { user_type: 1 } });
    const groups = await model.Group.findAll();

    for (var i = 0; i < students.length; i++) {
      for (var j = 1; j < 6; j += 2) {
        await model.GroupAllocation.findOrCreate({
          where: {
            group_id: groups[Object.keys(groups)[j]].id,
            user_id: students[Object.keys(students)[i]].id,
          },
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("group_allocations", null, {});
  },
};
