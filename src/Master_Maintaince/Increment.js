<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import Transaction_Increment from './components/TransactionIncrement'
import {getToken} from "../Token/index";



const Increment = () => {
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
import Transaction_Increment from './components/TransactionIncrement'


const Increment = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    return (
        <>
            <div>
                <Header />
            </div>
            <div className=''>
                <Transaction_Increment />
            </div>
        </>
    )
}

export default Increment;