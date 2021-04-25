const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await model.PreferenceCategory.findOrCreate({
      where: { name: "programming languages" },
      defaults: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await model.PreferenceCategory.findOrCreate({
      where: { name: "frameworks" },
      defaults: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await model.PreferenceCategory.findOrCreate({
      where: { name: "soft skills" },
      defaults: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("preference_categories", null, {});
  },
};
