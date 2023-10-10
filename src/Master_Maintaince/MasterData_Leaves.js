import React from "react";
import Header from "../components/Includes/Header";
import MasterDataLeaves from '../Master_Maintaince/components/MasterDataLeaves'
const MasterData_Leaves = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <MasterDataLeaves />
            </div>
        </>
    );
};

export default MasterData_Leaves;
