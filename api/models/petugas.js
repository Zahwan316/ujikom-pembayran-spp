const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('petugas', {
    id_petugas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    nama_petugas: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'petugas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "petugas_pkey",
        unique: true,
        fields: [
          { name: "id_petugas" },
        ]
      },
    ]
  });
};
