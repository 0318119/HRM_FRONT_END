import React from "react";
import Header from "../components/Includes/Header";
import DesignationsList from "./components/DesignationsList";
const HR_Designations = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <DesignationsList />
            </div>
        </>
    );
};

export default HR_Designations;
