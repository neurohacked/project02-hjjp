'use strict';
module.exports = function(sequelize, DataTypes) {
  var Crime = sequelize.define('Crime', {
    rank: DataTypes.INTEGER,
    cityName: DataTypes.STRING,
    stateName: DataTypes.STRING,
    countryName: DataTypes.STRING,
    crimeIndex: DataTypes.FLOAT,
    safetyIndex: DataTypes.FLOAT,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Crime;
};
