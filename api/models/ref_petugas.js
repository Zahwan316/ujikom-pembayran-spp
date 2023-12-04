const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_petugas', {
    id_ref_petugas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'ref_petugas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ref_petugas_pkey",
        unique: true,
        fields: [
          { name: "id_ref_petugas" },
        ]
      },
    ]
  });
};
