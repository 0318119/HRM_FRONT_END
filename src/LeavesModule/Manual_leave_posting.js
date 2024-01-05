import React, { useState, useEffect } from 'react'
import '../LeavesModule/assets/css/manual_leave_posting.css'
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../components/Includes/Header';
import * as MANUAL_LEAVE_POSTING_ACTIONS from "../store/actions/Leave/Manual_Leave_Posting/index";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as yup from "yup";
import { message } from 'antd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/basic/input";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import { Button } from '../components/basic/button';
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";

const config = require('../config.json')

const Manual_leave_posting = ({
    Red_Manual_Leave_Posting,
    GET_ALL_EMP_DATA,
    GET_EMP_LEAVE_TYPE_DATA,
    GET_EMP_APPLIED_LEAVE_DATA,
    GET_EMP_BALANCED_DAYS,
    SAVE_LEAVE_APPLICATION,
    SUBMIT_LEAVE_APPLICATION,
    GET_LEAVES_APPLICATIONS,
    DELETE_LEAVE_APPLICATION
}) => {
    var Emp_code = localStorage.getItem("Emp_code");
    const navigate = useNavigate()
    const currentDate = new Date().toISOString().slice(0, 10);
    const emp_all_data = Red_Manual_Leave_Posting?.AllEmployees?.[0]
    const emp_leave_type_data = Red_Manual_Leave_Posting?.leavetype?.[0]?.res
    const emp_leaves_applied = Red_Manual_Leave_Posting?.appliedDays?.[0]?.res
    const emp_balanced_days = Red_Manual_Leave_Posting?.balanceDays?.[0]?.res
    const getLeaveApp = Red_Manual_Leave_Posting?.getLeaceApplications?.[0]
    const [leaveCalculations, setleaveCalculations] = useState(0)
    const [isLoading,setLoading] = useState(false)
    const [halfDayCheck, sethalfDayCheck] = useState(0)
    const [isLeaveReq, setLeaveReq] = useState(Emp_code)
    const [isLeave, setLeave] = useState(null)
    const [isLeaveReason, setLeaveReason] = useState(null)
    const [isDate, setDate] = useState([
        { FromDate: currentDate }, { ToDate: currentDate },
    ]);
    const [isDateScd, setDateScd] = useState([
        { FromDate: currentDate }, { ToDate: currentDate },
    ]);

    const {
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(),
    });

    useEffect(() => {
        GET_ALL_EMP_DATA()
        GET_LEAVES_APPLICATIONS()
    }, [])

    useEffect(() => {
        if (isLeaveReq !== null) {
            GET_EMP_LEAVE_TYPE_DATA(isLeaveReq)
        }
    }, [isLeaveReq])

    useEffect(() => {
        if (isLeaveReq !== null) {
            GET_EMP_APPLIED_LEAVE_DATA({
                code: isLeaveReq,
                startDate: isDate[0].FromDate,
                endDate: isDate[1].ToDate
            })
        }
    }, [isDate, isLeaveReq])

    useEffect(() => {
        if (emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code) {
            GET_EMP_BALANCED_DAYS({
                code: isLeaveReq,
                leave_code: emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code,
                startDate: isDateScd[0].FromDate,
                endDate: isDateScd[1].ToDate
            })
            setLeave(emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code)
        }
    }, [isDateScd, emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code, isLeaveReq])

    useEffect(() => {
        if (isLeave) {
            setLeave(emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code)
        }
    }, [isLeave, emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code])


    // useEffect(() => {
    //     if (halfDayCheck == false && emp_balanced_days) {
            // setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - emp_leaves_applied?.data?.[0]?.[0]?.Leaves)
    //     }
    //     else if (halfDayCheck == true && isDateScd[0].FromDate == isDateScd[1].ToDate) {
    //         setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - 0.5)
    //     }
    //     else if (halfDayCheck == true && isDateScd[0].FromDate !== isDateScd[1].ToDate) {
    //         message.error("To date is should be equal to From Date")
    //     }
    //     else { setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - emp_leaves_applied?.data?.[0]?.[0]?.Leaves) }
    // }, [emp_balanced_days, emp_leaves_applied, halfDayCheck])

    useEffect(() => {
        if(halfDayCheck == false && emp_balanced_days){
            if(isDate[0].FromDate == isDate[1].ToDate || isDate[0].FromDate < isDate[1].ToDate){
                setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - emp_leaves_applied?.data?.[0]?.[0]?.Leaves)
                setLoading(false)
            }else{
                message.error("To date should not be less than From Date");
                setLoading(true)
            }
        }else if(halfDayCheck == true && emp_balanced_days){
            if(isDate[0].FromDate == isDate[1].ToDate){
                setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - 0.5)
                setLoading(false)
            }else{
                message.error("To date is should be equal to From Date")
                setLoading(true)
            }
        }
    },[emp_balanced_days, emp_leaves_applied, halfDayCheck,isDate,leaveCalculations])


    if (emp_all_data?.res?.message == "failed") { message.error("in all Employee :" + emp_all_data?.res?.message) }
    else if (emp_leaves_applied?.message == "failed") { message.error("in leave Applied :" + emp_leaves_applied?.message) }
    else if (emp_leave_type_data?.message == "failed") { message.error("in leave type :" + emp_leave_type_data?.message) }
    else if (emp_balanced_days?.message == "failed") { message.error("in leave balance :" + emp_balanced_days?.message) }

    // HALF DAY FLAG EVENT =================
    const changeBox = (e) => {
        if (e.target.checked == true) {
            sethalfDayCheck(e.target.checked)
        } else {
            sethalfDayCheck(e.target.checked)
        }
    }

    // SAVE LEAVE APPLICATION API CALL =====================================
    const payLoad = JSON.stringify({
        "Tran_Code": 0,
        "Emp_code": isLeaveReq,
        "Leave_type_code": isLeave,
        "start_date": isDate[0].FromDate,
        "end_date": isDate[1].ToDate,
        "LeaveDays": halfDayCheck == true ? 0.5 : emp_leaves_applied?.data?.[0]?.[0]?.Leaves,
        "reason": isLeaveReason
    })
    const saveLeaveApplication = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (isDate[0].FromDate == null) { 
            message.error("Start Date is required")
            setLoading(false)
        }
        else if (isDate[1].ToDate == null) {
             message.error("End Date is required") 
             setLoading(false)
        }
        else if (isLeave == null) {
            message.error("Leave Type is required") 
            setLoading(false)
        }
        else if (isLeaveReason == null) { 
            message.error("Leave Reason is required") 
            setLoading(false)
        }
        else {
            setLoading(true)
            const isSaveFun = await SAVE_LEAVE_APPLICATION(payLoad)
            if (isSaveFun?.success) {
                const isSubmitFun = await SUBMIT_LEAVE_APPLICATION(payLoad)
                if (isSubmitFun?.success) {
                    message.success("Submit : You have applied leave!")
                    setLeaveReason(null)
                    GET_LEAVES_APPLICATIONS()
                    setLoading(false)
                    setTimeout(() => {
                        navigate("/TAShortsCut")
                    }, 2000);

                }
                else { 
                    message.error(`in submit : ${isSubmitFun?.message || isSubmitFun?.messsage}`)
                    setLoading(false)
                }
            } else {
                    message.error(`in save : ${isSaveFun?.message || isSaveFun?.messsage}`)
                    setLoading(false)
            }
        }
    }
    const columns = [
        {
          title: "Name",
          dataIndex: "Emp_name",
          key: "Emp_name",
        },
        {
          title: "Leave Name",
          dataIndex: "Leave_name",
          key: "Leave_name",
        },
        {
          title: "From Date",
          dataIndex: "Start_Date",
          key: "Start_Date",
        },
        {
          title: "To Date",
          dataIndex: "End_Date",
          key: "End_Date",
        },
        {
          title: "Action",
          key: "action",
          render: (data) => (
            <Space size="middle">
              <Popconfirm
                title="Delete the Leave"
                description="Are you sure to delete the Leave?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  onConfirmDeleteFun({
                    code: data?.Emp_code,
                    startDate: data?.Start_Date,
                    endDate: data?.End_Date
                  })
                }}
              >
                <button className="deleteBtn">
                  <MdDeleteOutline />
                </button>
              </Popconfirm>
            </Space>
          ),
        },
    ];
    const onConfirmDeleteFun = async (payLoad) => {
    const isWaitFun = await DELETE_LEAVE_APPLICATION(payLoad)
    if(isWaitFun?.success){
        message.success("You have been deleted Leave!")
        GET_LEAVES_APPLICATIONS()
    }else{
        message.error(isWaitFun?.message || isWaitFun?.messsage)
    }
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 maringClass manual_Leaves_bg">
                        <form>
                            <h5 className='text-dark pl-2 mb-3 mt-2'><b>Manual Leave Application</b></h5>
                            <div>
                                <FormSelect
                                    label={"Select the requester name"}
                                    placeholder="please select the requester name"
                                    id="Emp_code"
                                    name="Emp_code"
                                    value={emp_all_data?.res?.data?.filter((items) => items?.Emp_code == isLeaveReq)?.[0]?.Emp_name}
                                    onChange={(e) => {
                                        setLeaveReq(e)
                                    }}
                                    options={emp_all_data?.res?.data?.map(
                                        (item) => ({
                                            value: item.Emp_code,
                                            label: item.Emp_name,
                                        })
                                    )}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormSelect
                                    label={"Select the leave type"}
                                    placeholder="please select the leave type"
                                    id="Leave_type_code"
                                    name="Leave_type_code"
                                    value={emp_leave_type_data?.data?.[0]?.[0]?.leave_name}
                                    onChange={(e) => {
                                        setLeave(e)
                                    }}
                                    options={[
                                        {
                                            value: emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code,
                                            label: emp_leave_type_data?.data?.[0]?.[0]?.leave_name
                                        }
                                    ]}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput
                                    label={'Balance Days'}
                                    placeholder={'Balance Days'}
                                    readOnly={true}
                                    id=""
                                    name=""
                                    value={leaveCalculations ? leaveCalculations : 0}
                                    type="number"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <div className='manualLeavePostionHalfDayBox'>
                                    <FormInput
                                        className={'appliedInput'}
                                        label={'Applied Days'}
                                        placeholder={'Applied Days'}
                                        readOnly={true}
                                        id=""
                                        name=""
                                        type="number"
                                        value={halfDayCheck == false ? emp_leaves_applied?.data?.[0]?.[0]?.Leaves : 0.5}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <Input placeholder={false} label={"Half Day"} type="checkbox" id="inputBox" className="half_day"
                                        onChange={(e) => { changeBox(e) }}
                                    />
                                </div>
                                <FormInput
                                    label={'From Date'}
                                    placeholder={'From Date'}
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    defaultValue={currentDate}
                                    onChange={(e) => {
                                        setDate(prevData => {
                                            const newDate = [...prevData];
                                            newDate[0].FromDate = e.target.value;
                                            return newDate;
                                        });
                                        setDateScd(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].FromDate = e.target.value;
                                            return newDate;
                                        });
                                    }}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput
                                    label={'To Date'}
                                    placeholder={'To Date'}
                                    defaultValue={currentDate}
                                    onChange={(e) => {
                                        setDate(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].ToDate = e.target.value;
                                            return newDate;
                                        });
                                        setDateScd(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].ToDate = e.target.value;
                                            return newDate;
                                        });
                                    }}
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput
                                    label={'Reason'}
                                    placeholder={'Please enter reason'}
                                    id="reason"
                                    name="reason"
                                    onChange={(e) => { setLeaveReason(e.target.value) }}
                                    type="text"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                            </div>
                            <div className='CountryBtnBox'>
                                <Button type={'submit'} onClick={(e) => saveLeaveApplication(e)}loading={isLoading} title="Submit" />
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-9 mt-5 manual_Leaves_bg">
                        <div>
                            <h5 className='text-dark pl-2 mb-3 mt-2'><b>Manual Leave Application</b></h5>
                            <Table
                                columns={columns}
                                loading={Red_Manual_Leave_Posting?.loading}
                                dataSource={getLeaveApp?.res?.data?.[0]}
                                scroll={{ x: 10 }}
                                pagination={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function mapStateToProps({ Red_Manual_Leave_Posting }) {
    return { Red_Manual_Leave_Posting };
}
export default connect(mapStateToProps, MANUAL_LEAVE_POSTING_ACTIONS)(Manual_leave_posting) 