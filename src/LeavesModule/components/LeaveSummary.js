import React, { useEffect, useState } from 'react'
import Header from '../../components/Includes/Header'
import '../assets/css/Leaves.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import { Space, Table, Pagination, Tag, Tooltip, message, Modal, Input } from 'antd';
import * as EMP_LEAVES_APPROVALS_ACTIONS from "../../store/actions/Leave/Approvals/index"
import { saveAs } from "file-saver";
const config = require('../../config.json')



function LeaveSummary({
    Red_Emp_Leaves_Approvals,
    Emp_Approved_leave,
    Emp_Rejected_leave,
    Emp_Step_Back_leave,
    LEAVE_SUMMERY_BY_ID,
    LEAVE_SUMMERY_FILE_BY_ID
}) {
    const { TextArea } = Input;
    const search = useLocation().search
    var userId = new URLSearchParams(search).get('userId')
    const leaveSummery = Red_Emp_Leaves_Approvals?.LEAVE_SUMMERY_DATA?.[0]?.res
    const files = Red_Emp_Leaves_Approvals?.LEAVE_SUMMERY_FILE?.[0]?.res
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [whichisStep, setWhichisStep] = useState({ step: "", code: "" })
    const [value, setValue] = useState('');
    const [heading, setheading] = useState()

    const showModal = (step, code, e) => {
        e.preventDefault()
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
    const handleOk = async (e) => {
        if (whichisStep?.step == "Approved") {
            message.loading("Please wait....")
            const isSaveFun = await Emp_Approved_leave({ Tran_Code: whichisStep?.code, remarks: value })
            if (isSaveFun?.success) {
                message.success("You have been Approved this leave...")
                setTimeout(() => {
                    message.destroy()
                    setIsModalOpen(false);
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                    window.location.href = "/TAShortsCut"
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
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                    window.location.href = "/TAShortsCut"
                }, 2000);
            } else {
                message.error(isSaveFun?.message || isSaveFun?.messsage)
                setTimeout(() => {
                    message.destroy()
                }, 2000);
            }
        }
        else if (whichisStep?.step == "Step_Back") {
            message.loading("Please wait....")
            const isSaveFun = await Emp_Step_Back_leave({ Tran_Code: whichisStep?.code, remarks: value })
            if (isSaveFun?.success) {
                message.success("You have been Step Back this leave...")
                setTimeout(() => {
                    message.destroy()
                    setIsModalOpen(false);
                    setValue("")
                    setWhichisStep({ step: "", code: "" })
                    window.location.href = "/TAShortsCut"
                }, 2000);
            } else {
                message.error(isSaveFun?.message || isSaveFun?.messsage)
                setTimeout(() => {
                    message.destroy()
                }, 2000);
            }
        }
    }
   
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

    const filecolumns = [
        {
            title: 'File Name',
            key: 'filename',
            render: (data) => (
                <Space size="middle">
                    <span>{data?.FileName.slice(0, 10)}...</span>
                </Space>
            ),
        },
        {
            title: 'View',
            key: 'view',
            render: (data) => (
                <Space size="middle">
                    <td>{data?.FileName ?
                        <a style={{ background: "#014f86", cursor: "pointer" }} className='text-white text-center py-1 px-3 rounded'
                            onClick={(e) => {
                                const imageSource = `${config["baseUrl"]}/${data?.ConstructedPath}`;
                                saveAs(imageSource, "employeesAttachments");
                            }}
                        >Download</a> : "Not Found"}</td>
                </Space>
            ),
        },
        {
            title: 'Posting Date',
            key: 'Posting_date',
            render: (data) => (
                <Space size="middle">
                    <span>{data?.Posting_date?.slice(0,10)}</span>
                </Space>
            ),
        },
        {
            title: 'Reason',
            key: 'Reason',
            render: (data) => (
                <Space size="middle">
                    <div className='ApprovalsActionBox'>
                        <button onClick={() => ShowReason(data)}>View</button>
                    </div>
                </Space>
            ),
        },
    ];


    useEffect(() => {
        if (leaveSummery?.message == "failed" || leaveSummery?.messsage == "failed") {
            message.error(`In Leave summery ${leaveSummery?.message || leaveSummery?.messsage}`)
        }else if (files?.message == "failed" || files?.messsage == "failed") {
            message.error(`In Leave summery ${files?.message || files?.messsage}`)
        }
    }, [leaveSummery,files])

    useEffect(() => {
        LEAVE_SUMMERY_BY_ID(userId)
        LEAVE_SUMMERY_FILE_BY_ID(userId)
    }, [userId])

    return (
        <>
            <div className='mb-5'>
                <Header />
            </div>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <h5 className='mb-2'><b>Leave Summery Application</b></h5>
                            <hr className='mb-3' />
                            <form action="">
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>Requester Name</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Emp_Name ? leaveSummery?.data?.[0]?.[0]?.Emp_Name : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>Leave Type</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Leave_name ? leaveSummery?.data?.[0]?.[0]?.Leave_name : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>Leave Balance Days</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Leave_Balance_days ? leaveSummery?.data?.[0]?.[0]?.Leave_Balance_days : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor=""><b>Half Day</b></label>
                                    <Input
                                        placeholder=""
                                        type='checkbox'
                                        style={{ color: "black", width: "auto" }}
                                        checked={leaveSummery?.data?.[0]?.[0]?.Leave_Days == 0.5 ? true : false} readOnly
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>Apply Leave Days</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Leave_Days ? leaveSummery?.data?.[0]?.[0]?.Leave_Days : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>From Date</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Start_Date ? leaveSummery?.data?.[0]?.[0]?.Start_Date : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>To Date</b></label>
                                    <Input
                                        placeholder=""
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.End_Date ? leaveSummery?.data?.[0]?.[0]?.End_Date : "Not Found"} disabled
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='mb-2'><b>Reason</b></label>
                                    <TextArea
                                        placeholder=""
                                        disabled
                                        style={{ color: "black" }}
                                        value={leaveSummery?.data?.[0]?.[0]?.Reason ? leaveSummery?.data?.[0]?.[0]?.Reason : "Not Found"}
                                    />
                                </div>
                                <div className='ApprovalsActionBox mb-5'>
                                    <button onClick={(e) => showModal('Approved', userId, e)}>Approved</button>
                                    <button className="mx-3" onClick={(e) => showModal('Rejected', userId, e)}>Rejected</button>
                                    <button onClick={(e) => showModal('Step_Back', userId, e)}>Step Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-12 mt-5 empLeavesBgColor">
                        <div className='empLeavesTableHead'>
                            <h5 className='text-dark pl-2 mb-3 mt-2'><b>Attachment</b></h5>
                        </div>
                        <div>
                            <Table
                                columns={filecolumns}
                                loading={Red_Emp_Leaves_Approvals?.loading}
                                dataSource={files?.data?.[0]}
                                scroll={{ x: 10 }}
                                pagination={true}
                            />
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
export default connect(mapStateToProps, EMP_LEAVES_APPROVALS_ACTIONS)(LeaveSummary) 
