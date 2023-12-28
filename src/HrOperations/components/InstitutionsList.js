import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/InstitutionsList.css";    
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')


function InstitutionsList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Institution Name", type: "text" },
        { name: "Institution Abbrivation", type: "text", },
        { name: "Institution Type", type: "text", },
        { name: "Institution Address line1", type: "text", },
        { name: "Institution Address line2", type: "text", },
        { name: "Institution Address line3", type: "text", },
        { name: "Institution Phone1", type: "number" },
        { name: "Institution Phone2", type: "number" },
        { name: "Institution Fax1", type: "number" },
        { name: "Institution Fax2", type: "number" },
        { name: "Institution Email", type: "text" },
        { name: "Institution Website", type: "text" },
        { name: "Sort Key", type: "text" },
        { name: "Verification Fee", type: "number" },
    ])


    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getInstitute, setGetInstitute] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetInstituteList() {
        await fetch(
            `${config["baseUrl"]}/institutions/GetInstitutions`,
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
                        `${config["baseUrl"]}/institutions/GetInstitutions`,
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
                                setGetInstitute(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetInstitute(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetInstituteList()
    }, [])  


    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/institutions/DeleteInstitution"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Inst_code": anyofId,
    // };



    return (

        <>
        <div className="container-fluid p-2">
            <div className="container-fluid  InstitutionsListContainer">
                <div className="row w-100 mx-0">
                <span className="InstitutionsListHeader py-2">Institutions List</span>
                </div>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control InstitutionsListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-lg-12 Insittute_table_respo">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Abbreviation</th>
                                <th scope="col">Institutions Type</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Fax</th>
                                <th scope="col">Sort Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getInstitute?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Inst_code}</th>
                                        <td>{items.Inst_name}</td>
                                        <td>{items.Inst_abbr}</td>
                                        <td>{items.Inst_type}</td>
                                        <td>{items.Inst_phone1}</td>
                                        <td>{items.Inst_fax1}</td>
                                        <td>{items.Sort_key}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Inst_code} className="deleteBtnTable">Delete</button></td> */}
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
                                    sessionStorage.setItem("whichForm", "CreateInstitute")
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

export default InstitutionsList;
