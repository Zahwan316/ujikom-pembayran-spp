const express = require("express")
const router = express.Router()
const sequelize = require("../config")
const petugas = require("../models/petugas")
const {DataTypes} = require("sequelize")
const refpetugas = require("../models/ref_petugas")
const RefPetugas = refpetugas(sequelize,DataTypes)

router.route("/ref_petugas")
    .get(async(req,res) => {
        try{
            const findAll = await RefPetugas.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:findAll,
                method:req.method,
            })
            
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

module.exports = router