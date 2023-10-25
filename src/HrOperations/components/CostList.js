import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/CostList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')

function CostList() {

  const [renderInputs, setrenderInputs] = useState([
    { name: "Cost Center Name", type: "text" },
    { name: "Cost Centre Abbr", type: "text", },

    { name: "Major Code Mgmt", type: "text" },
    { name: "Major Code Union", type: "text" },

    { name: "JV Code1", type: "text" },
    { name: "JV Code", type: "text" },
    { name: "JVCode", type: "text" },
    { name: "Temporary JV Code", type: "text" },

    { name: "Employe category 1", type: "number" },
    { name: "Employe category 2", type: "number" },
    { name: "Employe category 3", type: "number" },
    { name: "Functional Cat Code", type: "number" },
    { name: "Train Cost Bugdet", type: "number" },
    { name: "Train Cost Actual", type: "number", },
    { name: "Pay Grade Areas code", type: "number" },
    { name: "Business Sector Code", type: "number" },
    { name: "org unit code", type: "number" },
    { name: "Total Bugdet Cost", type: "number" },

    
    { name: "Sort Key", type: "text" },
    { name: "Azad Kashmir Tax Flag", type: "checkbox", value:"Check" },

  ])

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getCostList, setGetCostList] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);


  async function GetCostList() {
    await fetch(
      `${config["baseUrl"]}/employment_cost_center/GetEmploymentCostCenter`,
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
            `${config["baseUrl"]}/employment_cost_center/GetEmploymentCostCenter`,
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
                setGetCostList(response.data);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetCostList(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  useEffect(() => {
    GetCostList()
  }, [])


  // const [ShowDelModel, setShowDelModel] = useState(false)
  // const setDeleteAlert = async (e) => {
  //   setShowDelModel(!ShowDelModel)
  //   setanyofId(e.currentTarget.getAttribute("data-key"))
  // }
  // const API_DELETE_URL = "/employment_cost_center/DeleteCostCenter"

  // const [anyofId, setanyofId] = useState(null)
  // const bodyOfdata = {
  //   "Cost_Centre_code": anyofId,
  // };



  return (
    <>
    {/* <div className="container-fluid p-2">
      <div className="container-fluid  CostListContainer">
        <div className="row w-100 mx-0">
        <span className="CostListHeader py-2">Cost Centers List</span>
        </div>
        <div className="row px-3 mt-2 py-1">
          <div className="col-lg-12 col-sm-12  d-flex CostRes">
            <input
              type="text"
              className="form-control costSearch"
              name=""
              id=""
            />
            <button className="btn btn-dark mx-1 resBtn">Search</button>
              <button className="btn btn-dark mx-1 resBtn">Export to Excel</button>
          </div>
        </div>
        <div className="row  p-3">
            <div className="col-lg-12 Cost_Centre_Table_Responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Abbreviation</th>
                <th scope="col">Training Cost Budget</th>
                <th scope="col">Training Actual Cost</th>
                <th scope="col">Cost Center Code</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getCostList?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Cost_Centre_code}</th>
                    <td>{items.Cost_Centre_name}</td>
                    <td>{items.Cost_Centre_abbr}</td>
                    <td>{items.Train_Cost_Budget}</td>
                    <td>{items.Train_Cost_Actual}</td>
                    <td>{items.JV_Code1}</td>
                    <td>{items.Sort_key}</td>
                    <td><button className="editBtnTable">Edit</button></td> */}
                    {/* <td><button onClick={setDeleteAlert} data-key={items?.Cost_Centre_code} className="deleteBtnTable">Delete</button></td> */}
                  {/* </tr> */}
                {/* ) */}
              {/* })} */}
             
            {/* </tbody>
          </table>
            </div>
        </div>
        <div className="row mt-1 p-3">
          <div className="col-md-12 col-sm-12 p-2">
            <div className="    ">
              <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                onClick={() => {
                  sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                  sessionStorage.setItem("whichForm", "CreateCostCenterList")
                }}
              >Add New</Link>
            </div>
          </div>
        </div>
      </div>
    </div> */}
      {/* {
        ShowDelModel && (

          <HrDeleteModal {
            ...{
              setShowDelModel, ShowDelModel,
              bodyOfdata, API_DELETE_URL
            }
          }
            warningMsg="Opps!"
            description="Are You Sure!"
          />

        )
      }  */}
    </>
  );
}

export default CostList;
