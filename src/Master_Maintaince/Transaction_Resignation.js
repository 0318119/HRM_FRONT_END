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