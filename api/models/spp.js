const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spp', {
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spp',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "spp_pkey",
        unique: true,
        fields: [
          { name: "id_spp" },
        ]
      },
    ]
  });
};
