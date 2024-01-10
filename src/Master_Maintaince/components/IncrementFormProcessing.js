// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import '../assets/css/TransactionIncrement.css'
// import Transaction_increment_form from '../form/Transaction_Increment_form'
// import secureLocalStorage from "react-secure-storage";
// import Header from "../../components/Includes/Header";
// const config = require('../../config.json')

// function ProcessIncrement() {

//     const [isIncrementForm, setIncrementForm] = useState(false)
//     const [isGetIncrementData, setGetIncrementData] = useState([])
//     const [isGetIncrementDataErr, setGetIncrementDataErr] = useState("")
//     const [isGetIncrementDataFilter, setGetIncrementDataFilter] = useState([])
//     const [isSearchVal, setSearchVal] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [dataLoader, setDataLoader] = useState(false);
//     const [isId, setId] = useState("")
//     const navigate = useNavigate()
//     var get_refresh_token = localStorage.getItem("refresh");
//     var get_access_token = localStorage.getItem("access_token");




//     // GET CONFIRMATION DATA API CALL ==========================================
//     async function getConfirmationData() {
//         await fetch(`${config["baseUrl"]}/tranIncrement/GetTranIncrementListWaiting`, {
//             method: "GET",
//             headers: {
//                 "content-type": "application/json",
//                 accessToken: `Bareer ${get_access_token}`,
//             },
//         }
//         ).then((response) => {
//             return response.json();
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config["baseUrl"]}/tranIncrement/GetTranIncrementListWaiting`, {
//                     method: "GET",
//                     headers: {
//                         "content-type": "application/json",
//                         refereshToken: `Bareer ${get_refresh_token}`,
//                     },
//                 }
//                 ).then((response) => {
//                     console.log("object 3")
//                     return response.json();
//                 }).then((response) => {
//                     if (response.messsage == "timeout error") { navigate("/"); }
//                     else {
//                         localStorage.setItem("refresh", response.referesh_token);
//                         localStorage.setItem("access_token", response.access_token);
//                         if (response.success) {
//                             setGetIncrementData(response?.data[0])
//                             setGetIncrementDataFilter(response?.data[0])
//                             setDataLoader(true);
//                         } else {
//                             setDataLoader(false);
//                             setGetIncrementDataErr(response.message)
//                         }
//                     }
//                 }).catch((error) => { setGetIncrementDataErr(error.message); })
//                     .finally(() => {
//                         setLoading(false);
//                     });
//             } else {
//                 if (response.messsage == "timeout error") { navigate("/"); }
//                 else {
//                     if (response.success) {
//                         setGetIncrementData(response?.data[0])
//                         setGetIncrementDataFilter(response?.data[0])
//                         setDataLoader(true);
//                         console.log(response?.data[0],'chck')

//                     } else {
//                         setDataLoader(false);
//                         setGetIncrementDataErr(response.message)
//                     }
//                 }
//             }
//         }).catch((error) => { setGetIncrementDataErr(error.message) })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }
//     // SEARCH DATA FUNCTION =====================================================
//     const SearchDataFun = () => {
//         if (isSearchVal == ' ') {
//             setGetIncrementData(isGetIncrementDataFilter)
//         } else {
//             if (isSearchVal !== ' ') {
//                 setLoading(true)
//                 setDataLoader(false)
//                 setTimeout(() => {
//                     const filterResult = isGetIncrementDataFilter.filter((item) =>
//                         `${item.Emp_code}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
//                         `${item.Emp_name}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
//                         `${item.Increment_Date}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
//                         `${item.Transaction_Date}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
//                         `${item.Posting_date}`.toLowerCase().includes(isSearchVal.toLowerCase())
//                     )
//                     setGetIncrementData(filterResult)
//                     setLoading(false)
//                     setDataLoader(true)
//                 }, 2000);
//             }
            
//         }
//     }

//     useEffect(() => {
//         getConfirmationData()
//     }, [])



//     return (
//         <>
//         <div>
//             <Header />
//         </div>
//             <div className="container-fluid p-2 IncrementPage">
//                 <div className="container-fluid TransactionIncrement_listContainer">
//                     <div className="row w-100 mx-0">
                       
//                         <span className="TransactionIncrement_listHeader">
//                             Transaction Increment Process -
//                         </span>

