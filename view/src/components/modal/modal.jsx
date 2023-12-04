import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

const ModalComponent = (props) => {
  return(
    <Modal open={true} onClose={props.handlemodal} className='flex items-center justify-center'>
      <Box className="bg-white w-1/3 h-auto p-6 flex flex-col justify-between rounded-xl">
        <form onSubmit={props.handlesubmit} className='w-full h-full flex flex-col justify-between'>
          <Box className="h-5/6 mb-8">
            <Box>
              <Typography variant='h5' sx={{mb:"1em"}}>{props.title}</Typography>
            </Box>
            <Box>
              {props.body}
            </Box>
          </Box>
          <Stack direction={"row"} justifyContent={"flex-end"} gap={"1em"}>
              <Button variant='outlined' onClick={props.handlemodal}>Close</Button>
              <Button variant='contained' type='submit'>Kirim</Button>
          </Stack>
        </form>
      </Box>
      
    </Modal>
  )
}
export default ModalComponent