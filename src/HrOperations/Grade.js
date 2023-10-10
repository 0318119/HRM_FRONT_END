import React from "react";
import Header from "../components/Includes/Header";
import GradeList from "./components/GradesList";

const HRGradeList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="">
        <GradeList />
      </div>
    </>
  );
};
export default HRGradeList;
