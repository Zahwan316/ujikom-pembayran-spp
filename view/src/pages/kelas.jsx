import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import KelasView from 'src/sections/kelas/view/kelas-view';

const KelasPage = () => {
  return(
    <>
      <Helmet>
        <title>Kelas | Data</title>
      </Helmet>

      <KelasView />
    </>
  )
}

export default KelasPage