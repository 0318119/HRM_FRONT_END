import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/EducationLevelList.css";
import secureLocalStorage from 'react-secure-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')


function EducationLevelList() {
  const [renderInputs, setrenderInputs] = useState([
    { name: "Education Level Name", type: "text" },
    { name: "Education Level Abbrivation", type: "text", },
    { name: "Sort Key", type: "text", }, 
  ])


  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getEduLevel, setGetEduLevel] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);


  async function GetEduLevel() {
    await fetch(
      `${config["baseUrl"]}/educationlevel/GetEducationLevel`,
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
            `${config["baseUrl"]}/educationlevel/GetEducationLevel`,
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
                setGetEduLevel(response.data[0]);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetEduLevel(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  useEffect(() => {
    GetEduLevel()
  }, [])


  // const [ShowDelModel, setShowDelModel] = useState(false)
  // const setDeleteAlert = async (e) => {
  //   setShowDelModel(!ShowDelModel)
  //   setanyofId(e.currentTarget.getAttribute("data-key"))
  // }
  // const API_DELETE_URL = "/educationlevel/DeleteEducationLevel"

  // const [anyofId, setanyofId] = useState(null)
  // const bodyOfdata = {
  //   "Edu_level_code": anyofId,
  // };



  return ( 
    <>
    <div className="container-fluid p-2">
      <div className="container-fluid  EducationLevelListContainer">
        <div className="row w-100 mx-0">
        <span className="EducationLevelListHeader py-2">Education Level List</span>
        </div>
        <div className="row  p-3">
          <div className="col-lg-12 Emop_levels_respo">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Education Level Name</th>
                <th scope="col">Education Level Abbrivation</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getEduLevel?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Edu_level_code}</th>
                    <td>{items.Edu_level_name}</td>
                    <td>{items.Edu_level_abbr}</td>
                    <td>{items.Sort_key}</td>
                    <td>
                      <button className="editBtnTable">Edit</button>
                    </td>
                    <td>
                      {/* <button onClick={setDeleteAlert} data-key={items?.Edu_level_code} className="deleteBtnTable">Delete</button> */}
                    </td>
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
                  sessionStorage.setItem("whichForm", "CreateEduLevel")
                }}
              >Add New</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* {ShowDelModel && (<HrDeleteModal {...{ setShowDelModel, ShowDelModel, bodyOfdata, API_DELETE_URL }} warningMsg="Opps!" description="Are You Sure!" />)} */}
    </>
  );
}

export default EducationLevelList;
