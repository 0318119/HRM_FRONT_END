import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import EmployeeTypeList from './components/EmployeeTypeList';
import EmpListForm from './form/EmpListForm';

const HR_Employee_Type = () => {
  return (
    <>
    <div>
    <Header />
    </div>
    <div className=''>
    <EmployeeTypeList 
    />
    </div>
    </>
  )
}
export default HR_Employee_Type