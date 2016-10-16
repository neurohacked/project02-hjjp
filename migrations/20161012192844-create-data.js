// INITIAL MIGRATION
// This is the 0-state of the data table.
// When executed, the table will be created.

// This is also what sequelize db:migrate will refer to
// as the base schema. All undos revert to this.

"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('data', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        data_name: Sequelize.STRING,
        location: Sequelize.STRING,
        risk: Sequelize.INTEGER,
        exists: {type: Sequelize.BOOLEAN, default: false},
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('data');
  }
};
