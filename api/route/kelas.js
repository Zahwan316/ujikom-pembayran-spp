const express = require("express");
const Sequelize = require("../config")
const {DataTypes} = require("sequelize");
const router = express.Router()
const kelas =require("../models/kelas")

const Kelas = kelas(Sequelize, DataTypes)
const generateID = () => {
    return Math.floor(Math.random() * 99999)
}

router.route("/kelas")
    .get(async(req,res) => {
        try{
            const alldata = await Kelas.findAll()
            res.status(200).json({
                message:'data berhasil diambil',
                data:alldata,
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
            const createData = await Kelas.create({
                ...req.body,
                id_kelas:generateID(),
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

router.route("/kelas/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItems = await Kelas.findByPk(id)
            if(findItems){
                findItems.update({
                    ...req.body
                })
                res.status(200).json({
                    message:'Data berhasil diedit',
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
            const id = req.params.id
            const findItem = await Kelas.findByPk(id)
            if(findItem){
                findItem.destroy()
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
            const findItems = await Kelas.findByPk(id)
            if(findItems){
                res.status(200).json({
                    message:'data berhasil diambil',
                    data:findItems,
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