import React, { useState , useEffect } from "react";
import "../assets/css/EmployeeCategory.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchApiData } from '../../redux/slices/GetSlice';
import HrDeleteModal from '../Models/DeleteModel/HrDeleteModal'
import { Link } from "react-router-dom";
const config = require('../../config.json')




function EmployeeList() {
  const [renderInputs, setrenderInputs] = useState([
    { name: "Employee cat Name", type: "text" },
    { name: "Emp Category abbr", type: "text", },
    { name: "graduity fund percentage", type: "number"},
    { name: "Sort key", type: "text" },
  ])

// =========================GetApi=======//

  // const dispatch = useDispatch();
  // const getData = useSelector((state) => state.getData);
  // const apiStatus = useSelector((state) => state.getData.status);
  // const getDataError = useSelector((state) => state.getData.error);

  // // ==================================================
  // const API_URL = "/employment_category/GetEmploymentCategory"
  // // console.log("GetEmploymentTypeCode",getData)
  // useEffect(() => {
  //   dispatch(fetchApiData(API_URL));
  // }, [dispatch]);




  // const [ShowDelModel, setShowDelModel] = useState(false)
  // const setDeleteAlert = async (e) => {
  //   setShowDelModel(!ShowDelModel)
  //   setanyofId(e.currentTarget.getAttribute("data-key"))
  // }
  // const API_DELETE_URL = "/employment_category/DeleteEmploymentCategory"

  // const [anyofId, setanyofId] = useState(null)
  // const bodyOfdata = {
  //   "Emp_Category_code": anyofId,
  // };




  return (
    <>
    <div className="container-fluid p-2">
      <div className="container-fluid mt-2  EmployeeCatListContainer">
        <div className="row w-100 mx-0">
        <span className="EmployeeCatListHeader py-2">Employee Category List</span>
        </div>
        <ul className="p-0 mx-2 mt-2">
          {/* {getDataError == "Fetched" ? "" : <li className={`alert alert-warning` + " " + "mt-1"}>{`${getDataError}`}</li>} */}
        </ul>
        <div className="row  py-1 px-3">
          <div className="col-lg-12 EmpCattableResponsive">     
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Employee Level Name</th>
                <th scope="col">Sort key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {getData?.data?.data?.[0]?.map((items) => {
                return (
                  <tr>
                    <td>{items?.Emp_Category_code}</td>
                    <td>{items?.Emp_Category_name}</td>
                    <td>{items?.Sort_key}</td>
                    <td><button className="editBtnTable">Edit</button></td>
                  </tr>
                )
              })} */}
            </tbody>
          </table>
          </div>
        </div>
        <div className="row px-1 py-2">
          <div className="col-md-12 col-sm-12">
            <div>
              <Link  type="submit" className="btn btn-dark"
                to={'/EmpListForm'}
                onClick={() => {
                  sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                  sessionStorage.setItem("whichForm", "CreateEmpCat")
                }}
              >
                Add New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

       {/* {ShowDelModel && (<HrDeleteModal {...{setShowDelModel, ShowDelModel,bodyOfdata, API_DELETE_URL}} warningMsg="Opps!" description="Are You Sure!" />)}  */}
    </>
  );
}

export default EmployeeList;
