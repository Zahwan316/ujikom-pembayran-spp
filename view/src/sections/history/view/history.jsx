import React, { useState, useEffect } from 'react';
import TableMainComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useAkunStore from '../../../../state/akun';

const HistoryView = (props) => {
  const [pembayaran,setpembayaran] = useItemStore((state) => [state.pembayaran,state.setpembayaran])
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [petugas,setpetugas] = useItemStore((state) => [state.petugas,state.setpetugas])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const akun = useAkunStore((state) => state.akun)
  const role = useAkunStore((state) => state.role)

  const tablehead = [
    "Nama Siswa",
    "Kelas",
    "Tanggal Bayar",
    "Spp Tahun",
    "Jumlah Bayar",
    "Nama Petugas",
  ]

  const tablehead_siswa = [
    "Tanggal Bayar",
    "Spp Tahun",
    "Jumlah Bayar",
    "Nama Petugas",
  ]
  const handleDeleteAllHistory = async() => {
    try{
      let res = await axios.delete(`${process.env.REACT_APP_URL_API}history/delete`)
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      },500)
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
          let res = await axios.get(`${process.env.REACT_APP_URL_API}history/${akun.nisn}`)
          setpembayaran(res.data.data)
        }
        else{
          let res = await axios.get(`${process.env.REACT_APP_URL_API}pembayaran`)
          setpembayaran(res.data.data)
        }
       
        if(Object.keys(siswa).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}siswa`)
            setsiswa(res.data.data)
        }
        if(Object.keys(spp).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}spp`)
            setspp(res.data.data)
        }
        if(Object.keys(petugas).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}petugas`)
            setpetugas(res.data.data)
        }
        if(Object.keys(kelas).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}kelas`)
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
    console.log(role)
  })

  return(
    <>
      <TableMainComponent
        tablehead={role === "siswa" ? tablehead_siswa : tablehead}
        title="History Pembayaran"
        page="history"
        role={props.role}
        handlecrud={handleDeleteAllHistory}
      />
    </>
  )
}

export default HistoryView