import React from 'react'
import './assets/css/LeaveReportBalance.css'
import Header from '../components/Includes/Header'
import { RiFileExcel2Fill } from 'react-icons/ri'

const Leave_Report_Balance = () => {
  return (
      <>
          <div>
              <Header />
          </div>
          <div className="container-fluid mt-5 p-2">
              <div className="container-fluid mt-1 LeaveReportBalance_listContainer">
                  <div className="row w-100 mx-0">
                      <span className="LeaveReportBalance_listHeader">
                          Leave Report Balance
                      </span>
                  </div>
                  <div className="row px-3 mt-2 p-2">
                      <div className="col-lg-4">
                          <div className="form-group">
                              <label htmlFor="">Year</label>
                              <select name="" id="" className='form-select' >
                                  <option value="">1</option>
                                  <option value="">2</option>
                              </select>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <div className="form-group">
                              <label htmlFor="">Leave Catergory</label>
                              <select name="" id="" className='form-select' >
                                  <option value="">1</option>
                                  <option value="">2</option>
                              </select>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <div className="form-group">
                              <label htmlFor="">Leave Type</label>
                              <select name="" id="" className='form-select' >
                                  <option value="">1</option>
                                  <option value="">2</option>
                              </select>
                          </div>
                      </div>
                  </div>
                  <div className="row px-3 mt-2 p-2">
                      <div className="col-lg-4">
                          <div className="form-group">
                              <label htmlFor="">Employee</label>
                              <select name="" id="" className='form-select'>
                                  <option value="">1</option>
                                  <option value="">2</option>
                              </select>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <div className="form-group mt-4">
                              <input type="text" name="" id="" className='form-control' />
                              <button className='btnsearch'>Search Employee</button>
                          </div>
                      </div>

                  </div>
                  <div className="row px-3 mt-2 p-2">
                      <div className="col-1">
                          <button className='excelbtn'><RiFileExcel2Fill /> Excel</button>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Leave_Report_Balance