// INITIAL MIGRATION
// This is the 0-state of the locations table.
// When executed, the table will be created.

// This is also what sequelize db:migrate will refer to
// as the base schema. All undos revert to this.

"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('locations', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        address: Sequelize.STRING,
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        risk: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('locations');
  }
};
