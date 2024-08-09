import React, { useState, useEffect } from 'react';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import ModalComponent from 'src/components/modal/modal';
import PetugasFormComponent from 'src/form/petugasform';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';

const PetugasView = () => {
  const [petugas,setpetugas,refpetugas,setrefpetugas] = useItemStore((state) => [state.petugas,state.setpetugas,state.refpetugas,state.setrefpetugas])
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [modal,setmodal] = useState(false)
  const [forminput,setforminput,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)


  const tablehead = [
    "Username",
    "Nama Petugas",
    "Role",
  ]

  const getTypeBtn = (typebtn,id) => {
    seteditedid(id)
    settypeform(typebtn)
  }

  const handleModal = () => {
    setmodal(!modal)
  }

  const handleCrud = async(method,id) => {
    try{
      let res;
      switch(method){
          case "post":
              res = await axios.post(`${import.meta.env.VITE_API_URL}petugas`,forminput);
              break;
          case "put":
              res = await axios.put(`${import.meta.env.VITE_API_URL}petugas/${id}`,forminput);
              break;
          case "delete":
              res = await axios.delete(`${import.meta.env.VITE_API_URL}petugas/${id}`);
              break;
      }
      setupdater(uuidv4());
      setisload(true);
      resetform()
      setTimeout(() => {
        setisload(false)
      }, 500);
      Swal.fire(
        `Petugas berhasil ${typeform === "add" ? "ditambahkan" : (typeform === "edit" ? "diedit" : "dihapus")}`
      )
    }
    catch(e){
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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
        if(Object.keys(petugas).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}petugas`)
          setpetugas(res.data.data)
        }
        if(Object.keys(refpetugas).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}ref_petugas`)
          setrefpetugas(res.data.data)
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
          let res = await axios.get(`${import.meta.env.VITE_API_URL}petugas`)
          setpetugas(res.data.data)
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
          let res = await axios.get(`${import.meta.env.VITE_API_URL}petugas/${editedid}`)
          const data = res.data.data
          for(const key in data){
            if(key != "password"){
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
        tablehead={tablehead}
        title="Petugas"
        page="petugas"
        gettypebtn={getTypeBtn}
        handlemodal={handleModal}
        handlecrud={handleCrud}
        typeform={typeform}
      />

      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          title={typeform === "add" ? "Tambah Petugas" : "Edit Petugas"}
          body={<PetugasFormComponent />}
          handlesubmit={handleSubmit}
        />

      }
    </>
  )
}

export default PetugasView