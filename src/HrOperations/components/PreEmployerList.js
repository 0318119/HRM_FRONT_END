import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/PreEmployerList.css";
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')


function PreEmployerList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Employer Name", type: "text" },
        { name: "Employer Code", type: "number", },
        { name: "Industry Flag", type: "checkbox", value: "Check" },
        { name: "Contact Name", type: "text", },
        { name: "Contact Title", type: "text" },
        { name: "Address Line 1", type: "text" },
        { name: "Address Line 2", type: "text" },
        { name: "Telephone Number", type: "number" },
        { name: "Fax Number", type: "number" },
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getPreEmployer, setGetPreEmployer] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetPreviousEmp() {
        await fetch(
            `${config["baseUrl"]}/allemployer/GetAllEmployer`,
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
                        `${config["baseUrl"]}/allemployer/GetAllEmployer`,
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
                                localStorage.setItem("refresh",  response.referesh_token);
                                localStorage.setItem(
                                    "access_token",
                                    response.access_token
                                );
                                setGetPreEmployer(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetPreEmployer(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetPreviousEmp()
    }, [])



    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/allemployer/DeleteEmployer"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Employer_Code": anyofId,
    // };




    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid PreEmployerListContainer">
                <div className="row w-100 mx-0">
                <span className="PreEmployerListHeader py-2">Previous Employer List</span>
                </div>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control PreEmployerListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="PreVious_employee_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Industry Flag</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPreEmployer?.map((items) => {
                                return(

                            <tr>
                                <th scope="row">{items.Employer_Code}</th>
                                <td>{items.Employer_Name}</td>
                                <td>{items.Industry_Flag}</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                {/* <td><button onClick={setDeleteAlert} data-key={items?.Employer_Code} className="deleteBtnTable">Delete</button></td> */}
                            </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "PreviousEmployer")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* { ShowDelModel && (<HrDeleteModal {...{ setShowDelModel, ShowDelModel, bodyOfdata, API_DELETE_URL }} warningMsg="Opps!" description="Are You Sure!" />) }  */}
</>
    );
}

export default PreEmployerList;
