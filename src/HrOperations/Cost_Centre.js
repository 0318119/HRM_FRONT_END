import React from "react";
import Header from "../components/Includes/Header";
import CostList from "./components/CostList";
const HR_CostCentersList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="">
        <CostList />
      </div>
    </>
  );
};

export default HR_CostCentersList;
