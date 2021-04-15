"use strict";

const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const project = await model.Project.findOne({
      where: { name: "Next Facebook" },
    });

    const preference_category = await model.PreferenceCategory.findOne({
      where: { name: "frameworks" },
    });

    await model.ProjectRequirement.create({
      project_id: project.id,
      preference_category_id: preference_category.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("project_requirements", null, {});
  },
};
