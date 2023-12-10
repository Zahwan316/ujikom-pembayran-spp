import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import useAkunStore from '../../../../state/akun';                        
import { IconButton, MenuItem, Popover, TableCell, TableRow, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import jsPDF from 'jspdf';
import {v4 as uuidv4} from "uuid"

const HistoryTableBody = (props) => {
  const [pembayaran,setpembayaran] = useItemStore((state) => [state.pembayaran,state.setpembayaran])
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [petugas,setpetugas] = useItemStore((state) => [state.petugas,state.setpetugas])
  const [spp,setspp] = useItemStore((state) => [state.spp,state.setspp])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const akun = useAkunStore((state) => state.akun)
  const role = useAkunStore((state) => state.role)
  const doc = new jsPDF()

  const generateLaporan = (id) => {
    const data = {}
    const findPembayaran = pembayaran.find(item => item.id_pembayaran === id )
    const findSiswa = siswa.find(item => {
      if(item.nisn === findPembayaran.nisn){
        data.Nama = item.nama
      } 
    })
    const findPetugas = petugas.find(item => {
      if(item.id_petugas === findPembayaran.id_petugas){
        data.Nama_Petugas = item.nama_petugas
      }
    } 
    )
    const findSpp = spp.find(item => {
      if(item.id_spp === findPembayaran.id_spp){
        data.spp = item.tahun
      }
    })
    data.Tanggal_Bayar = findPembayaran.tgl_bayar
    data.Bulan_Dibayar = findPembayaran.bulan_dibayar
    data.Tahun_Dibayar = findPembayaran.tahun_dibayar
    data.Jumlah_Bayar = findPembayaran.jumlah_bayar

    
    doc.text(`Laporan Pembayaran`,80,10)
    let index = 0;
    for(const key in data){
      const text = `${index + 1}. ${key} : ${data[key]}`;
      doc.text(text,10,20 + 20 +  (index * 10));
      index++
    }

   /*  findPembayaran.map((item,index) => {
      const text = `${index + 1}. ID_PEMBAYaRAN : ${item[0]}`;
      doc.text(text,10,20 +  (index * 10));
    }) */

    doc.save(`laporan-pembayaran-${data.Nama}`)
  }

  const [open,setopen] = useState({})

  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }

  

  useEffect(() => {
    console.log(petugas)
  })

  return(
    <>
      {
        Object.keys(pembayaran).length !== 0 ?
        pembayaran.map((item,index) => 
          <TableRow key={index}>
            {
              role != "siswa" &&
              <>
                <TableCell>{siswa.map(items => items.nisn === item.nisn && items.nama)}</TableCell>
                <TableCell>
                  {
                    siswa.map(items => 
                      items.nisn === item.nisn && 
                      kelas.map(data => 
                        data.id_kelas === items.id_kelas && data.nama_kelas
                      )  
                    )
                  }
                </TableCell>
              
              </>  
            }
            <TableCell>{item.tgl_bayar}</TableCell>
            <TableCell>Rp{spp.map(items => items.id_spp === item.id_spp && props.formatharga(items.nominal))}</TableCell>
            <TableCell>Rp{props.formatharga(item.jumlah_bayar)}</TableCell>
            <TableCell>{petugas.map(items => items.id_petugas == item.id_petugas && items.nama_petugas)}</TableCell>
            
            {
              akun.level_id === 1 &&
              <>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e,item.id_pembayaran)}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </TableCell>
                <Popover
                  open={Boolean(open[item.id_pembayaran])}
                  anchorEl={open[item.id_pembayaran]}
                  onClose={() => handleClose(item.id_pembayaran)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: { width: 180 },
                  }}
                >
                  <MenuItem onClick={() => generateLaporan(item.id_pembayaran)} typebtn="delete" id={item.id_pembayaran} sx={{ color: 'error.main' }}>
                    <Iconify icon="material-symbols:lab-profile" sx={{ mr: 2 }} />
                    Generate Laporan
                  </MenuItem>
                </Popover>
              
              </>
            }
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

export default HistoryTableBody