'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Crimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rank: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      cityName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      stateName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      countryName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      crimeIndex: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      safetyIndex: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Crimes');
  }
};
