import React from 'react'
import Header from '../components/Includes/Header'
import Get_AttendanceList from './components/Get_AttendanceList'
import '../Attendance/Assets/css/get_Attendance.css'

function Get_Attendance() {
  return (
    <>
    <div id='prheader'>
        <Header />
    </div>
    <div>
      <Get_AttendanceList />
    </div>
    </>
  )
}

export default Get_Attendance