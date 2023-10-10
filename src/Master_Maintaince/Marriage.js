import React from 'react'
import Header from '../components/Includes/Header';
import Transaction_Marri  from './components/Transaction_Marri'

const Marriage = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='mt-5'>
                <Transaction_Marri />
            </div>
        </>
    )
}

export default Marriage