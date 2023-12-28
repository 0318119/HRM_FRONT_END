import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/LeaveCatLists.css";
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function LeaveCatLists() {
    const [newTabOpened, setNewTabOpened] = useState(false);
    const [renderInputs, setrenderInputs] = useState([
        { name: "Leave Category Name", type: "text" },
        { name: "Leave Category Abbrivation", type: "text" },
        { name: "Sort Key", type: "text" },
    ])
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()
    const [getLeaveCat, setGetLeaveCat] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);

    async function GetLeaveCat() {
        await fetch(
            `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategory`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategory`,
                        {
                            method: "GET",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                        }
                    )
                        .then((response) => {
                            return response.json();
                        })
                        .then((response) => {
                            if (response.messsage == "timeout error") {
                                navigate("/");
                            } else {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem(
                                    "access_token",
                                    response.access_token
                                );
                                setGetLeaveCat(response.data);
                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetLeaveCat(response.data[0]);
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetLeaveCat()
    }, [])

    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/employment_leave_category/DeleteEmploymentLeaveCategory"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Leave_Category_code": anyofId,
    // };

    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid LeaveCatListsContainer p-0">
                    <div className="row w-100 mx-0">
                        <div className="Leave_CategoryBtnBox">
                            <Link type="submit" className='btn btn-dark'
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateLeaveCat")
                                    const newTab = window.open('/EmpListForm', '_blank');
                                    if (newTab) {
                                        sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                        sessionStorage.setItem("whichForm", "CreateLeaveCat")
                                    }
                                }}
                            >Add New</Link>
                            <span className="LeaveCatListsHeader py-2">Leave Categories List</span>
                        </div>
                    </div>
                    {/* <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control LeaveCatListsInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div> */}
                    <div className="row p-3">
                        <div className="col-lg-12 LC_table_res">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Code</th>
                                        <th scope="col">Leave Categories Name</th>
                                        <th scope="col">Abbreviations</th>
                                        <th scope="col">Short Key</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getLeaveCat?.map((items) => {
                                        return (
                                            <tr>
                                                <th scope="row">{items.Leave_Category_code}</th>
                                                <td>{items.Leave_Category_name}</td>
                                                <td>{items.Leave_Category_abbr}</td>
                                                <td>{items.Sort_key}</td>
                                                <td><button className="editBtnTable"
                                                    onClick={() => {
                                                        sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                                        sessionStorage.setItem("whichForm", "CreateLeaveCat")
                                                        const newTab = window.open(`/EmpListForm?leaveCatId=${items.Leave_Category_code}`, '_blank');
                                                        if (newTab) {
                                                            sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                                            sessionStorage.setItem("whichForm", "CreateLeaveCat")
                                                        }
                                                    }}
                                                ><Link to={`/EmpListForm?leaveCatId=${items.Leave_Category_code}`} style={{ color: "white" }}>Edit</Link></button></td>
                                                {/* <td><button onClick={setDeleteAlert} data-key={items?.Leave_Category_code} className="deleteBtnTable">Delete</button></td> */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* {ShowDelModel && (
                <HrDeleteModal {...{ setShowDelModel, ShowDelModel, bodyOfdata, API_DELETE_URL }}
                    warningMsg="Opps!" description="Are You Sure!" />)} */}
        </>
    );
}

export default LeaveCatLists;
