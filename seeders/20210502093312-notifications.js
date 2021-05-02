const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const to = await model.User.findOne({ where: { user_type: 1 }});
    const from = await model.User.findOne({ where: { user_type: 2 }});

    await model.Notification.create({
      to: to.id,
      from: from.id,
      message: 'You have been removed from Group 19 of Project: NASA',
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notifications", null, {});
  }
};
