import React from "react";
import Header from "../components/Includes/Header";
import ResignationsList from "./components/ResignationsList";
const Resignation = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <ResignationsList />
            </div>
        </>
    );
};

export default Resignation;
