import React, { useState, useEffect } from 'react';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useAkunStore from '../../../../state/akun';
import {v4 as uuidv4} from "uuid"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button  from '@mui/material/Button';

const HistoryView = (props) => {
  const [pembayaran,setpembayaran] = useItemStore((state) => [state.pembayaran,state.setpembayaran])
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [petugas,setpetugas] = useItemStore((state) => [state.petugas,state.setpetugas])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const [typeform,settypeform] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)
  const [open,setopen] = useState(false)
  const akun = useAkunStore((state) => state.akun)
  const role = useAkunStore((state) => state.role)

  const getTypeBtn = (type) => {
    settypeform(type)
  }

  const tablehead = [
    "Nama Siswa",
    "Kelas",
    "Tanggal Bayar",
    "Spp Nominal",
    "Jumlah Bayar",
    "Nama Petugas",
  ]

  const tablehead_siswa = [
    "Tanggal Bayar",
    "Spp Nominal",
    "Jumlah Bayar",
    "Nama Petugas",
  ]

  const handleModal = () => {
    setopen(!open)
  }

  const handleDeleteAllHistory = async() => {
    try{
      let res = await axios.delete(`${import.meta.env.VITE_API_URL}history/delete`)
      setupdater(uuidv4())
      setisload(true)
      setopen(false)
      setTimeout(() => {
        setisload(false)
      },800)
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if(role == "siswa"){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}history/${akun.nisn}`)
          setpembayaran(res.data.data)
        }
        else{
          let res = await axios.get(`${import.meta.env.VITE_API_URL}pembayaran`)
          setpembayaran(res.data.data)
        }
       
        if(Object.keys(siswa).length === 0){
            let res = await axios.get(`${import.meta.env.VITE_API_URL}siswa`)
            setsiswa(res.data.data)
        }
        if(Object.keys(spp).length === 0){
            let res = await axios.get(`${import.meta.env.VITE_API_URL}spp`)
            setspp(res.data.data)
        }
        if(Object.keys(petugas).length === 0){
            let res = await axios.get(`${import.meta.env.VITE_API_URL}petugas`)
            setpetugas(res.data.data)
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
    fetchData()
  },[role])

  useEffect(() => {
    const refetchData = async() => {
      try{
        if(isload){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}pembayaran`)
          setpembayaran(res.data.data)
          
        }
      }
      catch(e){
        console.log(e)
      }
    }
    refetchData()
  },[updater])

  useEffect(() => {
    console.log(role)
  })

  return(
    <>
      <TableMainComponent
        tablehead={role === "siswa" ? tablehead_siswa : tablehead}
        title="History Pembayaran"
        page="history"
        role={props.role}
        handlecrud={handleModal}
        gettypebtn={getTypeBtn}
      />
      <Dialog
        open={open}
        onClose={handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ingin menghapus semua data history?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Apakah Anda Yakin Ingin Menghapus Semua Data History?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Batal</Button>
          <Button onClick={handleDeleteAllHistory} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HistoryView