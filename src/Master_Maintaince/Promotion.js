import React, { useEffect, useState } from "react";
import Header from '../components/Includes/Header';
import Transaction_Pro from './components/Transaction_Pro'


const Promotion = () => {

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