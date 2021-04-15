"use strict";

const { default: userEvent } = require("@testing-library/user-event");
const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const project_owner = await model.User.create({
      user_type: 2,
      first_name: "Admo",
      last_name: "Adminyan",
      external_id: "external_admin",
      encrypted_password: "$321!pass!123$",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Project.findOrCreate({
      where: { name: "Next Facebook" },
      defaults: {
        max_group_size: 6,
        created_by: project_owner.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    model.Project.findOrCreate({
      where: { name: "Next Amazon" },
      defaults: {
        max_group_size: 6,
        created_by: project_owner.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    model.Project.findOrCreate({
      where: { name: "Next NASA" },
      defaults: {
        max_group_size: 6,
        created_by: project_owner.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("projects", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
