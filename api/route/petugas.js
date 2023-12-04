const express = require("express")
const router = express.Router()
const sequelize = require("../config")
const petugas = require("../models/petugas")
const {DataTypes} = require("sequelize")
const jwt = require("jsonwebtoken")
const api_key = process.env.jwt_secret_key
const Petugas = petugas(sequelize,DataTypes)
const bcrypt = require("bcrypt")

const generateId = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/petugas")
    .get(async(req,res) => {
        try{
            const allPetugas = await Petugas.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:allPetugas,
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
            const hashPassword = await bcrypt.hash(req.body.password,10)
            const createPetugas = await Petugas.create({
                ...req.body,
                id_petugas:generateId(),
                password:hashPassword
            })
            res.status(200).json({
                message:'data berhasil ditambahkan',
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

router.route("/petugas/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItems = await Petugas.findByPk(id)
            if(findItems){
                if(req.body.password){
                    const hashPassword = await bcrypt.hash(req.body.password,10)
                    findItems.update({
                        ...req.body,
                        password:hashPassword,
                    })
                }
                else{
                    findItems.update({
                        ...req.body
                    })
                }
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
            const findItem = await Petugas.findByPk(id)
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
            const id = req.params.id;
            const findItem = await Petugas.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil diambil',
                    data:findItem,
                    method:req.method,
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

router.route("/auth/petugas/:token")
    .get(async(req,res) => {
        try{
            const token = req.params.token
            let data = {}
            jwt.verify(token,api_key,(err,decoded) => {
                if(err){
                    res.status(500).json({
                        message:err,
                    })
                }
                else{
                    data = decoded
                   /*  res.status(200).json({
                        message:"Data ber45hasil diambil",
                        data:decoded,
                        method:req.method
                    }) */
                }
            })
            if(data){
                const datapetugas = await Petugas.findByPk(data.id)
                if(datapetugas){
                    res.status(200).json({
                        message:"Data berhasil diambil",
                        data:datapetugas,
                        method:req.method,
                        role:"petugas"
                    })
                }
                else{
                    res.status(404).json({ 
                        message:'Data tidak ditemukan',
                        method:req.method 
                    }) 	
                }
            }
        }
        catch(e){

        }
    })

module.exports = router