import { Box, FormLabel, MenuItem, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../state/form';
import useItemStore from '../../state/item';

const SiswaFormComponent = () => {
  const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const [error,seterror] = useFormStore((state) => [state.error,state.seterror])

  const handleFormInput = (e) => {
    const {name,value} = e.target 
    setforminput(name,value)
  }

  useEffect(() => {
    console.log(forminput)
  })

  return(
    <>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>NISN</FormLabel>
        <TextField 
          type="number"
          name="nisn"
          size="small"
          onChange={handleFormInput}
          value={forminput.nisn}
          error={error.nisn}
          helperText={error.nisn}
        />
      </Box>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>NIS</FormLabel>
        <TextField 
          type="number"
          name="nis"
          size="small"
          onChange={handleFormInput}
          value={forminput.nis}
          error={error.nis}
          helperText={error.nis}
        />
      </Box>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Nama</FormLabel>
        <TextField 
          type="text"
          name="nama"
          size="small"
          onChange={handleFormInput}
          value={forminput.nama}
        />
      </Box>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Kelas</FormLabel>
        <TextField 
          select
          name="id_kelas"
          size="small"
          onChange={handleFormInput}
          value={forminput.id_kelas}
          defaultValue={"0"}
        >
          <MenuItem value="0">Pilih Kelas</MenuItem>
          {
            kelas.map((item,index) => 
              <MenuItem key={index} value={item.id_kelas}>{item.nama_kelas}</MenuItem>
            )
          }
        </TextField>
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Alamat</FormLabel>
        <TextField 
          type="text"
          name="alamat"
          size="small"
          onChange={handleFormInput}
          value={forminput.alamat}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>No Telepon</FormLabel>
        <TextField 
          type="number"
          name="no_telp"
          size="small"
          onChange={handleFormInput}
          value={forminput.no_telp}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>SPP</FormLabel>
        <TextField 
          select
          name="id_spp"
          size="small"
          onChange={handleFormInput}
          value={forminput.id_spp}
          defaultValue={"0"}
        >
          <MenuItem value="0">Pilih Spp</MenuItem>
          {
            spp.map((item,index) => 
              <MenuItem key={index} value={item.id_spp}>{item.tahun}</MenuItem>
            )
          }
        </TextField>
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Password</FormLabel>
        <TextField 
          type="password"
          name="password"
          size="small"
          onChange={handleFormInput}
          value={forminput.password}
        />
      </Box>
      
    </>
  )
}

export default SiswaFormComponent