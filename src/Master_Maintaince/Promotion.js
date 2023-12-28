<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import Transaction_Pro from './components/Transaction_Pro'
import {getToken} from "../Token/index";


const Promotion = () => {
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
import Transaction_Pro from './components/Transaction_Pro'

const Promotion = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='mt-5'>
                <Transaction_Pro />
            </div>
        </>
    )
}

export default Promotion