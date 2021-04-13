"use strict";

const { default: userEvent } = require("@testing-library/user-event");
const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        user_type: 2,
        first_name: "Admo",
        last_name: "Adminyan",
        external_id: "external_admin",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log(sequelize);
    console.log(Sequelize);
    console.log(sequelize.Model);

    const user = await sequelize.Model.User.findOne({
      where: { user_type: 2 },
    });

    return await queryInterface.bulkInsert("projects", [
      {
        name: "Next Facebook",
        max_group_size: 6,
        created_by: user,
      },
      {
        name: "Next Amazon",
        max_group_size: 6,
        created_by: user,
      },
      {
        name: "Next NASA",
        max_group_size: 6,
        created_by: user,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("projects", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
