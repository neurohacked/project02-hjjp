'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('biologicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      countryName: {
        type: Sequelize.STRING
      },
      ISO: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      dissasterType: {
        type: Sequelize.STRING
      },
      dissasterSubtype: {
        type: Sequelize.STRING
      },
      totalDeaths: {
        type: Sequelize.INTEGER
      },
      totalAffected: {
        type: Sequelize.INTEGER
      },
      disasterID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('biologicals');
  }
};
