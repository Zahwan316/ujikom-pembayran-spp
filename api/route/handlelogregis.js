require("dotenv").config()
const express = require("express")
const router = express.Router()
const sequelize = require("../config")
const petugas = require("../models/petugas")
const {DataTypes} = require("sequelize")
const bcrypt = require("bcrypt")
const api_key = process.env.jwt_secret_key
const jwt = require("jsonwebtoken")
const {v4:uuidv4} = require("uuid")
const siswa = require("../models/siswa")

const Petugas = petugas(sequelize,DataTypes)
const Siswa = siswa(sequelize,DataTypes)

router.route("/login")
    .post(async(req,res) => {   
        try{
            const {username,password} = req.body
            const user = await Petugas.findOne({where:{username}})
            if(!user){
                res.status(404).json({
                    message:"Akun tidak ditemukan",
                    method:req.method
                })
            }
            else{
                const passwordisvalid = await bcrypt.compare(password,user.password)
                if(passwordisvalid){
                    const token = jwt.sign({id:user.id_petugas,username:user.username},api_key,{expiresIn:'1h'})
                    res.status(200).json({
                        message:'Berhasil Login',
                        token:token,
                        method:req.method,
                    })
                }
                else{
                    res.status(400).json({ 
                        message:'Password atau username salah',
                        method:req.method 
                    }) 	
                }
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

router.route("/login_siswa")
    .post(async(req,res) => {   
        try{
            const {nisn,password} = req.body
            const user = await Siswa.findOne({where:{nisn}})
            if(!user){
                res.status(404).json({
                    message:"Akun tidak ditemukan",
                    method:req.method
                })
            }
            else{
                const passwordisvalid = await bcrypt.compare(password,user.password)
                if(passwordisvalid){
                    const token = jwt.sign({id:user.nisn,username:user.nama},api_key,{expiresIn:'1h'})
                    res.status(200).json({
                        message:'Berhasil Login',
                        token:token,
                        method:req.method,
                    })
                }
                else{
                    res.status(400).json({ 
                        message:'Password atau nisn salah',
                        method:req.method 
                    }) 	
                }
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

router.route("/register")
    .post(async(req,res) => {
        try{
            const {username,password} = req.body
            const hashPassword = await bcrypt.hash(password,10)
            const rand_int = Math.floor(Math.random() * 999999)

            const user = await Petugas.create({
                ...req.body,
                id_petugas:rand_int,
                password:hashPassword,
                
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

module.exports = router