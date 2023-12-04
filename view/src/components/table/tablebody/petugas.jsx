import { IconButton, MenuItem, Popover, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import Iconify from 'src/components/iconify';

const PetugasTableBody = (props) => {
  const [petugas,setpetugas,refpetugas] = useItemStore((state) => [state.petugas,state.setpetugas,state.refpetugas])
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
        Object.keys(petugas).length !== 0 ?
        petugas.map((item,index) => 
          <TableRow key={index}>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.nama_petugas}</TableCell>
            {
                refpetugas.map((items => 
                    items.id_ref_petugas === item.level_id &&
                    <TableCell key={index}>{items.nama}</TableCell>
                
                ))
            }
            <TableCell align="right">
              <IconButton onClick={(e) => handleOpenMenu(e,item.id_petugas)}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
            <Popover
              open={Boolean(open[item.id_petugas])}
              anchorEl={open[item.id_petugas]}
              onClose={() => handleClose(item.id_petugas)}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { width: 140 },
              }}
            >
             <MenuItem onClick={props.handleclick} typebtn="edit" id={item.id_petugas}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem onClick={props.handleclick} typebtn="delete" id={item.id_petugas} sx={{ color: 'error.main' }}>
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

export default PetugasTableBody