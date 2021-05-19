"use strict";

const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const group_allocations = await model.GroupAllocation.findAll();
    console.log(group_allocations);

    for (let i = 0; i < group_allocations.length; i++){
      console.log("Test1")
      //console.log(group_allocations.id)
      //let user_user_id = group_allocations[i].user_id
      let user_user_id = group_allocations[Object.keys(group_allocations)[i]].user_id
      let user_group_id = group_allocations[Object.keys(group_allocations)[i]].group_id
      let user_group = await model.Group.findOne({where: {id: user_group_id}});
      let user_projcet_id = user_group.project_id
      await model.ProjectAllocation.findOrCreate({
        where: {
          user_id: user_user_id,
          project_id: user_projcet_id,
        }
      })
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("project_allocations", null, {});
  }
};
