import React, { useState } from "react";
import Header from "../components/Includes/Header";
import TransactionAppointmentCom from "./transactionAppointmentCom";

const Appointment = (props) => {
 

  return (
    <>
      <div>
        <Header/>
      </div>
      <div>
        <TransactionAppointmentCom />
      </div>
    </>
  );
};

export default Appointment;
