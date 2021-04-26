const model = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const preference_category_framework = await model.PreferenceCategory.findOne(
      {
        where: { name: "frameworks" },
      }
    );

    const preference_category_programming = await model.PreferenceCategory.findOne(
      {
        where: { name: "programming languages" },
      }
    );

    const preference_category_soft = await model.PreferenceCategory.findOne({
      where: { name: "soft skills" },
    });

    await model.Preference.findOrCreate({
      where: {
        name: "Javascript",
        preference_category_id: preference_category_programming.id,
      },
      defults: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "Python" },
      defaults: {
        preference_category_id: preference_category_programming.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "C" },
      defaults: {
        preference_category_id: preference_category_programming.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "React" },
      defaults: {
        preference_category_id: preference_category_framework.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "Django" },
      defaults: {
        preference_category_id: preference_category_framework.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "Communication" },
      defaults: {
        preference_category_id: preference_category_soft.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await model.Preference.findOrCreate({
      where: { name: "Leadership" },
      defaults: {
        preference_category_id: preference_category_soft.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("preferences", null, {});
  },
};
