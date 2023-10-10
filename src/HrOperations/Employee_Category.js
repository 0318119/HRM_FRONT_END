import React from "react";
import Header from "../components/Includes/Header";
import EmployeeList from "./components/EmployeeCategory";
const HREmployeeCategoryList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="">
        <EmployeeList />
      </div>
    </>
  );
};

export default HREmployeeCategoryList;
