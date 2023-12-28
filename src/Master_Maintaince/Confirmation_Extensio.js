import React from 'react'
import Header from '../components/Includes/Header';
import Transaction_Confirm_Extension from './components/Transaction_Confirm_Extension';

const Confirmation_Extensio = () => {
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