import React, { useEffect, useState } from 'react';
import Header from '../components/Includes/Header'
import CheckAttendance from "./components/CheckAttendance"

const Attendance_Check = () => {

  return (
      <div>
        <Header />
        <CheckAttendance />
    </div>
  )
}

export default Attendance_Check