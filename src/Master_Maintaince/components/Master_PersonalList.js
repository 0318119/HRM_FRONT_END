import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/css/Masster_Personal.css";
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
const config = require('../../config.json')

function Master_PersonalList() {

    // const [renderInputs, setrenderInputs] = useState([
    //     { name: "Cost Center Name", type: "text" },
    //     { name: "Cost Centre Abbr", type: "text", },
    //     { name: "Train Cost Bugdet", type: "number" },
    //     { name: "Train Cost Actual", type: "number", },
    //     { name: "JV Code1", type: "text" },
    //     { name: "JV Code", type: "text" },
    //     { name: "JVCode", type: "text" },
    //     { name: "Temporary JV Code", type: "text" },
    //     { name: "Employe category 1", type: "number" },
    //     { name: "Employe category 2", type: "number" },
    //     { name: "Employe category 3", type: "number" },
    //     { name: "Functional Cat Code", type: "number" },
    //     { name: "Major Code Mgmt", type: "text" },
    //     { name: "Major Code Union", type: "text" },
    //     { name: "Sort Key", type: "text" },
    //     { name: "Total Bugdet Cost", type: "number" },
    //     { name: "Azad Kashmir Tax Flag", type: "checkbox", value: "Check" },
    //     { name: "Pay Grade Areas code", type: "number" },
    //     { name: "Business Sector Code", type: "number" },
    //     { name: "org unit code", type: "number" },

    // ])

    // var get_refresh_token = localStorage.getItem("refresh");
    // var get_access_token = localStorage.getItem("access_token");
    // const navigate = useNavigate()

    // const [getCostList, setGetCostList] = useState([]);
    // const [getInfoErr, setInfoErr] = useState(false);


    // async function GetCostList() {
    //     await fetch(
    //         `${config["baseUrl"]}/employment_cost_center/GetEmploymentCostCenter`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "content-type": "application/json",
    //                 accessToken: `Bareer ${get_access_token}`,
    //             },
    //         }
    //     )
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then(async (response) => {
    //             if (response.messsage == "unauthorized") {
    //                 await fetch(
    //                     `${config["baseUrl"]}/employment_cost_center/GetEmploymentCostCenter`,
    //                     {
    //                         method: "GET",
    //                         headers: {
    //                             "content-type": "application/json",
    //                             refereshToken: `Bareer ${get_refresh_token}`,
    //                         },
    //                     }
    //                 )
    //                     .then((response) => {
    //                         return response.json();
    //                     })
    //                     .then((response) => {
    //                         if (response.messsage == "timeout error") {
    //                             navigate("/");
    //                         } else {
    //                             localStorage.setItem("refresh",  response.referesh_token);
    //                             localStorage.setItem(
    //                                 "access_token",
    //                                 response.access_token
    //                             );
    //                             setGetCostList(response.data);

    //                         }
    //                     })
    //                     .catch((error) => {
    //                         setInfoErr(error.message);
    //                     });
    //             } else {
    //                 setGetCostList(response.data[0]);
    //                 console.log(response.data[0], "Response")
    //             }
    //         })
    //         .catch((error) => {
    //             setInfoErr(error.message);
    //         });
    // }


    // useEffect(() => {
    //     GetCostList()
    // }, [])


    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/employment_cost_center/DeleteCostCenter"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Cost_Centre_code": anyofId,
    // };



    return (
        <>
            
                <div className="container-fluid  MasterPersonalListContainer">
                    <div className="row mx-0">
                    <span className="MasterPersonalListHeader py-2">Master Personal List</span>
                    </div>
                    <div className="row px-3 mt-2 py-1">
                        <div className="col-lg-5 d-flex">
                            <input
                                type="text"
                                className="form-control MasterPersonalSearch"
                                name=""
                                id=""
                            />
                            <button className="btn btn-dark mx-1">Search</button>
                            <button className="btn btn-dark mx-1">Export to Excel</button>
                        </div>
                    </div>
                    <div className="row  p-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Edit</th>
                                    {/* <th scope="col"></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {getCostList?.map((items) => {
                                    return ( */}
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>rehman </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><button className="editBtnTable">Edit</button></td>
                                            {/* <td><button  className="deleteBtnTable"></button></td> */}
                                        </tr>
                                    {/* )
                                })} */}

                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-1 px-2">
                        <div className="col-md-12 col-sm-12 p-2">
                            <div className=" ">
                                <Link className='btn btn-dark' to="../Transaction_Appointment_personal" >Add New</Link>
                            </div>
                        </div>
                    </div>
                </div>
            
           
        </>
    );
}

export default Master_PersonalList;
