import { Box, FormLabel, MenuItem, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../state/form';
import useItemStore from '../../state/item';

const PetugasFormComponent = () => {
  const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform]) 
  const [refpetugas,setrefpetugas] = useItemStore((state) => [state.refpetugas,state.setrefpetugas])

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
        <FormLabel className='mb-2'>Nama Petugas</FormLabel>
        <TextField 
          type="text"
          name="nama_petugas"
          size="small"
          onChange={handleFormInput}
          value={forminput.nama_petugas}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Username</FormLabel>
        <TextField 
          type="text"
          name="username"
          size="small"
          onChange={handleFormInput}
          value={forminput.username}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Password</FormLabel>
        <TextField 
          type="password"
          name="password"
          size="small"
          onChange={handleFormInput}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Role</FormLabel>
        <TextField 
          name="level_id"
          size="small"
          onChange={handleFormInput}
          defaultValue={"0"}
          value={forminput.level_id}
          select
        >
          <MenuItem value="0">Pilih Role</MenuItem>
          {
            refpetugas.map((item,index) => 
              <MenuItem key={index} value={item.id_ref_petugas}>
                {item.nama}
              </MenuItem>
            )
          }
        </TextField>
      </Box>
    </>
  )
}

export default PetugasFormComponent