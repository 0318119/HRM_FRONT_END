import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/Transaction_Promotion.css'
import { fetchData } from "../ApiFunctions/api";
const config = require('../../config.json')

function Transaction_Pro() {
    const [isGetConfirmationData, setGetConfirmationData] = useState([])
    const [isGetConfirmationDataErr, setGetConfirmationDataErr] = useState("")
    const [isGetConfirmationDataFilter, setGetConfirmationDataFilter] = useState([])
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoader, setDataLoader] = useState(false);
    const navigate = useNavigate()
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");



    // GET PROMOTION DATA API CALL ==========================================
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
            if (isSearchVal !== '') {
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
    // const getConfirmationData = () => {
    //     fetchData(apiUrl)
    //     .then((fetchedData) => {
    //       if(fetchedData.success){
    //           setGetConfirmationData(fetchedData?.data[0])
    //           setGetConfirmationDataFilter(fetchedData?.data[0])
    //           setDataLoader(true);
    //       }
    //       else{
    //           console.log("fetchedData",fetchedData.status)
    //           setDataLoader(false);
    //           setGetConfirmationDataErr(fetchedData.message)
    //       }
    //     }).catch((error) => {
    //       setGetConfirmationDataErr(error.message)
    //     }).finally(() => {
    //         setLoading(false);
    //     });
    // }

    useEffect(() => {
        getConfirmationData()
    }, [])

    useEffect(() => {

      }, []);

    return (
        <div className="container-fluid mt-5 p-2">
            <div className="container-fluid mt-5 Transaction_Pro_listContainer">
                <div className="row w-100 mx-0">
                    <span className="Transaction_Pro_listHeader">
                        Transaction Promotion
                        <Link to="/PromotionWaitingForm" className="btn btn-dark text-white">Form Waiting For Process</Link>
                    </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-12 d-flex">
                        <input type="search" className="form-control" onChange={(e) => {
                            setSearchVal(e.target.value)
                            setGetConfirmationData(isGetConfirmationDataFilter)
                        }} />
                        <button className="btn btn-dark" onClick={SearchDataFun}>Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <div className="">
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
                                                            <button className="editBtnTable"><Link to={`/Transaction_Promotion?PromotionId=${items?.Emp_code}`} className="text-white">Edit</Link></button>
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
        </div>
    );
}

export default Transaction_Pro;