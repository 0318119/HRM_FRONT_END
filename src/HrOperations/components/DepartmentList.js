import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/DepartmentList.css'
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')

function DepartmentList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Department Name", type: "text" },
        { name: "Department Abbrivation", type: "text", },
        { name: "Division Code", type: "number", },
        { name: "Department Head", type: "number" },
        { name: "Permanent Budget", type: "number" },
        { name: "Temporary Budget", type: "number" },
        { name: "Sort Key", type: "text" },
    ])


    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [GetDepList, setGetDepList] = useState([]);
    const [GetDepListErr, setGetDepListErr] = useState(false);


async function GetDepartmentList() {
        await fetch(
            `${config["baseUrl"]}/department/GetDepartmentList`,
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
                        `${config["baseUrl"]}/department/GetDepartmentList`,
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
                                setGetDepList(response.data[0]);

                            }
                        })
                        .catch((error) => {
                            setGetDepListErr(error.message);
                        });
                } else {
                    setGetDepList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setGetDepListErr(error.message);
            });
    }


    useEffect(() => {
        GetDepartmentList()
    }, [])


    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/department/DeleteDepartmentList"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Dept_code": anyofId,
    // };


    
    return (
        <>
        <div className="container-fluid  py-2">
            <div className="container-fluid  DepartmentListContainer">
                <div className="row w-100 mx-0">
                <span className="DepartmentListHeader py-2">
                    Department List
                </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control DepartmentSearch" name="" id="" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <div className="col-lg-12 dep_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Division Name</th>
                                <th scope="col">Department Head</th>
                                <th scope="col">Payment Budget</th>
                                <th scope="col">Temporary Budget</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetDepList?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Dept_code}</th>
                                        <td>{items.Dept_name}</td>
                                        <td>{items.Div_code}</td>
                                        <td>{items.Dept_Head}</td>
                                        <td>{items.Permanent_Budget}</td>
                                        <td>{items.Temporary_Budget}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Dept_code} className="deleteBtnTable">Delete</button></td> */}
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="    ">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateDepartList")
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

export default DepartmentList;