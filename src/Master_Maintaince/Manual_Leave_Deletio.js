<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import TransactionLeaveDel from './components/TransactionLeaverDel'
import { getToken } from "../Token/index";

const Manual_Leave_Deletio = () => {
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const tokenValidationResult = await getToken();
        console.log("token here....",tokenValidationResult)
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    };
    checkTokenValidity();
  }, []);
=======
import React from 'react'
import Header from '../components/Includes/Header';
import TransactionLeaveDel from './components/TransactionLeaverDel'

const Manual_Leave_Deletio = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
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