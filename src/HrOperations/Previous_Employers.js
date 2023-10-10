import React from "react";
import Header from "../components/Includes/Header";
import PreEmployerList from "./components/PreEmployerList";
const HRPreEmployer = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <PreEmployerList />
            </div>
        </>
    );
};

export default HRPreEmployer;
