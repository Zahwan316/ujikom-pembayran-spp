const express = require("express")
const Sequelize = require("../config")
const {DataTypes} = require("sequelize");
const router = express.Router()
const pembayaran = require("../models/pembayaran")
const {v4:uuidv4} = require("uuid")

const Pembayaran = pembayaran(Sequelize,DataTypes)
const generateId = () => {
    return Math.floor(Math.random() * 99999999)
}

router.route("/pembayaran")
    .get(async(req,res) => {
        try{
            const findAll = await Pembayaran.findAll()
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
    .post(async(req,res) => {
        try{
            const sendata = await Pembayaran.create({
                ...req.body,
                id_pembayaran:generateId(),
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

router.route("/pembayaran/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Pembayaran.findByPk(id)
            if(findItem){
                findItem.update({
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
            const findItem = await Pembayaran.findByPk(id)
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
            const findItem = await Pembayaran.findAll(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil ditambahkan',
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

router.route("/history/delete")
    .delete(async(req,res) => {
        try{
            const deleteAll = await Pembayaran.destroy({
                where:{},
                truncate:true
            });
            res.status(200).json({
                message:'Semua Data berhasil dihapus',
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

router.route("/history/:nisn")
    .get(async(req,res) => {
        try{
            const nisn = req.params.nisn
            const findHistoryUser = await Pembayaran.findAll({where:{nisn:nisn}})
            if(findHistoryUser){
                res.status(200).json({
                    message:'Data berhasil diambil1',
                    data:findHistoryUser,
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