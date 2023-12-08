import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/TransactionConfirmation.css'
const config = require('../../config.json')


function TransactionConfirmation_list() {
    const [isGetConfirmationData, setGetConfirmationData] = useState([])
    const [isGetConfirmationDataErr, setGetConfirmationDataErr] = useState("")
    
    const [isGetConfirmationDataFilter, setGetConfirmationDataFilter] = useState([])
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoader, setDataLoader] = useState(false);
    const navigate = useNavigate()
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");



    // GET CONFIRMATION DATA API CALL ==========================================
    async function getConfirmationData() {
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
                            setGetConfirmationData(response?.data[0])
                            setGetConfirmationDataFilter(response?.data[0])
                            setDataLoader(true);
                        } else {
                            setDataLoader(false);
                            setGetConfirmationDataErr(response.message)
                        }
                    }
                }).catch((error) => { setGetConfirmationDataErr(error.message); })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                if (response.messsage == "timeout error") { navigate("/"); }
                else {
                    if (response.success) {
                        setGetConfirmationData(response?.data)
<<<<<<< HEAD
                        console.log(response.data)
=======
>>>>>>> 22c9b86f0a0681bf1069915bd1fe3c3a60b69505
                        setGetConfirmationDataFilter(response?.data)
                        setDataLoader(true);
                    } else {
                        setDataLoader(false);
                        setGetConfirmationDataErr(response.message)
                    }
                }
            }

        }).catch((error) => { setGetConfirmationDataErr(error.message) })
            .finally(() => {
                setLoading(false);
            });
    }
    // SEARCH DATA FUNCTION =====================================================
    const SearchDataFun = () => {
        if (isSearchVal == ' ') {
            setGetConfirmationData(isGetConfirmationDataFilter)
        } else {
            if (isSearchVal !== ' ') {
                setLoading(true)
                setDataLoader(false)
                setTimeout(() => {
                    const filterResult = isGetConfirmationDataFilter.filter((item) =>
                        `${item.Emp_code}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Emp_name}`.toLowerCase().includes(isSearchVal.toLowerCase())
                    )
                    setGetConfirmationData(filterResult)
                    setLoading(false)
                    setDataLoader(true)
                }, 2000);
            }
        }
    }

    useEffect(() => {
        getConfirmationData()
    }, [])

    return (
        <>
            <section className="confirmationSection">
                <div className="container-fluid p-0">
                    <div className="TransactionConfirmation_listHeader">
                        <span className="">
                            Transaction Confirmation - List
                        </span>
                        <button><Link to="/FormWaitingTranConfiramtion" className="text-white">Form Waiting For Process</Link></button>
                    </div>
                    <div className="confirmationSearch">
                        <input type="search" className="form-control" onChange={(e) => {
                            setSearchVal(e.target.value)
                            setGetConfirmationData(isGetConfirmationDataFilter)
                        }} />
                        <button className="btn btn-dark" onClick={SearchDataFun}>Search</button>
                    </div>
                    <div className="confirmationTableBox">
                        <div className="confirmationTableBoxScroll">
                            {
                                isGetConfirmationData.length > 0 ?
                                <table class="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th>Emp Code</th>
                                            <th>Name</th>
                                            <th>Edit</th>
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
                                            {isGetConfirmationData.map((items) => {
                                                return (
                                                    <tr>
                                                        <th>{items?.Emp_code ? items?.Emp_code : "Not Found"}</th>
                                                        <th>{items?.Emp_name ? items?.Emp_name : "Not Found"}</th>
                                                        <td>
                                                            <button className="editBtnTable"><Link to={`/Transaction_confirmation_form?ConfirmId=${items?.Emp_code}`} className="text-white">Edit</Link></button>
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
                                isGetConfirmationDataErr ? <span className="text-center d-block">{isGetConfirmationDataErr}</span> : false 
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TransactionConfirmation_list;