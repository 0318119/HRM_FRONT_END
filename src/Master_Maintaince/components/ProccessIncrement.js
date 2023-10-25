import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/TransactionIncrement.css'
import Transaction_increment_form from '../form/Transaction_Increment_form'
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Includes/Header";
const config = require('../../config.json')

function ProcessIncrement() {

    const [isIncrementForm, setIncrementForm] = useState(false)
    const [isGetIncrementData, setGetIncrementData] = useState([])
    const [isGetIncrementDataErr, setGetIncrementDataErr] = useState("")
    const [isGetIncrementDataFilter, setGetIncrementDataFilter] = useState([])
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoader, setDataLoader] = useState(false);
    const [isId, setId] = useState("")
    const navigate = useNavigate()
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");




    // GET CONFIRMATION DATA API CALL ==========================================
    async function getConfirmationData() {
        await fetch(`${config["baseUrl"]}/tranIncrement/GetTranIncrementListWaiting`, {
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
                await fetch(`${config["baseUrl"]}/tranIncrement/GetTranIncrementListWaiting`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                }
                ).then((response) => {
                    console.log("object 3")
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") { navigate("/"); }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        if (response.success) {
                            setGetIncrementData(response?.data[0])
                            setGetIncrementDataFilter(response?.data[0])
                            setDataLoader(true);
                        } else {
                            setDataLoader(false);
                            setGetIncrementDataErr(response.message)
                        }
                    }
                }).catch((error) => { setGetIncrementDataErr(error.message); })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                if (response.messsage == "timeout error") { navigate("/"); }
                else {
                    if (response.success) {
                        setGetIncrementData(response?.data[0])
                        setGetIncrementDataFilter(response?.data[0])
                        setDataLoader(true);
                        console.log(response?.data[0],'chck')

                    } else {
                        setDataLoader(false);
                        setGetIncrementDataErr(response.message)
                    }
                }
            }
        }).catch((error) => { setGetIncrementDataErr(error.message) })
            .finally(() => {
                setLoading(false);
            });
    }
    // SEARCH DATA FUNCTION =====================================================
    const SearchDataFun = () => {
        if (isSearchVal == ' ') {
            setGetIncrementData(isGetIncrementDataFilter)
        } else {
            if (isSearchVal !== ' ') {
                setLoading(true)
                setDataLoader(false)
                setTimeout(() => {
                    const filterResult = isGetIncrementDataFilter.filter((item) =>
                        `${item.Emp_code}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Emp_name}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Increment_Date}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Transaction_Date}`.toLowerCase().includes(isSearchVal.toLowerCase()) ||
                        `${item.Posting_date}`.toLowerCase().includes(isSearchVal.toLowerCase())
                    )
                    setGetIncrementData(filterResult)
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
        <div>
            <Header />
        </div>
            <div className="container-fluid p-2 IncrementPage">
                <div className="container-fluid TransactionIncrement_listContainer">
                    <div className="row w-100 mx-0">
                       
                        <span className="TransactionIncrement_listHeader">
                            Transaction Increment Process -
                        </span>

                    </div>
                    <div className="row px-3 mt-2 py-1">
                        <div className="col-12 d-flex">
                            <input type="text" className="form-control TransactionIncrement_listSearch" name="" id="" onChange={(e) => {
                                setSearchVal(e.target.value)
                                setGetIncrementData(isGetIncrementDataFilter)
                            }} />
                            <button className="btn btn-dark mx-1" onClick={SearchDataFun}>Search</button>
                        </div>
                    </div>
                    <div className="row  p-3">
                        <div className="Increament_table">
                            {
                                isGetIncrementData.length > 0 ?
                                    <table class="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Increment Date</th>
                                                <th scope="col">Transaction Date</th>
                                                <th scope="col">Posting Date</th>
                                                <th scope="col">Process</th>
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
                                                {isGetIncrementData.map((items) => {
                                                    return (
                                                        <tr>
                                                            <th>{items?.Emp_code ? items?.Emp_code : "Not Found"}</th>
                                                            <th>{items?.Emp_name ? items?.Emp_name : "Not Found"}</th>
                                                            <th>{items?.Increment_Date ? items?.Increment_Date : "Not Found"}</th>
                                                            <th>{items?.Transaction_Date ? items?.Transaction_Date : "Not Found"}</th>
                                                            <th>{items?.Posting_date ? items?.Posting_date.slice(0,15) : "Not Found"}</th>
                                                            <td>
                                                                <Link to={`/Transaction_Increment_form?Process=Process&incId=${items?.Emp_code}`} className="editBtnTable" >Process</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }</>)}
                                        </tbody>
                                    </table> 
                                    : <span className="text-center d-block"><b>No Process Data Found</b></span>
                            }
                            {
                                isGetIncrementDataErr ? <span className="text-center d-block">{isGetIncrementDataErr}</span> : false
                            }
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ProcessIncrement;