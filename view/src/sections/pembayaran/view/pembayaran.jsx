import { Card, Typography, Container, Box, FormLabel, TextField, InputAdornment, Button, Snackbar } from '@mui/material';

import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import ReactSelect from 'react-select';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useFormStore from '../../../../state/form';
import useAkunStore from '../../../../state/akun';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const PembayaranView = (props) => {
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [akun,setakun] = useAkunStore((state) => [state.akun,state.setakun])
  const [datasiswa,setdatasiswa] = useState({})
  const [tahunspp,settahunspp] = useState()
  const [success,setsuccess] = useState(false)

  const handleFormInput = (e) => {
    const {name,value} = e.target;
    setforminput(name,value)
  }

  const handleSiswa = (e) => {
    setforminput("nisn",e.value)
  }

  const sendData = async() => {
    try{
      let res = await axios.post(`${import.meta.env.VITE_API_URL}pembayaran`,forminput)
      console.log(res.data)
    }
    catch(e){
        console.log(e)
    }
    setsuccess(true)
    setTimeout(() => {
      setsuccess(false)
    },1500)
  }

  const handlesubmit = (e) => {
    e.preventDefault()
  

    sendData()
  } 

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(siswa).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}siswa`);
          setsiswa(res.data.data)
        }
        if(Object.keys(spp).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_API_URL}spp`)
          setspp(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    if(forminput.nisn){
        let findSiswa = siswa.find(item => item.nisn === forminput.nisn)
        let siswa_sppid = findSiswa.id_spp
        const dataspp = spp.find(item => item.id_spp === siswa_sppid)
        setforminput("id_spp",dataspp.id_spp)
        settahunspp(dataspp.nominal)
        console.log(dataspp)

        const date = new Date()
        const currMonth = date.getMonth() + 1;
        const currYear = date.getFullYear();
        setforminput("bulan_dibayar",currMonth)
        setforminput("tahun_dibayar",currYear);
        setforminput("id_petugas",akun.id_petugas)
    }
  },[forminput.nisn])

  useEffect(() => {
    console.log(forminput)
  })

  return(
    <>
      <Container maxWidth={"lg"}>
        {
          success &&
          <Snackbar open={true} autoHideDuration={100} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w-1/5'>
              <Alert severity='success' variant='filled' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                Transaksi Berhasil
              </Alert>
          </Snackbar>
        }
        <Typography variant="h4" sx={{mb:"1em"}}>Tambah Pembayaran</Typography>
        <Card className='bg-slate-300 w-100 p-6 h-auto'>
          <form onSubmit={handlesubmit}>
          <Box className="flex flex-col mb-4">
            <FormLabel className='mb-2'>Nama Siswa</FormLabel>
            <ReactSelect
              onChange={handleSiswa}
              options={
                siswa.map(item => {
                    let data = {
                      value:item.nisn,
                      label:item.nama
                    }
                    return data
                })
              }
            />
          </Box>
          <Box className="flex flex-col mb-4">
            <FormLabel className='mb-2'>Tanggal Dibayar</FormLabel>
            <TextField
              type="date"
              size="small"
              name="tgl_bayar"
              onChange={handleFormInput}
            />
          </Box>
          <Box className="flex flex-col mb-4">
            <FormLabel className='mb-2'>Nominal SPP</FormLabel>
            <TextField
              type="number"
              size="small"
              disabled
              id="outlined-disabled"
              name="id_spp"
              InputProps={{
                startAdornment:<InputAdornment position='start'>Rp</InputAdornment>
              }}
              value={tahunspp}
            />
          </Box>
          <Box className="flex flex-col mb-8">
            <FormLabel className='mb-2'>Jumlah Dibayar</FormLabel>
            <TextField
              type="number"
              size="small"
              onChange={handleFormInput}
              InputProps={{
                startAdornment:<InputAdornment position='start'>Rp</InputAdornment>
              }}
              name="jumlah_bayar"
            />
          </Box>
          <Box>
            <Button type="submit" variant='contained'>Bayar</Button>
          </Box>
          </form>
        </Card>
      </Container>
    </>
  )
}

export default PembayaranView