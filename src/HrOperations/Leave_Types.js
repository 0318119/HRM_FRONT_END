import React from "react";
import Header from "../components/Includes/Header";
import LeaveTypeList from "./components/Leave_Types";
const Leave_Types = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <LeaveTypeList />
            </div>
        </>
    );
};

export default Leave_Types;
