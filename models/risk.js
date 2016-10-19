'use strict';
module.exports = function(sequelize, DataTypes) {
    var Risk = sequelize.define('Risk', {
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        factor: DataTypes.INTEGER
    }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
        classMethods: {
            associate: function(models) {
            // associations can be defined here
                // Risk.hasMany(models.Biological);
                // Risk.hasMany(models.Climatological);
                // Risk.hasMany(models.Geophysical);
                // Risk.hasMany(models.Hydrological);
                Risk.hasMany(models.Metrological);
            }
        }
    });
    return Risk;
};