//                     </div>
//                     <div className="row px-3 mt-2 py-1">
//                         <div className="col-12 d-flex">
//                             <input type="text" className="form-control TransactionIncrement_listSearch" name="" id="" onChange={(e) => {
//                                 setSearchVal(e.target.value)
//                                 setGetIncrementData(isGetIncrementDataFilter)
//                             }} />
//                             <button className="btn btn-dark mx-1" onClick={SearchDataFun}>Search</button>
//                         </div>
//                     </div>
//                     <div className="row  p-3">
//                         <div className="Increament_table">
//                             {
//                                 isGetIncrementData.length > 0 ?
//                                     <table class="table table-striped ">
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col">Code</th>
//                                                 <th scope="col">Name</th>
//                                                 <th scope="col">Increment Date</th>
//                                                 <th scope="col">Transaction Date</th>
//                                                 <th scope="col">Posting Date</th>
//                                                 <th scope="col">Process</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {loading && (
//                                                 <div className="d-flex justify-content-center w-100">
//                                                     <div class="spinner-border text-primary" role="status">
//                                                         <span class="sr-only"></span>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {dataLoader && (<>
//                                                 {isGetIncrementData.map((items) => {
//                                                     return (
//                                                         <tr>
//                                                             <th>{items?.Emp_code ? items?.Emp_code : "Not Found"}</th>
//                                                             <th>{items?.Emp_name ? items?.Emp_name : "Not Found"}</th>
//                                                             <th>{items?.Increment_Date ? items?.Increment_Date : "Not Found"}</th>
//                                                             <th>{items?.Transaction_Date ? items?.Transaction_Date : "Not Found"}</th>
//                                                             <th>{items?.Posting_date ? items?.Posting_date.slice(0,15) : "Not Found"}</th>
//                                                             <td>
//                                                                 <Link to={`/Transaction_Increment_form?Process=Process&incId=${items?.Emp_code}`} className="editBtnTable" >Process</Link>
//                                                             </td>
//                                                         </tr>
//                                                     )
//                                                 })
//                                                 }</>)}
//                                         </tbody>
//                                     </table> 
//                                     : <span className="text-center d-block"><b>No Process Data Found</b></span>
//                             }
//                             {
//                                 isGetIncrementDataErr ? <span className="text-center d-block">{isGetIncrementDataErr}</span> : false
//                             }
//                         </div>

//                     </div>
//                 </div>
//             </div>
            
//         </>
//     );
// }

// export default ProcessIncrement;


// New code starts from here 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { PrimaryButton } from "../../components/basic/button";
import { Table, Space } from "antd";
import { connect } from "react-redux";
import { FaEdit } from 'react-icons/fa';
import Confirmation_Extensio2Form from "../form/Confirmation_ExtensionForm";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Confirmation_Extension/index";

const IncrementFormProcessing = ({ Red_Confirmation_Extension, getConfirmationExProcessData }) => {
    const [isGetConfirmationData, setGetConfirmationData] = useState([]);
    const [isGetConfirmationDataErr, setGetConfirmationDataErr] = useState("");
    const [isCode, setCode] = useState(null);
    const [mode, setMode] = useState("read");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [isCheckStatus, setCheckStatus] = useState("Process")


    // Search data function
    const searchConfirmationData = () => {
        // Implement search functionality
    }

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode);
    };

    const columns = [
        {
            title: "Emp Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Transaction Date",
            dataIndex: "Transaction_Date",
            key: "Transaction_Date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Confirmation Date",
            dataIndex: "Confirmation_Date",
            key: "Confirmation_Date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Posting Date",
            dataIndex: "Posting_date",
            key: "Posting_date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Process",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button
                        onClick={() => EditPage("Edit", data?.Emp_code)}
                        className="editBtn"
                    >
                        <FaEdit />
                    </button>

                </Space>
            ),
        },
    ];

    useEffect(() => {
        getConfirmationExProcessData()
    }, [])

    useEffect(() => {
        if (isSearchVal == "") {
            getConfirmationExProcessData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            getConfirmationExProcessData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);


    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {
                            mode == "read" ? <>
                                <div className="Base_CityFlexBox">
                                    <h4 className="text-dark">Form Processing</h4>
                                    <div className="Base_CitysearchBox">
                                        <Input

                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <hr />
                            </> : ""
                        }

                        <div>
                            {
                                mode == "read" ?
                                    <Table
                                        columns={columns}
                                        loading={Red_Confirmation_Extension?.loading}
                                        dataSource={Red_Confirmation_Extension?.data?.[0]?.res?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_Confirmation_Extension?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    /> : ""
                            }
                            {mode == "Edit" && <Confirmation_Extensio2Form cancel={setMode} status={isCheckStatus} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_Confirmation_Extension }) {
    return { Red_Confirmation_Extension };
}

export default connect(mapStateToProps, ACTIONS)(IncrementFormProcessing);