import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/ResignationsList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')

function ResignationsList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Resignation Reason", type: "text" },
        { name: "Resignation Abbrivation", type: "text", },
        { name: "Sort Key", type: "text", },
  
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getRegList, setGetRegList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetRegList() {
        await fetch(
            `${config["baseUrl"]}/employee_resignation/GetEmploymentResignation`,
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
                        `${config["baseUrl"]}/employee_resignation/GetEmploymentResignation`,
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
                                setGetRegList(response.data[0]);
                                console.log(response.data[0], "Response2")

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetRegList(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetRegList()
    }, [])


    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/employee_resignation/DeleteResignation"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Resign_code": anyofId,
    // }; 

    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid  ResignationsListContainer">
                <div className="row w-100 mx-0">
                <span className="ResignationsListHeader py-2">Resignations List</span>
                </div>
                <div className="row p-3">
                    <div className="col-lg-12 Resignation_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Resignation Reason</th>
                                <th scope="col">Abbreviation</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getRegList?.map((items) => {
                                return(
                            <tr>
                                <th scope="row">{items.Resign_code}</th>
                                <td>{items.Resign_reason}</td>
                                <td>{items.Resign_abbr}</td>
                                <td>{items.Sort_key}</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Resign_code} className="deleteBtnTable">Delete</button></td> */}
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
                                    sessionStorage.setItem("whichForm", "CreateResignation")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* {ShowDelModel && (<HrDeleteModal {...{ setShowDelModel, ShowDelModel, bodyOfdata, API_DELETE_URL }} warningMsg="Opps!" description="Are You Sure!" />)}  */}

        </>
    );
}

export default ResignationsList;
