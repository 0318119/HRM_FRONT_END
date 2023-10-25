import React, { useEffect, useState } from "react";
import "../assets/css/TransactionFamilyForm.css";
import  Input  from '../../components/basic/input';
import { Button } from '../../components/basic/button';
import { DatePicker,Radio } from 'antd';
import * as Transaction_Family_Actions from "../../store/actions/Transition/transition_family/index";
import { connect } from "react-redux";



function TransactionFamilyForm({ Transition_Family_Get_Byid, Transition_family,detailData}) {
    // useEffect(()=>[
    //     Transition_Family_Get_Byid(detailData)
    // ],[])
    // console.log(detailData,'hi taha')
    return (
        <>
            <div className="container-fluid TransactionFamilyFormContainer">
                <form className="p-2">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="TransactionFamilyFromHeading">Employee Information</span>
                            <hr />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 EmployeeInfoFamily">
                            <div className=" TransactionFamilyFormgroup">
                                <Input type="text" name="" id="" placeholder="Enter Your Name" label="Employee Name" />
                            </div>
                            <div className="TransactionFamilyFormgroup">
                                <Input type="text" name="" id="" placeholder="Enter Your Designation" label="Designation" />
                            </div>
                            <div className=" TransactionFamilyFormgroup">
                                <Input type="text" name="" id="" placeholder="Enter Your Department" label="Department" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <span className="TransactionFamilyFromHeading">Marriage Information</span>
                            <hr />
                        </div>
                        <div className="col-12 MarriageInfo">
                            <div className="TransactionFamilyFormgroup">
                                <Input type="text" required placeholder="Enter Your Spouse Name" label="Spouse Name" />
                            </div>
                            <div className="TransactionFamilyFormgroup">
                                <label htmlFor="">Spouse D.O.B</label>
                                <DatePicker className="form-control DatePicker" required />
                            </div>
                            <div className="TransactionFamilyFormgroup">
                                <label htmlFor="">Marriage Date</label>
                                <DatePicker className="form-control DatePicker" required />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 p-2 mt-2">
                            <div className="TransactionFamilybtncontainer d-flex">
                                <Button title="Save" />
                            </div>
                        </div>
                    </div>
                </form>
                <form  className="p-2">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="TransactionFamilyFromHeading">Children History</span>
                            <hr />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 EmployeeInfoFamily">
                            <div className=" TransactionFamilyFormgroup">
                                <Input type="text" name="" id="" placeholder="Enter Your Child Name" label="Child Name" />
                            </div>
                            <div className="TransactionFamilyFormgroup">
                                <label htmlFor="">Date Of Birth</label>
                                <DatePicker className="form-control DatePicker" required />
                            </div>
                            <div className="d-flex flex-column TransactionFamilyFormgroup">
                                <label htmlFor="">Gender</label>
                                <Radio.Group  className="mt-2">
                                    <Radio value={1}>Son</Radio>
                                    <Radio value={2}>Daughter</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 p-2 mt-2">
                            <div className="TransactionChilddBtn d-flex">
                                <Button title="Save" /> <Button title="Delete" />
                            </div>
                        </div>
                    </div>
                   
                </form>
            </div>
        </>



    );
}
function mapStateToProps({ Transition_family }) {
    return { Transition_family };
}
export default connect(mapStateToProps, Transaction_Family_Actions)(TransactionFamilyForm);