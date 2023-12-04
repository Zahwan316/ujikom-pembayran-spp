import { IconButton, MenuItem, Popover, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import Iconify from 'src/components/iconify';

const SppTableBody = (props) => {
  const spp = useItemStore((state) => state.spp)
  const [open,setopen] = useState({})

  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }

  return(
    <>
      {
        spp.length != 0 ?
        spp.map((item,index) => 
         
          <TableRow key={index}>
            <TableCell>{item.tahun}</TableCell>
            <TableCell>Rp{props.formatharga(item.nominal)}</TableCell>
            <TableCell align="right">
              <IconButton onClick={(e) => handleOpenMenu(e,item.id_spp)}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
            <Popover
              open={Boolean(open[item.id_spp])}
              anchorEl={open[item.id_spp]}
              onClose={() => handleClose(item.id_spp)}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { width: 140 },
              }}
            >
             <MenuItem onClick={props.handleclick} typebtn="edit" id={item.id_spp}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem onClick={props.handleclick} typebtn="delete" id={item.id_spp} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                Hapus
              </MenuItem>
            </Popover>
          </TableRow>
        )
        :
        <TableRow>
        <TableCell>
          <Typography variant='h5'>Data masih kosong</Typography>
        </TableCell>
      </TableRow>
      }
    </>
  )
}

export default SppTableBody