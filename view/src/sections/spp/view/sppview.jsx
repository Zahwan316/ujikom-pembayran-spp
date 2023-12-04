import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import ModalComponent from 'src/components/modal/modal';
import SppFormComponent from 'src/form/sppform';
import useFormStore from '../../../../state/form';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const SppView = () => {
  const tablehead = ["Tahun","Nominal"]
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [modal,setmodal] = useState(false);
  const [forminput,setforminput,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform]) 
  const [editedid,seteditedid] = useState()
  const [typeform,settypeform] = useState("")
  const [updater,setupdater] = useState("")
  const [isload,setisload] = useState(false)
  const [success,setsuccess] = useState(false)

  useEffect(() => {
    const getData = async() => {
      try{
        if(Object.keys(spp).length === 0){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}spp`)
          setspp(res.data.data)
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
          let res = await axios.get(`${process.env.REACT_APP_URL_API}spp`)
          setspp(res.data.data)
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
          if(editedid && typeform === 'edit'){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}spp/${editedid}`)
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
    getData()
  },[editedid])

  useEffect(() => {
   
  })

  const handleModal = () => {
    setmodal(!modal)

    modal === false && resetform()
  }

  const handlePostPutSubmit = async(method,id) => {
    try{
      let res;
      switch(method){
        case "post":
          res = await axios.post(`${process.env.REACT_APP_URL_API}spp`,forminput)
          break;
        case "put":
          res = await axios.put(`${process.env.REACT_APP_URL_API}spp/${id}`,forminput)
          break;
        case "delete":
          res = await axios.delete(`${process.env.REACT_APP_URL_API}spp/${id}`)
          break;
        
        }
        setupdater(uuidv4())
        resetform()
        setisload(true)
        setsuccess(true)
        setTimeout(() => {
          setisload(false)
        },500)
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
      handlePostPutSubmit("post",editedid)
    }
    else if(typeform === "edit"){
      handlePostPutSubmit("put",editedid)
    }
    setmodal(false)
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  return(
    <>
      <TableMainComponent 
        tablehead={tablehead}
        title="Spp"
        page="spp"
        handlemodal={handleModal}
        gettypebtn={getTypeBtn}
        handlecrud={handlePostPutSubmit}
        success={success}
        typeform={typeform}
      />  

      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          body={<SppFormComponent />}
          title="Tambah Spp"
          handlesubmit={handleSubmit}
        />

      }
    </>

  )
}

export default SppView