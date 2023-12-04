const express = require("express");
const Sequelize = require("../config")
const {DataTypes} = require("sequelize");
const router = express.Router()
const siswa = require("../models/siswa")
const bcrypt = require("bcrypt")
const Siswa = siswa(Sequelize,DataTypes)
const jwt = require("jsonwebtoken")
const api_key = process.env.jwt_secret_key
const generateID = () => {
    return Math.floor(Math.random() * 99999)
}

router.route("/siswa")
    .get(async(req,res) => {
        try{
            const getUser = await Siswa.findAll()

            res.status(200).json({
                message:'data berhasil diambil',
                data:getUser,
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

            const addSiswa = await Siswa.create({
                ...req.body,
                id_siswa:generateID(),
                password:hashPassword
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

router.route("/siswa/:nisn")
    .put(async(req,res) => {
        try{
            const nisn = req.params.nisn
            const findSiswa = await Siswa.findByPk(nisn)

            if(findSiswa){
                if(req.body.password){
                    const hashPassword = await bcrypt.hash(req.body.password,10)
                    findSiswa.update({
                        ...req.body,
                        password:hashPassword,
                    })
                }
                else{
                    findSiswa.update({
                        ...req.body,
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
            const nisn = req.params.nisn
            const findSiswa = await Siswa.findByPk(nisn)
            if(findSiswa){
                findSiswa.destroy()
                res.status(200).json({
                    message:'',
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
            const nisn = req.params.nisn;
            const findSiswa = await Siswa.findByPk(nisn)
            if(findSiswa){
                res.status(200).json({
                    message:'Data berhasil diedit',
                    data:findSiswa,
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

router.route("/auth/siswa/:token")
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
                    })   */
                }
            })
            if(data){
                const datasiswa = await Siswa.findByPk(data.id)
                if(datasiswa){
                    res.status(200).json({
                        message:"Data berhasil diambil",
                        data:datasiswa,
                        method:req.method,
                        role:"siswa"
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