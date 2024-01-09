import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import AppointmentForm from "../TransactionAppointForm/TAPersonalform";
import AppointEduData from "../TransactionAppointForm/AppointEduData";
import TASalaryForm from '../TransactionAppointForm/TASalaryForm';
import AppointExpData from "../TransactionAppointForm/AppointExpData";
import AppointFamiltyData from "../TransactionAppointForm/AppointFamiltyData";
import AppointPayroll from "../TransactionAppointForm/TAappointmentMasterPayrollForm";
import CheckList from '../TransactionAppointForm/TACheckListForm';
import "./assets/css/Appointment.css";
import { connect } from "react-redux";
import * as Appointment_Actions from "../store/actions/Appointments/Appointment/index";
import { message } from 'antd';
import { BsFillPersonFill as Person_ico } from "react-icons/bs";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import DownloadingSharpIcon from '@mui/icons-material/DownloadingSharp';
import { saveAs } from 'file-saver';
import OfferLeter from '../TransactionAppointment/AppointmentLetter/index';
import baseUrl from '../config.json'
const config = require("../config.json");



const Appointment = ({ GetAppointStatusCall, Red_Appointment }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState("read");
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState([])
    const [isFileData, setFileData] = useState([])

    const EditPage = (mode, code) => {
        setCode(code);
        setMode(mode);
    };

    const columns = [
        {
            title: "Sequence No",
            dataIndex: "Sequence_no",
            key: "Sequence_no",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
        },
        {
            title: "Personal",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("Edit", data?.Sequence_no)} >
                        <Person_ico className="List_ico" />
                    </Link>
                </Space>
            ),

        },
        {
            title: "Education",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditEdu", data?.Sequence_no)} >
                        <LibraryBooksIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Salary",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditSalary", data?.Sequence_no)} >
                        <LocalAtmIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Exprience",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditExprience", data?.Sequence_no)} >
                        <BusinessCenterIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Payroll",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditPayroll", data?.Sequence_no)} >
                        <WbSunnyIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "CheckList",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditCheckList", data?.Sequence_no)} >
                        <CheckBoxRoundedIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Family",
            render: (data) => (
                <Space size="middle">
                    <Link onClick={() => EditPage("EditFamily", data?.Sequence_no)} >
                        <Diversity3Icon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Process",
            render: (item, data) => (
                <Space size="middle">
                    <Link href="" onClick={(e) => AppointmentProcess(item?.Sequence_no)}>
                        <SettingsSuggestRoundedIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Appointment Letter",
            render: (id) => (
                <Space size="middle">
                    <Link
                        onClick={(e) => {
                            AppointLetter(id.Sequence_no)
                        }
                        }
                    >
                        <DownloadingSharpIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },

    ];

    async function AppointLetter(id) {
        await fetch(
            `${config["baseUrl"]}/tranAppointment/Tran_AppoinmentLetterByEmpCode`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_Code": Red_Appointment?.data?.[0]?.res?.data1.filter(data => data.Sequence_no == id)[0].Sequence_no
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                console.log(response.data, 'response')
                setAppointData(response.data)
                GetAppointLetter(id, response?.data)
            }
        }).catch((error) => { });
    }
    async function GetAppointLetter(itemid, DataR) {
        await fetch(
            `${config["baseUrl"]}/tranAppointment/Get_EmployeeletterByEmpCode`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_Code": Red_Appointment?.data?.[0]?.res?.data1.filter(data => data.Sequence_no == itemid)[0].Sequence_no
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: "Successfully Download",
                });
                setFileData(response.data[0].FileName, DataR);



                let htmlContent = `<html><body>`;
                htmlContent += `
            <div style="margin-top:10px; font-size: 20px; display:block;">
                <div style="font-size:18px">Date: ${DataR?.[0]?.Transaction_Date ? DataR?.[0]?.Transaction_Date : "Not Found"}</div> <br />
                <div style="font-size:18px">Name: ${DataR?.[0]?.Emp_Name ? DataR?.[0]?.Emp_Name : "Not Found"}</div> <br />
                <div style="font-size:18px">Address line: ${DataR?.[0]?.emp_address_line1 ? DataR?.[0]?.emp_address_line1 : "Not Found"}</div> <br />
                <div style="font-size:18px">Address line:  ${DataR?.[0]?.emp_address_line2 ? DataR?.[0]?.emp_address_line2 : "Not Found"}</div> <br />
                <div style="font-size:18px">Contact No: ${DataR?.[0]?.emp_phone ? DataR?.[0]?.emp_phone : "Not Found"}</div><br />
            </div> 
            <div style="text-align: center; font-size: 1px;">
            <h3>LETTER OF APPOINTMENT</h3>
            </div>
            <p>Dear ${DataR?.[0]?.Emp_Name ? DataR?.[0]?.Emp_Name : "Not  Found"} </p>
            <p>We are pleased to offer you the position of ${DataR?.[0].Desig_name ? DataR?.[0].Desig_name : "Not Found"} - ${DataR?.[0].Department ? DataR?.[0].Department : "Not Found"} <br />
            in the cadre of ${DataR?.[0].grade_name ? DataR?.[0].grade_name : "Not Found"} at Summit Bank Limited-(SMBL). The position will be based in ${DataR?.[0].loc_name ? DataR?.[0].loc_name : "Not Found"}.</p>
            `;
                htmlContent += `
        <p>Your remuneration will be as follows:</p>
        <table>
        <thead>
            <tr>
            <th>S.No</th>
            <th>Salary And Other Cash Benefits</th>
            <th>Per Month-(In Rupees)</th>
            </tr>
        </thead>
        <tbody>
    `;

                DataR?.forEach((item, index) => {
                    htmlContent += `
            <tr>
            <td>${index + 1}</td>
            <td>${item.Allowance_name ? item.Allowance_name : "Not Found"}</td>
            <td>${item.Amount ? item.Amount : "Not Found"}</td>
            </tr>
    `;
                });

                htmlContent += `
        </tbody>
        </table>
        <p>Note: All applicable taxes will be deducted at source.</p>
        <p>In addition to the above, you are entitled to the following:</p>
        <ul style="padding-left: 15px;">
        <li>Cash reimbursement equivalent to 100 liters of petrol per month.</li>
        <li>Gratuity, PF, Hospitalization, Group Insurance, Loan entitlement, Leave entitlement based on Bank’s approved salary and benefit policy.</li>
        <li>And all other benefits as per Bank’s approved policy.</li>
        </ul>
        <p>Your service will be on probation for a period of three months and is liable to termination without assigning any reason and without any notice during the period of probation. Your service will be confirmed after successful completion of the probation period, subject to the following:</p>
        <p style="text-indent: 2em;">(i) Satisfactory references from your present and previous employers.</p>
        <p>After confirmation, termination of this contract will require either party, i.e., you or the Bank, to serve 60 calendar days advance notice or, in lieu of the notice period, two months Gross Salary will be paid.</p>
        <p>You will perform any and all functions assigned to you from time to time, and you can be transferred to any location/city at Bank’s discretion.</p>
        <p>You will be required to sign Bank’s Standard Declaration of Secrecy and Fidelity Form along with any other form/undertaking which the Bank may consider necessary, and will abide by all the terms and conditions of the Bank’s HR Policy and Rules & Regulations.</p>
        <p>You shall stand retired on attaining the superannuation age of (60) years.</p>
        <p>In agreement with the terms and conditions herein, you are requested to sign both the pages (1 & 2) of this appointment offer and return a copy to Human Resource Division, Summit Bank Limited.</p>
        `;
                // AppointData.forEach((item, index) => {
                htmlContent += `
            <p>The proposed date of your assuming the responsibility is ${DataR?.[0].ProposedDate ? DataR?.[0].ProposedDate : "Not Found"}  or earlier.</p>
            `;
                // });

                htmlContent += `
        <p>We are confident that you will play a positive role towards the growth and expansion of Summit Bank Limited-SMBL and look forward to a long and mutually rewarding professional relationship.</p>
        <div style="display: flex; justify-content: space-between; width: 1000px; margin-top:10px;">
        <div style="display: flex; justify-content: space-between; width: 1000px; margin-top:10px;">
            <span>
                <span>Sincerely:</span>
                <span>___________</span>
                <p></p>Syed Mustufa zaidi <br /> Head of Human Resource Division</p>
            </span>
            
            <span style="float:right; margin-top:15px;">
                    <span>Accepted:</span>
                    `;
                htmlContent += `
                    <span style="float: right;">___________ <br />
                        ${DataR?.[0].Emp_Name ? DataR?.[0].Emp_Name : "Not Found"}
                    </span>
                    `;
                htmlContent += `
            </span>
        
        </div>
        </div>
        
    </body>
    </html>
    `;

                const blob = new Blob([htmlContent], { type: 'application/msword' });
                saveAs(blob, response?.data?.[0]?.FileName);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message,
                });
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message,
            });
        });
    }
    async function AppointmentProcess(item) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/master_all_employees/ProcessTranAppointment`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sequence_No": Red_Appointment?.data?.[0]?.res?.data1.filter(data => data.Sequence_no == item)[0].Sequence_no,
                "Emp_code": Red_Appointment?.data?.[0]?.res?.data1.filter(data => data.Sequence_no == item)[0].Sequence_no,
                "Payroll_Month": "6",
                "UserCode": Red_Appointment?.data?.[0]?.res?.data1.filter(data => data.Sequence_no == item)[0].UserCode,
                "Replacement_Flag": "N",
                "Replacement_Emp_Code": "1"

            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
            }
            else {
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }
    const filteredData = Red_Appointment?.data?.[0]?.res?.data1?.filter(
        (item) => item.Process_Flag !== 'Y'
    );

    useEffect(() => {
        if (isSearchVal == "") {
            GetAppointStatusCall({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            GetAppointStatusCall({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal]);

    useEffect(() => {
        if (mode == "read") {
            GetAppointStatusCall({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        }
    }, [mode]);


    return (
        <>
            <div>
                <Header />
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {mode == "read" && (
                            <>
                                <div className="AppointmentFlexBox">
                                    <h4 className="text-dark">Transaction - Appointment</h4>
                                    <div className="AppointmentsearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}
                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Appointment?.loading}
                                    dataSource={filteredData}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Appointment?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "create" ? <AppointmentForm cancel={setMode} mode={mode} isCode={null} /> : null}
                            {mode == "Edit" && <AppointmentForm cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditEdu" && <AppointEduData cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditSalary" && <TASalaryForm cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditExprience" && <AppointExpData cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditPayroll" && <AppointPayroll cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditCheckList" && <CheckList cancel={setMode} mode={mode} isCode={isCode} />}
                            {mode == "EditFamily" && <AppointFamiltyData cancel={setMode} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



function mapStateToProps({ Red_Appointment }) {
    return { Red_Appointment };
}
export default connect(mapStateToProps, Appointment_Actions)(Appointment);
