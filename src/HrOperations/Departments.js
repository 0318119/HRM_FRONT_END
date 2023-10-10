import React from 'react'
import Header from '../components/Includes/Header';
import DepartmentList from './components/DepartmentList'

const Departments = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className=''>
                <DepartmentList />
            </div>
        </>
    )
}

export default Departments