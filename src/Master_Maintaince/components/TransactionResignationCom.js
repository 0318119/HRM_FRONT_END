import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/TransactionResignationCom.css'
import Incrementform from '../../Master_Maintaince/form/Incrementform'
import secureLocalStorage from "react-secure-storage";
const config = require('../../config.json')

function TransactionResignationCom() {

    const [isIncrementForm, setIncrementForm] = useState(false)
    const [isGetResignationData, setGetResignationData] = useState([])
    const [isGetResignationDataErr, setGetResignationDataErr] = useState("")
    const [isGetResignationDataFilter, setGetResignationDataFilter] = useState([])
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoader, setDataLoader] = useState(false);
    const [isId, setId] = useState("")
    const navigate = useNavigate()
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");




    // GET CONFIRMATIONgetResignationData DATA API CALL ==========================================
    async function getResignationData() {
        await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") { navigate("/"); }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        if (response.success) {
                            setGetResignationData(response?.data[0])
                            setGetResignationDataFilter(response?.data[0])
                            setDataLoader(true);
                        } else {
                            setDataLoader(false);
                            setGetResignationDataErr(response.message)
                        }
                    }
                }).catch((error) => { setGetResignationDataErr(error.message); })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                if (response.messsage == "timeout error") { navigate("/"); }
                else {
                    if (response.success) {
                        setGetResignationData(response?.data)
                        setGetResignationDataFilter(response?.data)
                        setDataLoader(true);
                    } else {
                        setDataLoader(false);
                        setGetResignationDataErr(response.message)
                    }
                }
            }
        }).catch((error) => { setGetResignationDataErr(error.message) })
            .finally(() => {
                setLoading(false);
            });
    }

    // SEARCH DATA FUNCTION =====================================================
    const SearchDataFun = () => {
        if (isSearchVal == ' ') {
            setGetResignationData(isGetResignationDataFilter)
        } else {
            if (isSearchVal !== ' ') {
                setLoading(true)
                setDataLoader(false)
                setTimeout(() => {
                    const filterResult = isGetResignationDataFilter.filter((item) =>
                        `${item.Emp_code}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Emp_name}`.toLowerCase().includes(isSearchVal.toLowerCase())
                    )
                    setGetResignationData(filterResult)
                    setLoading(false)
                    setDataLoader(true)
                }, 2000);
            }
        }
    }

    useEffect(() => {
        getResignationData()
    }, [])



    return (
        <>
            <div className="container-fluid p-2 TransactionResignationPage">
                <div className="container-fluid TransactionResignation_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="TransactionResignation_listHeader">
                            Resignation
                            <Link to="/Transaction_Resignation_process">
                                <button>Waiting For Process</button>
                            </Link>
                        </span>

                    </div>
                    <div className="row px-3 mt-2 py-1">
                        <div className="col-12 d-flex">
                            <input type="text" className="form-control TransationResignation_listSearch" name="" id="" onChange={(e) => {
                                setSearchVal(e.target.value)
                                setGetResignationData(isGetResignationDataFilter)
                            }} />
                            <button className="btn btn-dark mx-1" onClick={SearchDataFun}>Search</button>
                        </div>
                    </div>
                    <div className="row  p-3">
                        <div className="Resignation_table">
                            {
                                isGetResignationData.length > 0 ?
                                    <table class="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <div className="d-flex justify-content-center w-100">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </div>
                                            )}
                                            {dataLoader && (<>
                                                {isGetResignationData.map((items) => {
                                                    return (
                                                        <tr>
                                                            <th>{items?.Emp_code ? items?.Emp_code : "Not Found"}</th>
                                                            <th>{items?.Emp_name ? items?.Emp_name : "Not Found"}</th>
                                                            <td>
                                                                <Link to={`/Transation_Resignation_Form?regId=${items?.Emp_code}`} className="editBtnTable" >Edit</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }</>)}
                                        </tbody>
                                    </table>
                                    : <span className="text-center d-block"><b>No Data Found</b></span>
                            }
                            {
                                isGetResignationDataErr ? <span className="text-center d-block">{isGetResignationDataErr}</span> : false
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionResignationCom;