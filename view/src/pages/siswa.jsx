import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SiswaView from 'src/sections/siswa/view/siswa';

const SiswaPage = () => {
  return(
    <>
      <Helmet>Siswa | Data</Helmet>

      <SiswaView />
    </>
  )
}

export default SiswaPage