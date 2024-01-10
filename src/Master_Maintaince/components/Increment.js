// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import '../assets/css/TransactionIncrement.css'
// const config = require('../../config.json')

// function TransactionIncrement_list() {
//     const [isGetIncrementData, setGetIncrementData] = useState([])
//     const [isGetIncrementDataErr, setGetIncrementDataErr] = useState("")
//     const [isGetIncrementDataFilter, setGetIncrementDataFilter] = useState([])
//     const [isSearchVal, setSearchVal] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [dataLoader, setDataLoader] = useState(false);
//     const navigate = useNavigate()
//     var get_refresh_token = localStorage.getItem("refresh");
//     var get_access_token = localStorage.getItem("access_token");




//     // GET CONFIRMATION DATA API CALL ==========================================
//     async function getConfirmationData() {
//         await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
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
//                 await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
//                     method: "GET",
//                     headers: {
//                         "content-type": "application/json",
//                         refereshToken: `Bareer ${get_refresh_token}`,
//                     },
//                 }
//                 ).then((response) => {
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
//                         setGetIncrementData(response?.data)
//                         setGetIncrementDataFilter(response?.data)
//                         setDataLoader(true);
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
//                         `${item.Emp_name}`.toLowerCase().includes(isSearchVal.toLowerCase())
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
//             <div className="container-fluid p-2 IncrementPage">
//                 <div className="container-fluid TransactionIncrement_listContainer">
//                     <div className="row w-100 mx-0">
//                         <span className="TransactionIncrement_listHeader">
//                             Transaction Increment -
//                             <Link to={`/ProccessIncrement`}>
//                                 <button>Waiting For Process</button>
//                             </Link>
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
//                                                 <th scope="col">Edit</th>
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
//                                                             <td>
//                                                                 <Link to={`/Transaction_Increment_form?incId=${items?.Emp_code}`} className="editBtnTable" >Edit</Link>
//                                                             </td>
//                                                         </tr>
//                                                     )
//                                                 })
//                                                 }</>)}
//                                         </tbody>
//                                     </table>
//                                     : <span className="text-center d-block"><b>No Data Found</b></span>
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

// export default TransactionIncrement_list;



// NEW CODE START FROM HERE

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/basic/input";
import Header from "../../components/Includes/Header";
import { PrimaryButton } from "../../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import Incrementform from "../form/Incrementform";
import { connect } from "react-redux";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Increment/index";
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Increment = ({ Red_Increment, GetIncrementOfAllEmployees }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState("read");
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    const navigate = useNavigate()

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode);
    };

    const columns = [
        {
            title: "Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Action",
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
        if (isSearchVal == "") {
            GetIncrementOfAllEmployees({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            GetIncrementOfAllEmployees({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);

    return (
        <>
            <Header />
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {mode == "read" && (
                            <>
                                <div className="Base_CityFlexBox">
                                    <h4 className="text-dark">Increment</h4>
                                    <div className="Base_CitysearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        <Link to="/ConfirmExtensionFormProcessing"><PrimaryButton type={"button"} title="Form Processing" /></Link>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Increment?.loading}
                                    dataSource={Red_Increment?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    tion={{
                                        defaultCurrent: page,
                                        total: Red_Increment?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "Edit" && <Incrementform cancel={setMode} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Increment }) {
    return { Red_Increment };
}

export default connect(mapStateToProps, ACTIONS)(Increment);

