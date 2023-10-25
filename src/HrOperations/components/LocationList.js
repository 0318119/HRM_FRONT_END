import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/LocationList.css";
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function LocationList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Location Name", type: "text" },
        { name: "Location Abbrivation", type: "text" },
        { name: "Location Address Line1", type: "text" },
        { name: "Location Address Line2", type: "text" },
        { name: "Location Address Contact", type: "text" },
        { name: "Location Address phone", type: "number" },
        { name: "Location Address Fax", type: "number" },
        { name: "City Code", type: "number" },
        { name: "Level 1 Code", type: "number" },
        { name: "Bank Code", type: "number" },
        { name: "Sort Key", type: "text" },
        { name: "Eobi City Code", type: "number" },
        { name: "JV Code", type: "text" },
        { name: "Branch Flag", type: "checkbox", value: "check" },
        { name: "Branch Manager Code", type: "number" },
        { name: "Branch Operation Manager Code", type: "number" },
        { name: "Evening Banking person Limit", type: "number" },
        { name: "Evening Banking Flag", type: "checkbox", value: 'check' },
        { name: "Saturday Banking Person limit", type: "number" },
        { name: "Saturday Banking Flag", type: "checkbox", value: 'check' },
        { name: "Saturday Evening Flag", type: "checkbox", value: 'check' },
        { name: "Sunday Banking Person limit", type: "number" },
        { name: "Sunday Banking Flag", type: "checkbox", value: 'check' },
        { name: "Saturday Affactive Date", type: "date" },
        { name: "Saturday InActive Date", type: "date" },
        { name: "Evening Affactive Date", type: "date" },
        { name: "Evening InActive Date", type: "date" },
        { name: "Sunday Affactive Date", type: "date" },
        { name: "Sunday InActive Date", type: "date" },
        { name: "Both Flag", type: "checkbox", value: 'check' },




  
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getLocList, setGetLocList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetLocation() {
        await fetch(
            `${config["baseUrl"]}/location_code/GetEmploymentLocationCode`,
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
                        `${config["baseUrl"]}/location_code/GetEmploymentLocationCode`,
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
                                setGetLocList(response.data[0]);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetLocList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetLocation()
    }, [])

    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/location_code/DeleteLocation"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Loc_code": anyofId,
    // };


    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  LocationListContainer">
                <span className="LocationListHeader py-2">Location List</span>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control LocationListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Loc Name</th>
                                <th scope="col">Loc Abbreviation</th>
                                <th scope="col">Address Line1</th>
                                <th scope="col">Address Line2</th>
                                <th scope="col">Loc Contact</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Fax</th>
                                <th scope="col">City Name</th>
                                <th scope="col">Bank</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getLocList?.map((items) => {
                                return (
                                    <tr>
                                        <td>{items.Loc_code}</td>
                                        <td>{items.Loc_name}</td>
                                        <td>{items.Loc_abbr}</td>
                                        <td>{items.Loc_address_line1}</td>
                                        <td>{items.Loc_address_line2}</td>
                                        <td>{items.Loc_address_contact}</td>
                                        <td>{items.Loc_address_phone}</td>
                                        <td>{items.Loc_address_fax}</td>
                                        <td>{items.City_code}</td>
                                        <td>{items.Bank_Code}</td>
                                        <td>{items.Sort_key}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Loc_code} className="deleteBtnTable">Delete</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateLocation")
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

export default LocationList;
