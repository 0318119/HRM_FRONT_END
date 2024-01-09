import React, { useState, useEffect, useRef } from 'react'
import '../assets/css/Leaves.css'
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as EMP_LEAVES_ACTIONS from "../../../src/store/actions/Leave/Employee_Leaves/index";
import { message } from 'antd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popconfirm } from "antd";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Input from "../../../src/components/basic/input/index";
import { FormInput, FormSelect } from '../../../src/components/basic/input/formInput';
import { PrimaryButton, CancelButton, Button, SimpleButton } from '../../../src/components/basic/button';
import { Modal } from 'antd';
const config = require('../../config.json')

const Leaves = ({
  Red_Emp_Leaves,
  GET_ALL_EMP_DATA,
  GET_EMP_LEAVE_TYPE,
  GET_APPLIED_DAYS,
  GET_BALANCED_DAYS,
  SAVE_LEAVE_APPLICATION,
  GET_EMP_LEAVES_APP,
  GET_EMP_LEAVE_EDIT,
  SUBMIT_LEAVE_APPLICATION,
  GET_EMP_FILES,
  DELETE_FILE_OF_EMP_LEAVE,
  DELETE_LEAVE_APPLICATION
}) => {

  const inputRef = useRef(null);
  var Emp_code = localStorage.getItem("Emp_code");
  var Company_code = localStorage.getItem("company_code");
  const allEmpData = Red_Emp_Leaves?.AllEmployees?.[0]?.res
  const leaveTypeCode = Red_Emp_Leaves?.LEAVE_TYPE?.[0]?.res
  const appliedDays = Red_Emp_Leaves?.APPLIED?.[0]?.res
  const balancedDays = Red_Emp_Leaves?.BALANCED_DAYS?.[0]?.res
  const EditLeavebyId = Red_Emp_Leaves?.dataSingle?.[0]?.res
  const EditCodeEmp = EditLeavebyId?.data?.[0]?.[0]
  const filesData = Red_Emp_Leaves?.ATTACEMENTS_DATA?.[0]?.res
  const [isLeaveReq, setLeaveReq] = useState(Emp_code)
  const [isLeave, setLeave] = useState(null)
  const currentDatees = new Date().toISOString().slice(0, 10);
  const [halfDayCheck, sethalfDayCheck] = useState(0)
  const [leaveCalculations, setleaveCalculations] = useState(0)
  const [isDate, setDate] = useState([{ FromDate: currentDatees }, { ToDate: currentDatees }]);
  const [isDateScd, setDateScd] = useState([{ FromDate: currentDatees }, { ToDate: currentDatees }]);
  const [isLeaveReasons, setLeaveReasons] = useState("")
  const [isSaveLoading, setSaveLoading] = useState(false)
  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [mode, setMode] = useState('read')
  const [isCode, setCode] = useState(null)
  const [isValidate, setValidate] = useState(true)
  const [isShow, setShow] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isfile, setfile] = useState()
  const [isfileLoader, setfileLoader] = useState(false)
  const [isTranCode, setTranCode] = useState()
  const [isDeleteLeave, setDeleteLeave] = useState(false)
  const [isDeleteLoader, setDeleteLoader] = useState(false)
  const [isFileShow, setFileShow] = useState(false)

  const showModal = (e) => {
    e.preventDefault(e)
    setIsModalOpen(true);
  };
  const handleCancel = (e) => {
    e.preventDefault(e)
    setIsModalOpen(false);
  };
  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }

  const changeBox = (e) => {
    if (e.target.checked == true) {
      sethalfDayCheck(e.target.checked)
    } else {
      sethalfDayCheck(e.target.checked)
    }
  }

  const handleConfirmDelete = async (e) => {
    setDeleteLoader(true)
    const isSaveFun = await DELETE_FILE_OF_EMP_LEAVE(e)
    if (isSaveFun?.success) {
      message.success("You have been deleted successfully...")
      setDeleteLoader(false)
      GET_EMP_FILES(isCode)
    } else {
      message.error(isSaveFun?.message || isSaveFun?.messsage)
      setDeleteLoader(false)
    }
  }

  const ShowReason = (e) => {
    Modal.info({
      title: 'Reason',
      content: (
        <div className='approvalsReasonModal'>
          {
            e?.StepbackReason ?
              <p>{e?.StepbackReason}</p> :
              <span className='notFound'>Not Found</span>
          }
        </div>
      ),
      onOk() { },
    });
  };

  const savePayLoad = JSON.stringify({
    "Tran_Code": isCode !== null ? isCode : 0,
    "Emp_code": isLeaveReq,
    "LeaveTypeCode": isLeave,
    "FromDate": isDate[0].FromDate,
    "ToDate": isDate[1].ToDate,
    "LeaveDays": halfDayCheck == true ? 0.5 : appliedDays?.data?.[0]?.[0]?.Leaves,
    "Reason": isLeaveReasons
  })
  const saveLeaveApp = async (e) => {
    e.preventDefault(e)
    if (isDate[0].FromDate == null) {
      message.error("Start Date is required")
    }
    else if (isDate[1].ToDate == null) {
      message.error("End Date is required")
    }
    else if (isLeave == null) {
      message.error("Leave Type is required")
      setValidate(false)
    }
    else if (isLeaveReasons == "") {
      message.error("Leave Reason is required")
    } else {
      setSaveLoading(true)
      const isSaveFun = await SAVE_LEAVE_APPLICATION(savePayLoad)
      if (isSaveFun?.success) {
        setSaveLoading(false)
        message.success("You have successfully save this leave...")
        setTranCode(isSaveFun?.data?.[0]?.[0]?.p_Tran_Code)
        setShow(true)
      } else {
        message.error(isSaveFun?.message || isSaveFun?.messsage)
        setSaveLoading(false)
      }
    }
  }
  const submitPayLoad = JSON.stringify({
    "Tran_Code": isTranCode ? isTranCode : isCode,
    "Emp_code": isLeaveReq,
    "LeaveTypeCode": isLeave,
    "FromDate": isDate[0].FromDate,
    "ToDate": isDate[1].ToDate,
    "LeaveDays": halfDayCheck == true ? 0.5 : appliedDays?.data?.[0]?.[0]?.Leaves,
    "Reason": isLeaveReasons
  })
  const submitLeave = async (e) => {
    e.preventDefault(e)
    if (isDate[0].FromDate == null) {
      message.error("Start Date is required")
    }
    else if (isDate[1].ToDate == null) {
      message.error("End Date is required")
    }
    else if (isLeave == null) {
      message.error("Leave Type is required")
      setValidate(false)
    }
    else if (isLeaveReasons == "") {
      message.error("Leave Reason is required")
    }
    else {
      setSubmitLoading(true)
      const isSaveFun = await SUBMIT_LEAVE_APPLICATION(submitPayLoad)
      if (isSaveFun?.success) {
        setValidate(true)
        setSubmitLoading(false)
        message.success("You have successfully submit this leave...")
        setTimeout(() => {
          setCode(null)
          setMode("read")
        }, 2000);
      } else {
        message.error(isSaveFun?.message || isSaveFun?.messsage)
        setValidate(true)
        setSubmitLoading(false)
      }
    }
  }
  const handleOk = async (e) => {
    e.preventDefault();
    setfileLoader(true)
    let formData = new FormData();
    if (isfile !== '') {
      formData.append("file", isfile);
    }
    formData.append("Tran_Code", isTranCode ? isTranCode : isCode);
    formData.append("Emp_Code", isLeaveReq);
    formData.append("company_code", Company_code)
    await fetch(`https://hrm-api.logomish.com/leaves/AddLeaveApplicationAttachment`, {
      method: "POST",
      headers: { "Accept": "form-data" },
      body: formData,
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response?.failed == "failed") {
        message.error(response?.message || response?.messsage)
        setTimeout(() => {
          setfileLoader(false)
        }, 3000);
        setFileShow(false)
      } else {
        message.success(response?.message || response?.messsage)
        setFileShow(true)
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
        setTimeout(() => {
          setfileLoader(false)
        }, 3000);
        GET_EMP_FILES(isTranCode ? isTranCode : isCode)
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }).catch((errs) => {
      message.open(errs?.message || errs?.messsage)
      setFileShow(false)
      setTimeout(() => {
        setfileLoader(false)
      }, 3000);
    })
  }

  const handleConfirmDeleteLeave = async (data) => {
    setDeleteLeave(true)
    message.loading("Please wait...")
    const isCheck = await DELETE_LEAVE_APPLICATION(data)
    if (isCheck?.success) {
      message.success(isCheck?.message || isCheck?.messsage)
      setDeleteLeave(false)
      setTimeout(() => {
        setMode("read")
      }, 1000);
    } else {
      message.success(isCheck?.message || isCheck?.messsage)
      message.destroy()
      setDeleteLeave(false)
    }
  }

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    resolver: yupResolver(),
  });

  const columns = [
    {
      title: "Code",
      dataIndex: "Tran_Code",
      key: "Tran_Code",
    },
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
      title: "Leave Days",
      dataIndex: "LeaveDays",
      key: "LeaveDays",
    },
    {
      title: 'Step Back Reason',
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
      title: "From Date",
      dataIndex: "StartDate",
      key: "StartDate",
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      key: "EndDate",
    },
    {
      title: "Pending With",
      dataIndex: "PendingWith",
      key: "PendingWith",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          {
            data?.Visible == "true" ?
              <button className="editBtn" onClick={() => EditPage('Edit', data?.Tran_Code)}><FaEdit /></button> : null
          }
        </Space>
      ),
    },
  ];
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
      title: "Posting Date",
      dataIndex: "Posting_date",
      key: "Posting_date",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the Attechment"
            description="Are you sure to delete the Attechment?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Tran_Code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (EditCodeEmp && mode == "Edit") {
      setLeaveReq(EditCodeEmp?.Emp_code)
      setLeave(EditCodeEmp?.Leave_type_code)
      sethalfDayCheck(EditCodeEmp?.Leave_Days == 0.5 ? true : false)
      setDate([{ FromDate: EditCodeEmp?.Start_Date }, { ToDate: EditCodeEmp?.End_Date }]);
      setLeaveReasons(EditCodeEmp?.Reason)
      console.log("run this code...", EditCodeEmp?.Reason)
    } else {
      setLeaveReq(Emp_code)
      setDate([{ FromDate: currentDatees }, { ToDate: currentDatees }]);
      sethalfDayCheck(0)
      setLeaveReasons("")
    }
  }, [EditCodeEmp, mode])

  useEffect(() => {
    if (isCode !== null) {
      GET_EMP_LEAVE_EDIT(isCode)
      GET_EMP_FILES(isCode)
    }
  }, [isCode])

  useEffect(() => {
    if (isLeaveReq !== null) {
      GET_APPLIED_DAYS({
        code: isLeaveReq,
        startDate: isDate[0].FromDate,
        endDate: isDate[1].ToDate
      })
      GET_EMP_LEAVE_TYPE(isLeaveReq)
    }
    GET_ALL_EMP_DATA()
  }, [isDate, isLeaveReq])

  useEffect(() => {
    if (leaveTypeCode?.data?.[0]?.[0]?.leave_type_code) {
      GET_BALANCED_DAYS({
        code: isLeaveReq,
        leave_code: leaveTypeCode?.data?.[0]?.[0]?.leave_type_code,
        startDate: isDateScd[0].FromDate,
        endDate: isDateScd[1].ToDate
      })
      setLeave(leaveTypeCode?.data?.[0]?.[0]?.leave_type_code)
    }
  }, [isDateScd, leaveTypeCode?.data?.[0]?.[0]?.leave_type_code, isLeaveReq])

  useEffect(() => {
    if (halfDayCheck == false) {
      if (isDate[0].FromDate == isDate[1].ToDate || isDate[0].FromDate < isDate[1].ToDate) {
        setleaveCalculations(balancedDays?.data?.[0]?.[0]?.Leave_Balance - appliedDays?.data?.[0]?.[0]?.Leaves);
        setSaveLoading(false);
        setSubmitLoading(false);
      } else {
        message.error("To date should not be less than From Date");
        setSaveLoading(true);
        setSubmitLoading(true)
      }
    } else if (halfDayCheck == true) {
      if (isDate[0].FromDate == isDate[1].ToDate) {
        setleaveCalculations(balancedDays?.data?.[0]?.[0]?.Leave_Balance - 0.5)
        setSaveLoading(false)
        setSubmitLoading(false)
      } else {
        message.error("To date is should be equal to From Date")
        setSaveLoading(true)
        setSubmitLoading(true)
      }
    }
  }, [halfDayCheck, leaveCalculations, isDate, balancedDays, appliedDays]);

  useEffect(() => {
    if (mode == "read") {
      GET_EMP_LEAVES_APP()
    } else { GET_EMP_LEAVES_APP() }
  }, [mode])


  useEffect(() => {
    if (isfileLoader == true) {
      message.loading("Please wait...")
    } else {
      message.destroy()
    }
  }, [isfileLoader])

  useEffect(() => {
    if (isDeleteLoader == true) {
      message.loading("Please wait...")
    } else {
      message.destroy()
    }
  }, [isDeleteLoader])

  useEffect(() => {
    // Scroll down to the bottom of the page
    if (isModalOpen) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth', // Optional: Add smooth scrolling effect
      });
    }
  }, [isModalOpen]);


  return (
    <>
      <div className="container">
        <div className='row justify-content-center'>
          {mode == "create" || mode == "Edit" ?
            <div className="col-lg-9 empLeavesBgColor">
              <form>
                <h5 className='text-dark pl-2 mb-3 mt-2'><b>Leave Application</b></h5>
                <div>
                  <FormSelect
                    label={"Select the requester name"}
                    placeholder="please select the requester name"
                    id="Emp_code"
                    name="Emp_code"
                    value={allEmpData?.data?.[0]?.filter((items) => items?.Emp_code == isLeaveReq)?.[0]?.Emp_name}
                    onChange={(e) => {
                      setLeaveReq(e)
                    }}
                    options={allEmpData?.data?.[0]?.map(
                      (item) => ({
                        value: item.Emp_code,
                        label: item.Emp_name,
                        disabled: item.Emp_code == isLeaveReq ? true : false,
                      })
                    )}
                    disabled={mode == "Edit" ? true : false}
                    type="text"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={"Select the leave type"}
                    placeholder="please select the leave type"
                    id="LeaveTypeCode"
                    name="LeaveTypeCode"
                    value={leaveTypeCode?.data?.[0]?.[0]?.leave_name}
                    onChange={(e) => {
                      setLeave(e)
                    }}
                    options={[
                      {
                        value: leaveTypeCode?.data?.[0]?.[0]?.leave_type_code,
                        label: leaveTypeCode?.data?.[0]?.[0]?.leave_name
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
                  <div className='empLeavesHalfDayFlag'>
                    <FormInput
                      className={'appliedInput'}
                      label={'Applied Days'}
                      placeholder={'Applied Days'}
                      readOnly={true}
                      id=""
                      name=""
                      type="number"
                      value={halfDayCheck == false ? appliedDays?.data?.[0]?.[0]?.Leaves : 0.5}
                      showLabel={true}
                      errors={errors}
                      control={control}
                    />
                    <Input placeholder={false} label={"Half Day"} checked={halfDayCheck} type="checkbox" id="inputBox" className="half_day"
                      onChange={(e) => { changeBox(e) }}
                    />
                  </div>
                  <FormInput
                    label={'From Date'}
                    placeholder={'From Date'}
                    id="FromDate"
                    name="FromDate"
                    type="date"
                    value={isDate[0].FromDate}
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
                    value={isDate[1].ToDate}
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
                    id="ToDate"
                    name="ToDate"
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
                    value={isLeaveReasons}
                    onChange={(e) => { setLeaveReasons(e.target.value) }}
                    type="text"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className='CountryBtnBox'>
                  <CancelButton onClick={() => {
                    setMode("read")
                    setCode(null)
                    setShow(false)
                    setFileShow(false)
                  }} title="Cancel" />

                  <Button loading={isSaveLoading} onClick={(e) => {
                    saveLeaveApp(e)
                  }} title="Save" />
                  {
                    isShow == true ?
                      <>
                        <Button title="Uplaod File" onClick={(e) => showModal(e)} />
                        <Button loading={isSubmitLoading} onClick={(e) => {
                          submitLeave(e)
                        }} title="Submit" />
                      </>
                      : null
                  }
                  {
                    isShow == true || isCode !== null ?
                      <>
                        <Space size="middle">
                          <Popconfirm
                            title="Delete the leave"
                            description="Are you sure to delete this leave?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              handleConfirmDeleteLeave(isTranCode ? isTranCode : isCode)
                            }}
                          >
                            <Button title="Delete" loading={isDeleteLeave} onClick={(e) => e.preventDefault(e)} />
                          </Popconfirm>
                        </Space>
                      </>
                      : null
                  }
                </div>
              </form>
            </div> : null
          }


          {mode == "read" && (
            <div className="col-lg-12 mt-5 empLeavesBgColor">
              <div className='empLeavesTableHead'>
                <h5 className='text-dark pl-2 mb-3 mt-2'><b>Leave Application</b></h5>
                <Button title="Apply" onClick={() => setMode("create")} />
              </div>
              <div>
                <Table
                  columns={columns}
                  loading={Red_Emp_Leaves?.loading}
                  dataSource={Red_Emp_Leaves?.GET_LEAVES_APP?.[0]?.res?.data}
                  scroll={{ x: 10 }}
                  pagination={true}
                />
                {console.log("hamza", Red_Emp_Leaves?.GET_LEAVES_APP?.[0]?.res?.data)}
              </div>
            </div>
          )}

          {
            Red_Emp_Leaves?.ATTACEMENTS_DATA?.[0]?.res?.data?.[0]?.length > 0 && isFileShow == true || mode == "Edit" &&
              Red_Emp_Leaves?.ATTACEMENTS_DATA?.[0]?.res?.data?.[0]?.length > 0 ?
              <div className="col-lg-12 mt-5 empLeavesBgColor">
                <div className='empLeavesTableHead'>
                  <h5 className='text-dark pl-2 mb-3 mt-2'><b>Attachment</b></h5>
                </div>
                <div>
                  <Table
                    columns={filecolumns}
                    loading={Red_Emp_Leaves?.loading}
                    dataSource={Red_Emp_Leaves?.ATTACEMENTS_DATA?.[0]?.res?.data?.[0]}
                    scroll={{ x: 10 }}
                    pagination={true}
                  />
                </div>
              </div> : null
          }
        </div>
      </div>
      <Modal title="Upload Attachments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="file" name="" id="" ref={inputRef} onChange={(e) => { setfile(e.target.files[0]) }} accept="image/*" placeholder='Attechments' />
      </Modal>
    </>
  )
}

function mapStateToProps({ Red_Emp_Leaves }) {
  return { Red_Emp_Leaves };
}
export default connect(mapStateToProps, EMP_LEAVES_ACTIONS)(Leaves) 