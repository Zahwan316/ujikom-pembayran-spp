import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import useFormStore from '../../../state/form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [forminput,setforminput,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [login,setlogin] = useState(false)
  const [logintype,setlogintype] = useState("petugas")
  const navigate = useNavigate()
  const [errors,seterrors] = useState({})


  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleFormInput = (e) => {
    const{name,value} = e.target;
    setforminput(name,value);
  }

  const validateInput = () => {
    const error = {}
    if(logintype === "petugas"){
      if(!forminput.username){
        error.username = "Username tidak boleh kosong"
      }
      if(!forminput.password){
        error.password = "Password tidak boleh kosong"
      }
    }
    else if(logintype === "siswa"){
      if(!forminput.nisn){
        error.nisn = "NISN tidak boleh kosong"
      }
      if(!forminput.password){
        error.password = "Password tidak boleh kosong"
      }
    }
    seterrors(error)
    return Object.keys(error).length === 0
  }

  const handleLogin = async() => {
    try{
        if(validateInput()){
          if(logintype === "petugas"){
            let res = await axios.post(`${process.env.REACT_APP_URL_API}login`,forminput)
            const data = res.data
            Cookies.set("token",data.token)
            console.log(res)
          }
          else if(logintype === "siswa"){
             let res = await axios.post(`${process.env.REACT_APP_URL_API}login_siswa`,forminput)
             const data = res.data
             Cookies.set("token",data.token)
             console.log(res)
          }
          setlogin(true)
          setTimeout(() => {
            if(logintype === "siswa"){
              window.location.href = "/history/siswa"
            }
            else{
              window.location.href = "/"
            }
          },1000)
        }
    }
    catch(e){
      console.log(e)
      const error = {}
      error.server = e.response.data.message
      seterrors(error)
    }
  }

  const handleChangeLoginType = () => {
    logintype === "petugas" ?
      setlogintype("siswa")
      :
      setlogintype("petugas")
  }

  useEffect(() => {
    console.log(errors)
    console.log(forminput)
  })

  useEffect(() => {
    resetform()
  },[logintype])

  const renderForm = (
    <>
      <Stack spacing={3} className='mt-8'>
        <TextField 
          type={logintype === "petugas" ? "text" : "number"} 
          name={logintype === 'petugas' ? "username" : "nisn"} 
          label={logintype === 'petugas' ? "Username" : "NISN"} 
          value={logintype === "petugas" ? forminput.username : forminput.nisn} 
          onChange={handleFormInput} 
          error={logintype === "petugas" ? errors.username : errors.nisn}
          helperText={logintype === "petugas" ? errors.username : errors.password}
          required
          />

        <TextField
          name="password"
          label="Password"
          onChange={handleFormInput}
          type={showPassword ? 'text' : 'password'}
          required
          error={errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" onClick={handleChangeLoginType} className='cursor-pointer'>
          Masuk Sebagai {logintype === "petugas" ? "Siswa" : "Petugas"}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" className="mb-12" margin>Login {logintype === "petugas" ? "Petugas" : "Siswa"}</Typography>

          {renderForm}
        </Card>
      </Stack>
          {
            login &&
            <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w-1/5'>
              <Alert severity="success" variant='filled' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                Anda berhasil login
              </Alert>
            </Snackbar>
          }
          {
            errors.server &&
            <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w-1/5'>
              <Alert severity="error" variant='filled' className='w-full'>
                <AlertTitle>Kesalahan</AlertTitle>
                {errors.server}
              </Alert>
            </Snackbar>
          }
    </Box>
  );
}
