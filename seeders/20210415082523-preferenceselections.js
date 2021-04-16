"use strict";

const model = require("../models/index");

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = await model.User.findAll({
      where: { user_type: 1 },
    });

    // console.log(students);
    // console.log(students[Object.keys(students)[1]]);

    const langauges = await model.PreferenceCategory.findOne({
      where: { name: "programming languages" },
    });

    const preferences_lang = await model.Preference.findAll({
      where: { preference_category_id: langauges.id },
    });

    const frameworks = await model.PreferenceCategory.findOne({
      where: { name: "frameworks" },
    });

    const preferences_frame = await model.Preference.findAll({
      where: { preference_category_id: frameworks.id },
    });

    const soft = await model.PreferenceCategory.findOne({
      where: { name: "soft skills" },
    });

    const preferences_soft = await model.Preference.findAll({
      where: { preference_category_id: soft.id },
    });

    for (var i = 0; i < students.length; i++) {
      await model.PreferenceSelection.create({
        user_id: students[Object.keys(students)[i]].id,
        preference_id: randomProperty(preferences_lang).id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await model.PreferenceSelection.create({
        user_id: students[Object.keys(students)[i]].id,
        preference_id: randomProperty(preferences_frame).id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await model.PreferenceSelection.create({
        user_id: students[Object.keys(students)[i]].id,
        preference_id: randomProperty(preferences_soft).id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("preference_selections", null, {});
  },
};
