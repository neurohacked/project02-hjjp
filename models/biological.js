'use strict';
module.exports = function(sequelize, DataTypes) {
  var biologicals = sequelize.define('biologicals', {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    countryName: DataTypes.STRING,
    ISO: DataTypes.STRING,
    location: DataTypes.STRING,
    dissasterType: DataTypes.STRING,
    dissasterSubtype: DataTypes.STRING,
    totalDeaths: DataTypes.INTEGER,
    totalAffected: DataTypes.INTEGER,
    disasterID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return biologicals;
};
