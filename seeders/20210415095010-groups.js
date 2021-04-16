"use strict";

const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const projects = await model.Project.findAll();

    for (var i = 0; i < projects.length; i++) {
      await model.Group.create({
        group_number: 1,
        project_id: projects[Object.keys(projects)[i]].id,
      });
      await model.Group.create({
        group_number: 2,
        project_id: projects[Object.keys(projects)[i]].id,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("groups", null, {});
  },
};
