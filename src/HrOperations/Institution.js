import React from "react";
import Header from "../components/Includes/Header";
import InstitutionsList from "./components/InstitutionsList";
const HRInstitutions = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <InstitutionsList />
            </div>
        </>
    );
};

export default HRInstitutions;
