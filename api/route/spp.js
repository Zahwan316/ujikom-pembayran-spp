const express = require("express");
const Sequelize = require("../config")
const {DataTypes} = require("sequelize");
const router = express.Router()
const spp = require("../models/spp")

const Spp = spp(Sequelize,DataTypes)
const generateId = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/spp")
    .get(async(req,res) => {
        try{    
            const allData = await Spp.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:allData,
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
    .post(async(req,res) => {
        try{
            const createData = await Spp.create({
                ...req.body,
                id_spp:generateId(),
            })
            res.status(200).json({
                message:'Data berhasil ditambahkan',
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

router.route("/spp/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Spp.findByPk(id)
            if(findItem){
               findItem.update({
                ...req.body,
               }) 
               res.status(200).json({
                message:'data berhasil diedit',
                method:req.method,
               })
               
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.params.id;
            const findItem = await Spp.findByPk(id);
            if(findItem){
                findItem.destroy();
                res.status(200).json({
                    message:'Data berhasil dihapus',
                    method:req.method,
                })
                
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }

        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
    .get(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Spp.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil diambil',
                    data:findItem,
                    method:req.method,
                })
                
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
module.exports = router