import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/ReligionList.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function ReligionList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Religion Name", type: "text" },
        { name: "Religion Abbrivation", type: "text" },
        { name: "Sort Key", type: "text"},
    ])


    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getReligion, setReligion] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetReligion() {
        await fetch(
            `${config["baseUrl"]}/religion_code/GetEmploymentReligionCode`,
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
                        `${config["baseUrl"]}/religion_code/GetEmploymentReligionCode`,
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
                                setReligion(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setReligion(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetReligion()
    }, []) 

    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/religion_code/DeleteReligion"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Religion_code": anyofId,
    // };

    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid  ReligionListContainer">
                <div className="row w-100 mx-0">
                <span className="ReligionListHeader py-2">Religion List</span>
                </div>
                {/* <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control ResignationsListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div> */}
                <div className="row p-3">
                    <div className="col-lg-12 Religion_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Religion Name</th>
                                <th scope="col">Religion Abbreviation</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getReligion?.map((items) => {
                                return (
                                    <tr>
                                        <th scope="row">{items.Religion_code}</th>
                                        <td>{items.Religion_name}</td>
                                        <td>{items.Religion_abbr}</td>
                                        <td>{items.Sort_key}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Religion_code} className="deleteBtnTable">Delete</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className="row  p-3">
                    <div className="col-md-12 col-sm-12 ">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateReligion")
                                }}
                            >Add New</Link>
                    </div>
                </div>
            </div>
        </div>

       {/* { ShowDelModel && (<HrDeleteModal {...{ setShowDelModel, ShowDelModel, bodyOfdata, API_DELETE_URL }} warningMsg="Opps!" description="Are You Sure!" />) }  */}
</>
    );
}

export default ReligionList;
