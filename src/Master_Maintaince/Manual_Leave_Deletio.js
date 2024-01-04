import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import TransactionLeaveDel from './components/TransactionLeaverDel'

const Manual_Leave_Deletio = () => {

  return (
    <>
          <div>
              <Header />
          </div>
          <div className='mt-5'>
              <TransactionLeaveDel />
          </div>
    </>
  )
}

export default Manual_Leave_Deletio