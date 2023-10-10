import React from "react";
import Header from "../components/Includes/Header";
import Master_PersonalList from "./components/Master_PersonalList";
const MasterPersonal = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5 px-1">
                <Master_PersonalList />
            </div>
        </>
    );
};

export default MasterPersonal;