import { Container, Button, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TableBody, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SppTableBody from './tablebody/spp';
import axios from 'axios';
import PetugasTableBody from './tablebody/petugas';
import KelasTableBody from './tablebody/kelas';
import SiswaTableBody from './tablebody/siswa';
import HistoryPage from 'src/pages/history';
import HistoryTableBody from './tablebody/history';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const TableMainComponent = (props) => {
  const [updater,setupdater] = useState()

  const formatHarga = (number) => {
    const formatter = Intl.NumberFormat("id-ID",{
        useGrouping:true,
        style:"decimal"
    })
    const numberformat = formatter.format(number)
    return numberformat
  }



  const handleClick = (e) => {
    const typebtn = e.target.getAttribute("typebtn")
    const id = e.target.getAttribute("id")
    props.gettypebtn(typebtn,id)
    if(typebtn === "add" || typebtn === "edit"){
      props.handlemodal()
    }
    if(typebtn === "delete"){
      {
        props.page != "history" ?
          props.handlecrud("delete",id)
          :
          props.handlecrud()
      }
    }
  }

  return(
    <Container maxWidth="lg">
      {
        props.success && 
        <Snackbar open={true} autoHideDuration={100} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w-1/5'>
          <Alert severity='success' variant='filled' className='w-full'>
            <AlertTitle>Berhasil</AlertTitle>
              {
                
                props.typeform === "add" && props.page === "spp" ?
                "spp berhasil ditambahkan"
                :
                
                
                props.typeform === "edit" && props.page === "spp" ?
                  "spp berhasil diedit"
                  :
                  
                  
                props.typeform === "delete" && props.page === "spp" &&
                  "spp berhasil dihapus"
              }
              {
                
                props.typeform === "add" && props.page === "siswa" ?
                "siswa berhasil ditambahkan"
                :
                
                
                props.typeform === "edit" && props.page === "siswa" ?
                  "siswa berhasil diedit"
                  :
                  
                  
                props.typeform === "delete" && props.page === "siswa" &&
                "siswa berhasil dihapus"
              }
              {
                
                props.typeform === "add" && props.page === "petugas" ?
                "petugas berhasil ditambahkan"
                :
                
                
                props.typeform === "edit" && props.page === "petugas" ?
                  "petugas berhasil diedit"
                  :
                  
                  
                props.typeform === "delete" && props.page === "petugas" &&
                  "petugas berhasil dihapus"
                }
              {
                
                  props.typeform === "add" && props.page === "kelas" ?
                    "Kelas berhasil ditambahkan"
                    :
                    
                    
                  props.typeform === "edit" && props.page === "kelas" ?
                    "Kelas berhasil diedit"
                    :
                    
                    
                  props.typeform === "delete" && props.page === "kelas" &&
                    "Kelas berhasil dihapus"
                    
              }
          </Alert>
        </Snackbar>

      }
      <Stack direction={"row"} justifyContent={"space-between"} mb={4} alignItems={"center"}>
        <Typography variant='h4'>{props.title}</Typography>
        {
          props.page != "history" ?
          <Button variant='outlined' typebtn="add" onClick={handleClick}>+ Tambah {props.btnname}</Button>
          :
          <Button variant='outlined' typebtn="delete" color="error" onClick={handleClick}>Hapus History</Button>

        }
        
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                {
                    props.tablehead.map((item,index) => 
                      <TableCell key={index}>{item}</TableCell>
                    )
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {
                props.page === "spp" &&
                <SppTableBody 
                  formatharga={formatHarga}
                  handleclick={handleClick}
                />
            }
            {
              props.page === "petugas" &&
              <PetugasTableBody 
                handleclick={handleClick}
              />
            }
            {
              props.page === "kelas" &&
              <KelasTableBody 
                handleclick={handleClick}
              />
            }
            {
              props.page === "siswa" &&
              <SiswaTableBody 
                handleclick={handleClick}
              />
            }
            {
              props.page === "history" &&
              <HistoryTableBody
                formatharga={formatHarga}
                role={props.role}
              />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default TableMainComponent