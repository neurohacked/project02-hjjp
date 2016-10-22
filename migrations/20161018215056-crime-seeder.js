'use strict';
var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var models = require("../models");

var dataCSV = 'Crime';
var tableCSV = dataCSV + 's';
var csvFile = __dirname + "/../db/" + dataCSV + ".csv";

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    fs.readFile(csvFile, "utf8", function(error, data) {
        var records = [];
        var rows = parse(data, {columns: true, auto_parse: true});
        for (var i = 0; i < rows.length; i++){
            for (var key in rows[i]){
                // console.log("key: " + key + " value: " + rows[i][key]);
                if (key == 'countryName') {
                    var location = rows[i][key];
                    var locationSplit = location.split(',');
                    if (locationSplit.length === 2) {
                        rows[i]['cityName'] = locationSplit[0];
                        rows[i]['stateName'] = null;
                        rows[i]['countryName'] = locationSplit[1];
                    } else if (locationSplit.length === 3) {
                        rows[i]['cityName'] = locationSplit[0];
                        rows[i]['stateName'] = locationSplit[1];
                        rows[i]['countryName'] = locationSplit[2];
                    } else {
                        rows[i]['cityName'] = null;
                        rows[i]['stateName'] = null;
                        rows[i]['countryName'] = null;
                    }
                }
                rows[i]['createdAt'] = Sequelize.literal('NOW()');
                rows[i]['updatedAt'] = Sequelize.literal('NOW()');
            }
            records.push(rows[i]);
        }
        // return models.Biologicals.bulkCreate(records);
        return queryInterface.bulkInsert(tableCSV, records, {});
    });

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    fs.readFile(csvFile, "utf8", function(error, data) {
        var records = [];
        var rows = parse(data, {columns: true, auto_parse: true});
        for (var i = 0; i < rows.length; i++){
            records.push(rows[i].rank);
        }
        // console.log(records);
        return models.Crimes.destroy({where:{index: records}});
    });
  }
};
