import React, { useEffect, useState } from 'react';
import Header from '../components/Includes/Header'
import Get_AttendanceList from './components/Get_AttendanceList'


function Get_Attendance() {

  return (
    <>
    <div>
        <Header />
    </div>
    <div>
      <Get_AttendanceList />
    </div>
    </>
  )
}

export default Get_Attendance