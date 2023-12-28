import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../assets/css/EmployeeTypeList.css'
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData  } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
const config = require('../../config.json')


function EmployeeTypeList(props) {  
  const [renderInputs, setrenderInputs] = useState([
    { name: "Employee Type", type: "text"},
    { name: "Employee Type Abbrivation", type: "text", },
    { name: "Sort key", type: "text" },
    { name: "Company Code", type: "number", },
    { name: "Retirement Age", type: "number" },
    { name: "Permanant Flag", type: "checkbox", value:"Check"},
    { name: "Company Employee Flag", type: "checkbox", value: "Check" },
    { name: "Probation Month", type: "month"},
    { name: "Change Probation Month", type: "select" },
  ])

  // ==============================================
  // const dispatch = useDispatch();
  // const getData = useSelector((state) => state.getData);
  // const apiStatus = useSelector((state) => state.getData.status);
  // const getDataError = useSelector((state) => state.getData.error);

  // // ==================================================
  // const API_URL = "/employment_type_code/GetEmploymentTypeCode"
  // useEffect(() => {
  //   dispatch(fetchApiData(API_URL));
  // }, [dispatch]);




  // const [ShowDelModel, setShowDelModel] = useState(false)
  // const setDeleteAlert = async (e) => {
  //   setShowDelModel(!ShowDelModel)
  //   setanyofId(e.currentTarget.getAttribute("data-key")) 
  // }
  // const API_DELETE_URL = "/employment_type_code/DeleteEmploymentType"

  // const [anyofId, setanyofId] = useState(null)
  // const bodyOfdata = {
  //   "Empt_Type_code": anyofId,
  // };
 

  return (
    <>
      <div className="container-fluid p-2">
        <div className="container-fluid  EmployeeListContainer"> 
          <div className="row w-100 mx-0">
          <span className="EmployeeListHeader py-2">
            Employee Type List
          </span>
          </div>
          <ul className="p-0 mx-2 mt-2">
              {/* {getDataError == "Fetched" ? "" : <li className={`alert alert-warning` + " " + "mt-1"}>{`${getDataError}`}</li>} */}
          </ul>
          <div className="row mt-2 p-3">
            <div className="col-lg-12 Tableresponsive">
            <table className="table">
              <thead> 
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Type Name</th>
                  <th scope="col">Abberviation</th>
                  <th scope="col">Company Employee</th>
                  <th scope="col">Short Key</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
              {/* {apiStatus == "loading" && (
                <div
                  className="d-flex justify-content-center pt-2 w-100"
                  style={{ background: "white" }}
                >
                  <div class="spinner-border text-primary" role="status">
                  </div>
                </div>
              )} */}
                {/* {getData?.data?.data?.[0]?.map((items) => {
                  return(
                    <tr>
                      <td>{items?.Empt_Type_code}</td>
                      <td>{items?.Empt_Type_name}</td>
                      <td>{items?.Empt_Type_abbr}</td>
                      <td>{items?.Company_Employee_Flag}</td>
                      <td>{items?.Sort_key}</td>
                      <td><button  className="editBtnTable">Edit</button></td>
                      <td><button onClick={setDeleteAlert} data-key={items?.Empt_Type_code} className="deleteBtnTable">Delete</button></td>
                </tr>
                  )
                })} */}
               
              </tbody>
            </table>
            </div>
            <div className="row mt-1">
              <div className="col-md-12 col-sm-12 p-2">
                <div className="EmployeeListbtncontainer">
                  <Link type="submit" className='EmpListbtn' to={'/EmpListForm'}
                    onClick={()=> {
                      sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                      sessionStorage.setItem("whichForm", "CreateEmpType")
                    }}
                  >Add New</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* {ShowDelModel && (
      
      <HrDeleteModal {
          ...{
          setShowDelModel,ShowDelModel,
          bodyOfdata, API_DELETE_URL
          }
      }
      warningMsg="Opps!"
       description="Are You Sure!"
      />
      
      )}  */}
 

     </>
  );
}

export default EmployeeTypeList;