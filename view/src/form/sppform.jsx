import { Box, FormLabel, Input, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../state/form';

const SppFormComponent = () => {
  const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])

  const handleFormInput = (e) => {
    const {value,name} = e.target
    setforminput(name,value)
  }


  return(
    <>
      <Box  className="flex flex-col mb-4" >
        <FormLabel className='mb-2'>Tahun</FormLabel>
        <TextField
         type='number' 
         variant='outlined' 
         name='tahun' 
         className='w-64 ' 
         size='small'
         onChange={handleFormInput}
         value={forminput.tahun || ""}
         >
         </TextField>
      </Box>
      <Box sx={{mb:"2"}} className="flex flex-col" >
        <FormLabel className='mb-2'>Nominal</FormLabel>
        <TextField 
         type='number' 
         variant='outlined' 
         name='nominal' 
         className='w-64 ' 
         size='small'
         onChange={handleFormInput}
         value={forminput.nominal || ""}
         InputProps={{
          startAdornment:<InputAdornment position='start'>Rp</InputAdornment>
         }}
         >
        </TextField>
      </Box>
    </>
  )
}

export default SppFormComponent