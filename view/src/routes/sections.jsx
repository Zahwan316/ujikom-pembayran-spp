import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useParams, useSearchParams, useLocation } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import useAkunStore from '../../state/akun';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from './hooks';
import SppPage from 'src/pages/spp';
import PetugasPage from 'src/pages/petugas';
import useItemStore from '../../state/item';
import KelasPage from 'src/pages/kelas';
import SiswaPage from 'src/pages/siswa';
import PembayaranPage from 'src/pages/pembayaran';
import HistoryPage from 'src/pages/history';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const [akun,setakun,setrole] = useAkunStore((state) => [state.akun,state.setakun,state.setrole]);
  const [refpetugas,setrefpetugas] = useItemStore((state) => [state.refpetugas,state.setrefpetugas])
  const token = Cookies.get("token")
  const {pathname} = useLocation()
  const router = useRouter()

  useEffect(() => {
    const getData = async() => {
      try{
        if(pathname != "/login" && pathname != "/history/siswa"){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}auth/petugas/${token}`)
          console.log(res)
          setakun(res.data.data)
          setrole(res.data.role)
          if(Object.keys(refpetugas).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}ref_petugas`)
            setrefpetugas(res.data.data)
          }
          
        }
        if(pathname === "/history/siswa"){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}auth/siswa/${token}`)
          setrole("siswa")
          //console.log(res)
          setakun(res.data.data)
          if(Object.keys(refpetugas).length === 0){
            let res = await axios.get(`${process.env.REACT_APP_URL_API}ref_petugas`)
            setrefpetugas(res.data.data)
          }
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getData()

    if(pathname != "/login"){
      if(!token){
        router.push("/login")
      }
    }

   
  },[])

  useEffect(() => {
    if(pathname === "/"){
      if(akun.level_id == 2){
        router.push("/pembayaran")
      }
    }
  },[akun])


  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'spp', element: <SppPage /> },
        { path: 'petugas', element: <PetugasPage /> },
        { path: 'kelas', element: <KelasPage /> },
        { path: 'siswa', element: <SiswaPage /> },
        { path: 'pembayaran', element: <PembayaranPage /> },
        { path: 'history', element: <HistoryPage /> },
        { path: 'history/siswa', element: <HistoryPage role="siswa" /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
