import React, { useState, useEffect } from 'react';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import ModalComponent from 'src/components/modal/modal';
import SiswaFormComponent from 'src/form/siswaform';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid";
import Swal from 'sweetalert2';
import validator from "validator"

const SiswaView = () => {
  const tablehead = [
    "NISN",
    "NIS",
    "Nama",
    "Kelas",
    "Alamat",
    "SPP",
  ]
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const [modal,setmodal] = useState(false);
  const [editedid,seteditedid] = useState();
  const [typeform,settypeform] = useState();
  const [updater,setupdater] = useState();
  const [isload,setisload] = useState(false)
  const [forminput,setforminput,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [success,setsuccess] = useState(false)
  const [errors,seterrors] = useFormStore((state) => [state.error,state.seterror])

  const handleModal = () => {
    setmodal(!modal)

    modal === false && resetform()
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const validateInput = () => {
    const error = {}

    if(!forminput.nisn){
      error.nisn = "NISN tidak boleh kosong"
    }
    else if(!validator.isLength(forminput.nisn,{min:10})){
      error.nisn = "NISN kurang dari 10"
    }

    if(!forminput.nis){
      error.nis = "NIS tidak boleh kosong"
    }
    else if(!validator.isLength(forminput.nis,{min:8})){
      error.nis = "NIS kurang dari 8"
    }

    seterrors(error)
    return Object.keys(error).length === 0
  }

  const handleCrud = async(method,id) => {
    try{
      if(validateInput()){
        let res 
        switch(method){
          case "post":
              res = await axios.post(`${import.meta.env.VITE_API_URL}siswa`,forminput)
              break;
          case "put":
              res = await axios.put(`${import.meta.env.VITE_API_URL}siswa/${id}`,forminput)
              break;
          case "delete":
              res = await axios.delete(`${import.meta.env.VITE_API_URL}siswa/${id}`)
              break;
        }
        setupdater(uuidv4())
        setisload(true)
        setsuccess(true)
        resetform()
        setTimeout(() => {
          setisload(false)
        },500)
        setTimeout(() => {
          setsuccess(false)
        },1500)
        setmodal(false)

      }
    }
    catch(e){
      console.log(e)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if(typeform === "add"){
        handleCrud("post","")
    }
    else if(typeform === "edit"){
        handleCrud("put",editedid)
    }
  }

  useEffect(() => {
    const getData = async() => {
      try{
        if(Object.keys(siswa).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}siswa`)
          setsiswa(res.data.data)
        }
        if(Object.keys(spp).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}spp`)
          setspp(res.data.data)
        }
        if(Object.keys(kelas).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}kelas`)
          setkelas(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async() => {
      try{
        if(isload){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}siswa`)
          setsiswa(res.data.data)

          let res_spp = await axios.get(`${import.meta.env.VITE_API_URL}spp`)
          setspp(res_spp.data.data)

          let res_kelas = await axios.get(`${import.meta.env.VITE_API_URL}kelas`)
          setkelas(res_kelas.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getData()
  },[updater])

  useEffect(() => {
    const getData = async() => {
      try{
        if(editedid && typeform === "edit"){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}siswa/${editedid}`)
          const data = res.data.data
          for(const key in data){
            if(key !== "password"){
              setforminput(key, data[key])
            }
          }
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getData()
  },[editedid])

  return(
    <>
      <TableMainComponent 
        title="Siswa"
        page="siswa"
        tablehead={tablehead}
        handlemodal={handleModal}
        gettypebtn={getTypeBtn}
        handlecrud={handleCrud}
        success={success}
        typeform={typeform}
      />

      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          body={<SiswaFormComponent />}
          title={typeform === "add" ? "Tambah Siswa" : "Edit Siswa"}
          handlesubmit={handleSubmit}
        />
      }
    </>
  )
}

export default SiswaView;