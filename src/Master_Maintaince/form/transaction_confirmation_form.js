import React from 'react'
import '../assets/css/transaction_confirmation_form.css'
import Header from '../../components/Includes/Header'
import { Link } from 'react-router-dom'

const transaction_confirmation_form = (props) => {
  return (
    <>
          <div className="transaction_confirmation_Section  p-3">
              <div className="container-fluid transaction_confirmation_container">
                  <div className="col-lg-12 TC_Heading p-2">
                      <span className="TCFormHead">
                          Transaction Confirmation
                          <Link to="#" className="backLink" onClick={props.onClick}>Back</Link>
                      </span>
                  </div>
                  <form  className=" p-2">
                      <div className="row">
                        <div className='HeadingEI'>
                            Employee Information 
                        </div>
                          <div className="col-lg-12 EmployeeInfo">
                              <div className="form-group EmployeeInput">
                                 <label htmlFor="">Employee Name</label>
                                  <input type="text" name="" id="" className='form-control  input' />
                              <div className='d-flex'>
                                <label htmlFor="">PF Nomination</label>
                                 <label>Yes</label>
                                      <input type="Radio" name="" id="" className='mx-1' />
                                 <label>No</label>
                                 <input type="Radio" name="" id="" className='mx-1' />
                              </div>
                            </div> 
                              <div className="form-group EmployeeInput">
                                  <label htmlFor="">Designation</label>
                                  <input type="text" name="" id="" className='form-control input' />
                              </div>
                              <div className="form-group EmployeeInput">
                                  <label htmlFor="">Department</label>
                                  <input type="text" name="" id="" className='form-control input' />
                              </div> 
                                
                          </div>   
                      </div>
                      <div className="row">
                          <div className='HeadingEI'>
                              Confirmation Information
                          </div>
                          <div className="col-lg-12 EmployeeInfo">
                              <div className="form-group EmployeeInput">
                                  <label htmlFor="">Joining Date</label>
                                  <input type="text" name="" id="" className='form-control  input' />
                                  <label htmlFor="">Confirmation Date</label>
                                  <input type="text" name="" id="" className='form-control  input' />
                              </div>
                              <div className="form-group EmployeeInput">
                                  <label htmlFor="">Transaction Date</label>
                                  <input type="text" name="" id="" className='form-control  input' />
                                  <label htmlFor="">Confirmation Date</label>
                                  <input type="text" name="" id="" className='form-control  input' />
                              </div>
                          </div>
                      </div>
                   
                      <div className="row TAFormBtn mt-3">
                          <div className="col-md-12 col-sm-12">
                              <button type="submit" className="btn btn-dark" >Save</button>
                              <button type="button" className="ml-2 btn btn-dark">Delete</button>
                              <button type="button" className="ml-2 btn btn-dark">Process</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
    </>
  )
}

export default transaction_confirmation_form