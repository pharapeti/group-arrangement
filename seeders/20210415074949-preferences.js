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

    await model.Preference.create({
      name: "Javascript",
      preference_category_id: preference_category_programming.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "Python",
      preference_category_id: preference_category_programming.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "C",
      preference_category_id: preference_category_programming.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "React",
      preference_category_id: preference_category_framework.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "Django",
      preference_category_id: preference_category_framework.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "Communication",
      preference_category_id: preference_category_soft.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await model.Preference.create({
      name: "Leadership",
      preference_category_id: preference_category_soft.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("preferences", null, {});
  },
};
