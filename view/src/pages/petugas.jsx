import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PetugasView from 'src/sections/petugas/view/petugas-view';

const PetugasPage = () => {
  return(
    <>
      <Helmet>
        <title>Petugas | Data</title>
      </Helmet>

      <PetugasView />
    </>
  )
}

export default PetugasPage;