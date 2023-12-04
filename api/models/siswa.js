const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('siswa', {
    nisn: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    nis: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    no_telp: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'siswa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "siswa_pkey",
        unique: true,
        fields: [
          { name: "nisn" },
        ]
      },
    ]
  });
};
