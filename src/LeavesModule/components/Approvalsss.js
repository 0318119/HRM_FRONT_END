import React from 'react'
import Header from '../../components/Includes/Header'
import { connect } from "react-redux";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as EMP_LEAVES_APPROVALS_ACTIONS from "../../../src/store/actions/Leave/Approvals/index"

function Approvalsss() {
  return (
    <>
    <div>
        <Header />
    </div>
    <div className="container" style={{marginTop: "100xp"}}>
        <div className="row">
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