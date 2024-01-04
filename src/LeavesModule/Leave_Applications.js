import React from 'react'
import Header from '../components/Includes/Header'
import LeaveCategoryList from './components/Leaves'
import Tabs from '../dashboard/tabs/tabs'
import Reports from './components/Reports'
import Approvalsss from './components/Approvalsss'
const Leave_Applications = () => {
   const tabs = [
     { title: "Leave", content: <LeaveCategoryList  /> },
     { title: "Approval", content: <Approvalsss /> },
     { title: "Reports", content: <Reports /> },
   ];
  return (
    <>
    <div>
      <Header />
    </div>
      <div className='mt-5'>
        <Tabs tabs={tabs} />
      </div>
    </>
  )
}

export default Leave_Applications