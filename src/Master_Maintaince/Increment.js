import React from 'react'
import Header from '../components/Includes/Header';
import Transaction_Increment from './components/TransactionIncrement'


const Increment = () => {
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