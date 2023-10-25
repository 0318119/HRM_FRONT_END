import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')

function DivisionList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Division Name", type: "text" },
        { name: "Division Abbrivation", type: "text" },
        { name: "Division Head", type: "number" },
        { name: "Sort Key", type: "text" },
        { name: "Division Category Code", type: "number" },
    ]) 


    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getDivisionList, setGetDivisionList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);

    async function GetDivisionList() {
        await fetch(
            `${config["baseUrl"]}/division/GetAllDevisions`,
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
                        `${config["baseUrl"]}/division/GetAllDevisions`,
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
                                setGetDivisionList(response.data[0]);
                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetDivisionList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetDivisionList()
    }, [])


    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/division/DeleteDivision"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Div_code": anyofId,
    // };    

return (
    <>
        <div className="container-fluid p-2">
            <div className="container-fluid  DivisionListContainer">
                <div className="row w-100 mx-0">
                <span className="DivisionListHeader py-2">
                    Division List
                </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control divisionSearch" name="" id="" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <div className="col-lg-12 Divi_table">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Division Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Division Head</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDivisionList?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Div_code}</th>
                                        <td>{items.Div_name}</td>
                                        <td>{items.Div_abbr}</td>
                                        <td>{items.Div_Head}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Div_code} className="deleteBtnTable">Delete</button></td> */}
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
                                    sessionStorage.setItem("whichForm", "CreateDivisions")
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

export default DivisionList;