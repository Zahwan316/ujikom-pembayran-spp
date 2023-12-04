import { Box, FormLabel, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../state/form';

const KelasFormComponent = () => {
  const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])

  const handleFormInput = (e) => {
    const {name,value} = e.target
    setforminput(name,value)
  }


  return(
    <>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Nama Kelas</FormLabel>
        <TextField 
          type="text"
          name="nama_kelas"
          size="small"
          onChange={handleFormInput}
          value={forminput.nama_kelas}
        />
      </Box>
     <Box className="flex flex-col mb-4">
        <FormLabel className='mb-2'>Kompetensi Keahlian</FormLabel>
        <TextField 
          type="text"
          name="kompetensi_keahlian"
          size="small"
          onChange={handleFormInput}
          value={forminput.kompetensi_keahlian}
        />
      </Box>
    </>
  )
}

export default KelasFormComponent