import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/Trans_Holidays.css'

function Trans_Holidays() {

    return (
        <div className="container-fluid  p-2">
            <div className="container-fluid  Transac_Holiday_listContainer">
                <div className="row w-100 mx-0">
                    <span className="Transac_Holiday_listHeader">
                        Transaction Holidays
                    </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-6">
                        <span className="HolidayYearPop">Populate  Year Data</span>
                        <div className="form-group Populateholidays">
                            <div className="w-100">
                                <label htmlFor="">Year</label>
                                <select name="" id="" className="form-select">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                            <button className="btn mx-1 mt-4">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-column p-3">
                    <div className="col-lg-6">
                        <span className="HolidayYearPop">Update Holidays</span>
                        <div className="UpdateHoliday">
                            <div className="form-group w-100">
                                <label htmlFor="">Date</label>
                                <input type="Date" className="form-control" />
                            </div>
                            <div className="form-group w-100 mx-1">
                                <label htmlFor="">Holiday Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 d-flex align-items-center">
                        <div className="form-group w-100 mx-1">
                            <label htmlFor="">Date Type</label>
                            <select name="" id="" className="form-select">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">5</option>
                            </select>
                        </div>
                        <div className="form-group w-100 mx-1">
                            <label htmlFor="">Remarks</label>
                            <input type="text" name="" id="" className="form-control" />
                        </div>
                        <button className="btn mt-4">Update</button>
                    </div>


                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-7">
                        <span className="HolidayYearPop">Ramadan</span>
                        <div className="RamdanHolidays">
                            <div className="form-group w-100 mx-1">
                                <label htmlFor="">From Date</label>
                                <input type="Date" name="" id="" className="form-control" />
                            </div>
                            <div className="form-group w-100 mx-1">
                                <label htmlFor="">To Date</label>
                                <input type="Date" name="" id="" className="form-control" />
                            </div>
                            <div className="form-group w-100 mx-1">
                                <button className="btn mt-4">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trans_Holidays;