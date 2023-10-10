import React from 'react'
import Header from '../components/Includes/Header';
import Trans_Holidays from './components/Trans_Holidays'

const Holidays = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className=''>
                <Trans_Holidays />
            </div>
        </>
    )
}

export default Holidays