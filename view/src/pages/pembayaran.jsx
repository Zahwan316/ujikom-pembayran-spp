import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PembayaranView from 'src/sections/pembayaran/view/pembayaran';

const PembayaranPage = () => {
  return(
    <>
      <Helmet>
        <title>Pembayaran</title>
      </Helmet>

      <PembayaranView />
    </>
  )
}

export default PembayaranPage;