import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    level:[1],
  },
  {
    title: 'Spp',
    path: '/spp',
    icon: icon('money-bill-solid'),
    level:[1],
  },
  {
    title: 'Siswa',
    path: '/siswa',
    icon: icon('users-solid'),
    level:[1],
  },
  {
    title: 'Petugas',
    path: '/petugas',
    icon: icon('ic_user'),
    level:[1],
  },
  {
    title: 'Kelas',
    path: '/kelas',
    icon: icon('school-solid'),
    level:[1],
  },
  {
    title: 'Tambah Pembayaran',
    path: '/pembayaran',
    icon: icon('plus-solid'),
    level:[2,1],
  },
  {
    title: 'History Pembayaran',
    path: '/history',
    icon: icon('clock-solid'),
    level:[1,2,3],
  },
  
];

export default navConfig;
