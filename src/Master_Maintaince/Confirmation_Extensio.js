<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import Header from '../components/Includes/Header';
import Transaction_Confirm_Extension from './components/Transaction_Confirm_Extension';
import {getToken} from "../Token/index";

const Confirmation_Extensio = () => {
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
import Transaction_Confirm_Extension from './components/Transaction_Confirm_Extension';

const Confirmation_Extensio = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
  return (
      <> <div>
          <Header />
      </div>
          <div className='mt-5'>
              <Transaction_Confirm_Extension />
          </div>
          </>
  )
}

export default Confirmation_Extensio