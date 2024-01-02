import React, { useEffect, useState } from 'react'
import Header from '../../components/Includes/Header'
import { connect } from "react-redux";
import { Space, Table, Pagination, Tag, Tooltip, message } from 'antd';
import * as EMP_LEAVES_APPROVALS_ACTIONS from "../../../src/store/actions/Leave/Approvals/index"

function Approvalsss({
    Red_Emp_Leaves_Approvals,
    GET_ALL_EMP_APPROVAL_DATA
}) {
    const ApprovalsData = Red_Emp_Leaves_Approvals?.GET_ALL_APPROVALS_DATA?.res




    console.log("Red_Emp_Leaves_Approvals",Red_Emp_Leaves_Approvals)
    useEffect(() => {
        GET_ALL_EMP_APPROVAL_DATA()
    }, [])
    useEffect(() => {
        if(ApprovalsData?.message == "faild" || ApprovalsData?.message == "faild"){
            message.error(`in all approvals ${ApprovalsData?.message || ApprovalsData?.messsage}`)
        }
    },[ApprovalsData])
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row justif">
                    <div className="col-lg-12">
                        <div className='leaveApprovalBox'>
                            <h5>Leaves Approvals</h5>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function mapStateToProps({ Red_Emp_Leaves_Approvals }) {
    return { Red_Emp_Leaves_Approvals };
}
export default connect(mapStateToProps, EMP_LEAVES_APPROVALS_ACTIONS)(Approvalsss) 