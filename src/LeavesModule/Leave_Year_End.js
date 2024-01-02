import React, { useState, useEffect } from 'react'
import '../LeavesModule/assets/css/LeaveYearEnd.css'
import Header from '../components/Includes/Header'

const Leave_Year_End = () => {


  return (
    <>
    <div>
       <Header />
    </div>
      <div className="container-fluid mt-5 p-2">
          <div className="container-fluid mt-1 LeaveYearEnd_listContainer">
              <div className="row w-100 mx-0">
                  <span className="LeaveYearEnd_listHeader">
                      Leave Application Form
                  </span>
              </div>
              <div className="row px-3 mt-2 p-2">
                <div className="col-lg-12 yearendttext ">
                <p className=''> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero odit aliquid assumenda !</p>
               </div>
                <div className='btnyearend'>
                    <button>process</button>
                </div>
              </div>
          </div>
      </div>
      </>
  )
}

export default Leave_Year_End