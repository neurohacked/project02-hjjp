'use strict';
var fs = require('fs'),
parse = require('csv-parse/lib/sync');
var models = require("../models");

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    fs.readFile('./db/Biological.csv', "utf8", function(error, data) {
        var records = [];
        var rows = parse(data, {columns: true, auto_parse: true});
        for (var i = 0; i < rows.length; i++){
            for (var key in rows[i]){
                // console.log("key: " + key + " value: " + rows[i][key]);
                if (rows[i][key] == '') {
                    if ((key === 'totalDeaths') || (key === 'totalAffected')) {
                        rows[i][key] = 0;
                    } else {
                        rows[i][key] = null;
                    }
                }
                if ((key == 'startDate') || (key == 'endDate')) {
                    var dmydate = rows[i][key];
                    var date = dmydate.split('/');
                    if (parseInt(date[2]) < 17) {
                        date[2] = parseInt(date[2]) + 2000;
                    } else {
                        if (parseInt(date[2]) < 1970) {
                            date[2] = parseInt(date[2]) + 1900;
                        }
                    }
                    var str = "" + date[1];
                    var pad = "00"
                    var month = pad.substring(0, pad.length - str.length) + str
                    if (((key == 'startDate') || (key == 'endDate')) && (date[0] == 0)) {
                        date[0] = 1;
                    }
                    var str = "" + date[0];
                    var day = pad.substring(0, pad.length - str.length) + str
                    rows[i][key] = month.toString() + "/" + day.toString() + "/" + date[2].toString();
                }
            }
            records.push(rows[i]);
            // console.log(rows[i]);
        }
        // return models.biologicals.bulkCreate(records);
        return queryInterface.bulkInsert('biologicals', records, {});
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    fs.readFile('../db/Biological.csv', "utf8", function(error, data) {
        var records = [];
        var rows = parse(data, {columns: true, auto_parse: true});
        for (var i = 0; i < rows.length; i++){
            records.push(rows[i].dissasterID);
        }
        // console.log(records);
        return models.biologicals.destroy({where:{disasterID: records}});
    });
  }
};
