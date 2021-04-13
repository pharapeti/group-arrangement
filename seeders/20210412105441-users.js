"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        user_type: 1,
        first_name: "John",
        last_name: "Doe",
        external_id: "something",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: 1,
        first_name: "Poghos",
        last_name: "Poghosyan",
        external_id: "something1",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: 1,
        first_name: "Petros",
        last_name: "Petrosyan",
        external_id: "something2",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: 1,
        first_name: "Mukuch",
        last_name: "Muckuchyan",
        external_id: "something3",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: 1,
        first_name: "Gevorg",
        last_name: "Gevorgyan",
        external_id: "something4",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type: 2,
        first_name: "Andrew",
        last_name: "Smith",
        external_id: "something5",
        encrypted_password: "$321!pass!123$",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
