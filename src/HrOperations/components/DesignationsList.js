import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')




function DesignationsList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Designation Name", type: "text" },
        { name: "Designation Abbr", type: "text", },
        { name: "Sort key", type: "text" },

        { name: "Job Evaluation Flag", type: "checkbox", value: "Check" },
        
        { name: "Department Code", type: "number", },
        { name: "Sat Allowance", type: "number", },
        { name: "Eve Allowance", type: "number" },
        { name: "JD Designation Code", type: "number" },
    ])


    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getDesignList, setGetDesignList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetDesigList() {
        await fetch(
            `${config["baseUrl"]}/employment_desig/GetEmploymentDesignation`,
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
                        `${config["baseUrl"]}/employment_desig/GetEmploymentDesignation`,
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
                                setGetDesignList(response.data[0]);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetDesignList(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetDesigList()
    }, [])




    // const [ShowDelModel, setShowDelModel] = useState(false)
    // const setDeleteAlert = async (e) => {
    //     setShowDelModel(!ShowDelModel)
    //     setanyofId(e.currentTarget.getAttribute("data-key"))
    // }
    // const API_DELETE_URL = "/employment_desig/DeleteEmploymentDesignation"

    // const [anyofId, setanyofId] = useState(null)
    // const bodyOfdata = {
    //     "Desig_code": anyofId,
    // };

    

    return (
        <>
        <div className="container-fluid p-2">
            <div className="container-fluid  DesignationsListContainer">
                <div className="row w-100 mx-0">
                <span className="DesignationsListHeader py-2">Designation Lists</span>
                </div>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control DesignationsListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-lg-12 Desi_Table_res">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDesignList.map((items) => {
                                return(
                                    <tr>
                                        <td scope="row">{items.Desig_code}</td>
                                        <td>{items.Desig_name}</td>
                                        <td >{items.Dept_code}</td>
                                        <td>{items.Sort_key}</td>
                                        <td><button className="editBtnTable">Edit</button></td>
                                        {/* <td><button onClick={setDeleteAlert} data-key={items?.Desig_code} className="deleteBtnTable">Delete</button></td> */}
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
                                    sessionStorage.setItem("whichForm", "CreateEmpDesignation")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
               {/* {ShowDelModel && (<HrDeleteModal {...{
          setShowDelModel, ShowDelModel,
          bodyOfdata, API_DELETE_URL
        }
      }
        warningMsg="Opps!"
        description="Are You Sure!"
      />

    )} */}
        </>
    );
}

export default DesignationsList;
