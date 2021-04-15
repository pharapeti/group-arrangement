"use strict";

const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await model.PreferenceCategory.create({
      name: "programming languages",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await model.PreferenceCategory.create({
      name: "frameworks",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await model.PreferenceCategory.create({
      name: "soft skills",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("preference_categories", null, {});
  },
};
