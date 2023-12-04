import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import useItemStore from '../../../../state/item';
import axios from 'axios';

import { Icon } from '@mui/material';


// ----------------------------------------------------------------------

export default function AppView() {
  const [petugas,setpetugas] = useItemStore((state) => [state.petugas,state.setpetugas])
  const [siswa,setsiswa] = useItemStore((state) => [state.siswa,state.setsiswa])
  const [pembayaran,setpembayaran] = useItemStore((state) => [state.pembayaran,state.setpembayaran])
  const [kelas,setkelas] = useItemStore((state) => [state.kelas,state.setkelas])
  const [summarytotal,setsummary] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], series: [] });

  const transactionsSummary = () => {
    const summary = {};
    pembayaran.forEach((item) => {
      const { tgl_bayar } = item;
      if (!summary[tgl_bayar]) {
        summary[tgl_bayar] = 1;
      } else {
        summary[tgl_bayar] += 1;
      }
    });
    return summary;
  };

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(petugas).length === 0){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}petugas`)
          setpetugas(res.data.data)
        }
        if(Object.keys(siswa).length === 0){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}siswa`)
          setsiswa(res.data.data)
        }
        if(Object.keys(pembayaran).length === 0){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}pembayaran`)
          setpembayaran(res.data.data)
        }
        if(Object.keys(kelas).length === 0){
          let res = await axios.get(`${process.env.REACT_APP_URL_API}kelas`)
          setkelas(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    const summarytransaction = transactionsSummary()
    const summaryArray = Object.keys(summarytransaction).map(item => ({[item]:summarytransaction[item]}))
    const labels = Object.keys(summarytransaction);
    const series = labels.map((date) => summarytransaction[date]);

    setChartData({ labels, series });
    setsummary(summarytransaction )
  },[pembayaran])

  const labels = Object.keys(summarytotal)

  useEffect(() => {
    console.log(chartData)
  })

 

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Selamat Datang Kembali👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Kelas"
            total={kelas.length}
            color="success"
            className="bg-red-500"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Petugas"
            total={petugas.length}
            color="info"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Siswa"
            total={siswa.length}
            color="info"
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Transaksi Pembayaran"
            total={pembayaran.length}
            color="error"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

         <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Total Transaksi Per Tanggal"
            subheader="(+43%) than last year"
            chart={{
              labels:  /* [
                '2023-11-1',
                '2023-11-2',
                '2023-11-11',
                '2023-11-13',
                '2023-11-15',
                '2023-11-20',
                '2023-11-22',
                '2023-11-25',
                '2023-11-27',
                '2023-11-29',
                '2023-11-30',
              ],  */
               
                chartData.labels
              , 
              series: [
                {
                  name: 'Jumlah',
                  type: 'column',
                  fill: 'solid',
                  data: chartData.series,
                },
               /*  {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [1, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                }, */
              ],
            }}
          />
        </Grid>
{/*
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
