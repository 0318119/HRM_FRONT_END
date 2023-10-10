import React from "react";
import Header from "../components/Includes/Header";
import ReligionList from "./components/ReligionList";
const HRReligion = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="">
                <ReligionList />
            </div>
        </>
    );
};

export default HRReligion;
