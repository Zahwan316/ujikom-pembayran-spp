import React, { useState, useEffect } from 'react';
import ModalComponent from 'src/components/modal/modal';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid"
import KelasFormComponent from 'src/form/kelas';
import Swal from 'sweetalert2';

const KelasView = () => {
  const [modal,setmodal] = useState(false)
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const [forminput,setforminput,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [success,setsuccess] = useState(false)

  const tablehead = [
    "Nama Kelas",
    "Kompetensi Keahlian"
  ]

  const handleModal = () => {
    setmodal(!modal)

    typeform === "add" ? resetform() : ""
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleCrud = async(method,id) => {
    try{
      let res;
      switch(method){
        case "post":
            res = await axios.post(`${import.meta.env.VITE_API_URL}kelas`,forminput)
            break;
        case "put":
            res = await axios.put(`${import.meta.env.VITE_API_URL}kelas/${id}`,forminput)
            break;
        case "delete":
            res = await axios.delete(`${import.meta.env.VITE_API_URL}kelas/${id}`,forminput)
            break;
      }
      setupdater(uuidv4())
      setisload(true)
      setsuccess(true)
      resetform()
      setTimeout(() => {
        setisload(false)
      }, 500);
      setTimeout(() => {
        setsuccess(false)
      },1500)
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
    setmodal(false)
  }

  useEffect(() => {
    const getdata = async() => {
      try{
        if(Object.keys(kelas).length === 0){
          let res = await axios.get(`${process.env.import.meta.env.VITE_API_URL}kelas`)
          setkelas(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getdata()
  },[])

  useEffect(() => {
    const getdata = async() => {
      try{
        if(isload){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}kelas`)
          setkelas(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getdata()
  },[updater])

  useEffect(() => {
    const getdata = async() => {
        try{
          if(editedid && typeform === "edit"){
            let res = await axios.get(`${import.meta.env.VITE_API_URL}kelas/${editedid}`)
            const data = res.data.data
            for(const key in data){
                setforminput(key,data[key])
            }
          }
        }
        catch(e){
          console.log(e)
        }
      }
      getdata()
  },[editedid])

  return(
    <>
      <TableMainComponent 
        tablehead={tablehead}
        title="Kelas"
        page="kelas"
        gettypebtn={getTypeBtn}
        handlemodal={handleModal}
        handlecrud={handleCrud}
        success={success}
        typeform={typeform}
      />

      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          title = {typeform === "add" ? "Tambah Kelas" : "Edit Kelas"}
          body={<KelasFormComponent />}
          handlesubmit={handleSubmit}
        />
      }
    </>
  )
}

export default KelasView;