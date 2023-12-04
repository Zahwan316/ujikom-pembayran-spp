const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas', {
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_kelas: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    kompetensi_keahlian: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kelas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kelas_pkey",
        unique: true,
        fields: [
          { name: "id_kelas" },
        ]
      },
    ]
  });
};
