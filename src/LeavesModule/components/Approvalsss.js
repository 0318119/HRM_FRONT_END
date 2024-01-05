import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import '../../../src/LeavesModule/assets/css/Approval.css'
import { Space, Table, Pagination, Tag, Tooltip, message, Modal, Input } from 'antd';
import * as EMP_LEAVES_APPROVALS_ACTIONS from "../../../src/store/actions/Leave/Approvals/index"
import { saveAs } from "file-saver";
const config = require('../../config.json')


function Approvalsss({
    Red_Emp_Leaves_Approvals,
    GET_ALL_EMP_APPROVAL_DATA,
    Emp_Approved_leave,
    Emp_Rejected_leave,
    Emp_Step_Back_leave
}) {
    const { TextArea } = Input;
    const ApprovalsData = Red_Emp_Leaves_Approvals?.GET_ALL_APPROVALS_DATA?.[0]?.res
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [whichisStep, setWhichisStep] = useState({ step: "", code: "" })
    const [value, setValue] = useState('');
    const [heading, setheading] = useState()

    const showModal = (step, code) => {
        setWhichisStep({
            step: step,
            code: code
        })
        setheading(step)
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setWhichisStep({
            step: "",
            code: ""
        })
        setValue("")
    };

    const ShowReason = (e) => {
        Modal.info({
            title: 'Reason',
            content: (
                <div className='approvalsReasonModal'>
                    <p>{e?.Reason}</p>
                </div>
            ),
            onOk() { },
        });
    };

    const handleOk = async (e) => {
        if (whichisStep?.step == "Approved") {
            message.loading("Please wait....")
            const isSaveFun = await Emp_Approved_leave({ Tran_Code: whichisStep?.code, remarks: value })
            if (isSaveFun?.success) {
                message.success("You have been Approved this leave...")
                setTimeout(() => {
                    message.destroy()
                    setIsModalOpen(false);
                    GET_ALL_EMP_APPROVAL_DATA()
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                }, 2000);
            } else {
                message.error(isSaveFun?.message || isSaveFun?.messsage)
                setTimeout(() => {
                    message.destroy()
                }, 2000);
            }
        }
        else if (whichisStep?.step == "Rejected") {
            message.loading("Please wait....")
            const isSaveFun = await Emp_Rejected_leave({ Tran_Code: whichisStep?.code, remarks: value })
            if (isSaveFun?.success) {
                message.success("You have been Rejected this leave...")
                setTimeout(() => {
                    message.destroy()
                    setIsModalOpen(false);
                    GET_ALL_EMP_APPROVAL_DATA()
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                }, 2000);
            } else {
                message.error(isSaveFun?.message || isSaveFun?.messsage)
                setTimeout(() => {
                    message.destroy()
                }, 2000);
            }
        }  
        else if(whichisStep?.step == "Step_Back"){
            message.loading("Please wait....")
            const isSaveFun = await Emp_Step_Back_leave({ Tran_Code: whichisStep?.code, remarks: value })
            if (isSaveFun?.success) {
                message.success("You have been Step Back this leave...")
                setTimeout(() => {
                    message.destroy()
                    setIsModalOpen(false);
                    GET_ALL_EMP_APPROVAL_DATA()
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                }, 2000);
            } else {
                message.error(isSaveFun?.message || isSaveFun?.messsage)
                setTimeout(() => {
                    message.destroy()
                }, 2000);
            }
        }
    }

    const columns = [
        {
            title: "Code",
            dataIndex: "Tran_Code",
            key: "Tran_Code",
        },
        {
            title: "Name",
            dataIndex: "EmployeeName",
            key: "EmployeeName",
        },
        {
            title: "Location",
            dataIndex: "LocationName",
            key: "LocationName",
        },
        {
            title: "Leave Name",
            dataIndex: "Leave_name",
            key: "Leave_name",
        },
        {
            title: "File",
            key: "FileName",
            render: (data) => (
                <Space size="middle">
                    {data?.FileName && data?.ConstructedPath ?
                        <div className='ApprovalsActionBox'>
                            <a style={{ background: "#014f86", cursor: "pointer" }} className='text-white text-center py-1 px-3 rounded'
                                onClick={(e) => {
                                    const imageSource = `${config["baseUrl"]}/${data?.ConstructedPath}`;
                                    saveAs(imageSource, "employeesAttachments");
                                }}
                            >Download</a>
                        </div> : <span className='notFound'>Not Found</span>
                    }
                </Space>
            ),
        },
        {
            title: 'Reason',
            key: 'Reason',
            render: (data) => (
                <Space size="middle">
                    <div className='ApprovalsActionBox'>
                        <button className="btnBg" onClick={() => ShowReason(data)}>View</button>
                    </div>
                </Space>
            ),
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            key: "StartDate",
        },
        {
            title: "End Date",
            dataIndex: "EndDate",
            key: "EndDate",
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
        },
        {
            title: "Posting Date",
            dataIndex: "Posting_date",
            key: "Posting_date",
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    {
                        data?.Status == "Step Back" || data?.Status == "Rejected" ? null :
                            <div className='ApprovalsActionBox'>
                                <button onClick={() => showModal('Approved', data?.Tran_Code)}>Approved</button>
                                <button onClick={() => showModal('Rejected', data?.Tran_Code)}>Rejected</button>
                                <button onClick={() => showModal('Step_Back', data?.Tran_Code)}>Step Back</button>
                            </div>
                    }
                </Space>
            ),
        },
    ];

    useEffect(() => {
        GET_ALL_EMP_APPROVAL_DATA()
    }, [])

    useEffect(() => {
        if (ApprovalsData?.message == "failed" || ApprovalsData?.messsage == "failed") {
            message.error(`in all approvals ${ApprovalsData?.message || ApprovalsData?.messsage}`)
        }
    }, [ApprovalsData])

    return (
        <>
            <div className="container">
                <div className="row justif">
                    <div className="col-lg-12">
                        <div className='leaveApprovalBox'>
                            <h5>Leaves Approvals</h5>
                            <div>
                                <Table
                                    columns={columns}
                                    loading={Red_Emp_Leaves_Approvals?.loading}
                                    dataSource={ApprovalsData?.data?.[0]}
                                    scroll={{ x: 10 }}
                                    pagination={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={heading} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Please Enter a Reaseon..."
                />
            </Modal>
        </>
    )
}


function mapStateToProps({ Red_Emp_Leaves_Approvals }) {
    return { Red_Emp_Leaves_Approvals };
}
export default connect(mapStateToProps, EMP_LEAVES_APPROVALS_ACTIONS)(Approvalsss) 