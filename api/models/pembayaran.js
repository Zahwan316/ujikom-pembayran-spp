const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pembayaran', {
    id_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_petugas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nisn: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tgl_bayar: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    bulan_dibayar: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    tahun_dibayar: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jumlah_bayar: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pembayaran',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pembayaran_pkey",
        unique: true,
        fields: [
          { name: "id_pembayaran" },
        ]
      },
    ]
  });
};
