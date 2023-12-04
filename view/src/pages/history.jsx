import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HistoryView from 'src/sections/history/view/history';


const HistoryPage = (props) => {
  return(
    <>
      <Helmet>
        <title>History Pembayaran</title>
      </Helmet>

      <HistoryView role={props.role} />
    </>
  )
}

export default HistoryPage