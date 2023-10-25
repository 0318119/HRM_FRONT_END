import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/SectionList.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')


function SectionList() {

  const [renderInputs, setrenderInputs] = useState([
    { name: "Section Name", type: "text" },
    { name: "Section Abbrivation", type: "text", },
    { name: "Section Head", type: "number", },
    { name: "Department Code", type: "number", },
    { name: "Sort Key", type: "text", },

  ])


  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getSecList, setGetSecList] = useState([]);
  const [getSecListErr, setSecListErr] = useState(false);


  async function GetEmpSecList() {
    await fetch(
      `${config["baseUrl"]}/employment_section_code/GetEmploymentSectionCode`,
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
            `${config["baseUrl"]}/employment_section_code/GetEmploymentSectionCode`,
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
                setGetSecList(response.data);
                
              }
            })
            .catch((error) => {
              setSecListErr(error.message);
            });
        } else {
          setGetSecList(response.data[0]);
          console.log(response.data, "Response")
        }
      })
      .catch((error) => {
        setSecListErr(error.message);
      });
  }


  useEffect(() => {
    GetEmpSecList()
  }, [])


  // const [ShowDelModel, setShowDelModel] = useState(false)
  // const setDeleteAlert = async (e) => {
  //   setShowDelModel(!ShowDelModel)
  //   setanyofId(e.currentTarget.getAttribute("data-key"))
  // }
  // const API_DELETE_URL = "/employment_section_code/DeleteEmploymentSectionCode"

  // const [anyofId, setanyofId] = useState(null)
  // const bodyOfdata = {
  //   "Section_code": anyofId,
  // };


  return (
    <>
    <div className="container-fluid p-2">
      <div className="container-fluid SectionListContainer">
        <div className="row w-100 mx-0">
        <span className="SectionListHeader py-2">Section List</span>
        </div>
        <div className="row px-3 mt-2 py-1">
          <div className="col-lg-5 d-flex">
            <input
              type="text"
              className="form-control sectionSearch"
              name=""
              id=""
            />
            <button className="btn btn-dark mx-1">Search</button>
          </div>
        </div>
        <div className="row  p-3">
          <div className="col-lg-12 sec_table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Department Name</th>
                <th scope="col">Section Head</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getSecList?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Section_code}</th>
                    <td>{items.Section_name}</td>
                    <td>{items.Dept_code}</td>
                    <td>{items.Section_Head}</td>
                    <td>{items.Sort_key}</td>
                    <td><button className="editBtnTable">Edit</button></td>
                    {/* <td><button onClick={setDeleteAlert} data-key={items?.Section_code} className="deleteBtnTable">Delete</button></td> */}
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
                    sessionStorage.setItem("whichForm", "CreateSections")
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

export default SectionList;
