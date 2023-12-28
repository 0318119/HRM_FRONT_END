import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/TransportationList.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')

function TransportationList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Transport Name", type: "text" },
        { name: "Transport Abbrivation", type: "text", },
        { name: "Sort Key", type: "text" },
        { name: "Area Code", type: "number", },
        { name: "Region Code", type: "number" },
        { name: "Location Code", type: "number" },
        { name: "Leave Head Office Treatment Flag", type: "checkbox", value: "Check" },
        { name: "Head Office Region Flag", type: "checkbox", value: "Check" },
    ])

    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [GetTransportList, setGetTransportList] = useState([]);
    const [GetTransportListErr, setGetTransportListErr] = useState(false);


    async function GetDepartmentList() {
        await fetch(
            `${config["baseUrl"]}/transportation/GetTransportation`,
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
                        `${config["baseUrl"]}/transportation/GetTransportation`,
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
                                setGetTransportList(response.data);

                            }
                        })
                        .catch((error) => {
                            setGetTransportListErr(error.message);
                        });
                } else {
                    setGetTransportList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setGetTransportListErr(error.message);
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
    // const API_DELETE_URL = "/transportation/DeleteTransportation"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Transport_code": anyofId,
    // };
 
    
    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid  TransportationListContainer">
                <div className="row w-100 mx-0">
                <span className="TransportationListHeader py-2">Transportations List</span>
                </div>
                <div className="row p-3">
                    <div className="col-lg-12 transport_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Transportation Name</th>
                                <th scope="col">Abbreviation</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetTransportList?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Transport_code}</th>
                                        <td>{items.Transport_name}</td>
                                        <td>{items.Transport_abbr}</td>
                                        <td>{items.Sort_key}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Transport_code} className="deleteBtnTable">Delete</button></td> */}
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
                                    sessionStorage.setItem("whichForm", "CreateTransportList")
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

export default TransportationList;
