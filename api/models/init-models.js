var DataTypes = require("sequelize").DataTypes;
var _siswa = require("./siswa");

function initModels(sequelize) {
  var siswa = _siswa(sequelize, DataTypes);


  return {
    siswa,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
