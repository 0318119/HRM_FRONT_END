import React from "react";
import Header from "../components/Includes/Header";
import LocationList from "./components/LocationList";
const Locations = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <LocationList />
            </div>
        </>
    );
};

export default Locations;