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
        var rows = parse(data, {columns: true});
        for (var i = 1; i < rows.length; i++){
            records.push(rows[i]);
        }
        console.log(records);
        return models.biologicals.bulkCreate(records);
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
        var rows = parse(data, {columns: true});
        for (var i = 1; i < rows.length; i++){
            records.push(rows[i].dissasterID);
        }
        console.log(records);
        return models.biologicals.destroy({where:{dissasterID: records}});
    });
  }
};
