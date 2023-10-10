import React from "react";
import Header from "../components/Includes/Header";
import MasterData from '../Master_Maintaince/components/MasterData'
const MasterData_Sec = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <MasterData />
            </div>
        </>
    );
};

export default MasterData_Sec;
