<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import TransactionResignationCom from './components/TransactionResignationCom'
import { getToken } from "../Token/index";


const Transaction_Resignation = () => {
    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const tokenValidationResult = await getToken();
                console.log("token here....", tokenValidationResult)
            } catch (error) {
                console.error("Error checking token validity:", error);
            }
        };
        checkTokenValidity();
    }, []);
=======
import React from 'react'
import Header from '../components/Includes/Header';
import TransactionResignationCom from './components/TransactionResignationCom'


const Transaction_Resignation = () => {
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    return (
        <>
            <div>
                <Header />
            </div>
            <div className=''>
                <TransactionResignationCom />
            </div>
        </>
    )
}

export default Transaction_Resignation;