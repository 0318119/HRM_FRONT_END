import React from "react";
import "../assets/css/MasterDateLeavers.css";

function MasterData_Leaves() {
    return (
        <div className="container-fluid py-2">
            <div className="container-fluid mt-5  MasterData_LeavesContainer">
                <div className="row w-100 mx-0">
                <span className="MasterData_LeavesHeader py-2">Employee Master Detail Data - Active And Leavers</span>
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
                                    <label htmlFor="">SNo</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Emp_id</label>
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
                                    <label htmlFor="">Grade</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Designation</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Date OF Birth</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Appointment Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contract Start Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contract End Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Confirmation Due Date</label>
                                </div>
                            </div>
                            <div className="col-md-2">
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
                                    <label htmlFor="">Employement Status</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Confirmation Extended</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Retirement Due Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Exit Date</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Exit Reason</label>
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
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Org Unit Name</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Business Sector Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Pay  Grade Area Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Location</label>
                                </div>
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
                                    <label htmlFor="">Employees Personal Email</label>
                                </div>
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
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Contact Hometel2</label>
                                </div>
                            </div>
                            <div className="col-md-3">
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
                                    <label htmlFor="">Payroll Category Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employement Type Worker Officer</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Employee Blood Group</label>
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
                                    <label htmlFor="">Branch Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Branch Code</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Bank Name</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Basic Salary</label>
                                </div>
                                <div className="form-group MasterChecklist d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <label htmlFor="">Gross Salary</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default MasterData_Leaves;
