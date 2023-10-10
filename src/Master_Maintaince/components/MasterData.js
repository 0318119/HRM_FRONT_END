import React from "react";
import "../assets/css/MasterDataSection.css";

function MasterData() {
    return (
        <div className="container-fluid mt-5 py-1">
            <div className="container-fluid mt-5  MasterDataContainer">
                 <div className="row w-100 mx-0">
                <span className="MasterDataHeader py-2">Employee Master Detail Data - column wise</span>
                 </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <button className="btn btn-dark mx-1">Export Excel</button>
                    </div>
                    
                </div>
                <div className="row p-3">
                    <div className="mt-2">
                        <p className="masterlistpara">select columns of your choice and press to excel button</p>
                    </div>
                    <div className="col-lg-12 p-2 border-top">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Select All</label>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">GeoLevel_1</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">GeoLevel_2</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">GeoLevel_3</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Location</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Code</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Father Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Gender</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Marital Status</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Religion</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">grade</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Designation</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Date Of Birth</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Appointment Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Confirmation Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Confirmation Flag</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Type</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">CostCenter Code</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Cost Center</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Section Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Department Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Devision Name</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Base Town</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Manager Code</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Manager Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Current Address</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Permanent Address</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Home tel1</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Home tel2</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Office tel</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Mobile No</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Cnic NO</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">EOBI No</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">NTN No</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Salary Account No</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Email Address</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Education</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Person Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Relitionship</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Address1</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Address2</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Hometel1</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Hometel2</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Bonus Category</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Category</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Rooster_Group</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Payroll Category Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Empployee Blood group</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Age</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Year Of Service</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Sharia Flag</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Company</label>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
               
            </div>
        </div>
    );
}

export default MasterData;
