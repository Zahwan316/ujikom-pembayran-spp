import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import { IconButton, MenuItem, Popover, TableCell, TableRow, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

const SiswaTableBody = (props) => {
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
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
        Object.keys(siswa).length != 0?
        siswa.map((item,index) => 
          <TableRow key={index}>
            <TableCell>{item.nisn}</TableCell>
            <TableCell>{item.nis}</TableCell>
            <TableCell>{item.nama}</TableCell>
            {
                kelas.map((items) =>
                  items.id_kelas === item.id_kelas &&
                   <TableCell key={index}>{items.nama_kelas}</TableCell>
                  
                )
            }
            <TableCell>{item.alamat}</TableCell>
            {
                spp.map((items) => 
                  items.id_spp === item.id_spp &&
                  <TableCell key={index}>{items.tahun}</TableCell>
                )
            }
            <TableCell align="right">
              <IconButton onClick={(e) => handleOpenMenu(e,item.nisn)}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
            <Popover
              open={Boolean(open[item.nisn])}
              anchorEl={open[item.nisn]}
              onClose={() => handleClose(item.nisn)}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { width: 140 },
              }}
            >
             <MenuItem onClick={props.handleclick} typebtn="edit" id={item.nisn}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem onClick={props.handleclick} typebtn="delete" id={item.nisn} sx={{ color: 'error.main' }}>
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

export default SiswaTableBody