'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Biologicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      endDate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      countryName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ISO: {
        allowNull: true,
        type: Sequelize.STRING
      },
      location: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      disasterType: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      disasterSubtype: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      totalDeaths: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalAffected: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      disasterID: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Biologicals');
  }
};
