import React from 'react'
import Header from '../../../components/Includes/Header'


function PaySlip() {
  return (
    <>
        <div>
            <Header />
        </div>
        <div className="container maringClass">
            <div className="row">
                <div className="col-lg-12">
                    <div className='paySlipBox'>
                    {/* <button onClick={generatePasswordProtectedPDF}>Generate Password-Protected PDF</button> */}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PaySlip
