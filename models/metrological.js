'use strict';
module.exports = function(sequelize, DataTypes) {
  var Metrological = sequelize.define('Metrological', {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    countryName: DataTypes.STRING,
    ISO: DataTypes.STRING,
    location: DataTypes.TEXT,
    disasterType: DataTypes.TEXT,
    disasterSubtype: DataTypes.TEXT,
    totalDeaths: DataTypes.INTEGER,
    totalAffected: DataTypes.INTEGER,
    disasterID: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        field: 'beginTime',
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'beginTime',
        defaultValue: sequelize.literal('NOW()')
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Metrological;
};