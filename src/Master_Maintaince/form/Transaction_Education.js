import React from 'react'
import '../assets/css/Transaction_Education.css'
import Header from '../../components/Includes/Header'
import { Link } from 'react-router-dom'

const Transaction_Education_form = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="transaction_appointment_Section px-1 mt-5 p-3">
                <div className="container-fluid TCFormCont">
                    <div className="col-lg-12 TC_Heading p-2">
                        <span className="TCFormHead">
                            Transaction Education
                            <Link to="#" className="backLink">Back to  Appointment List</Link>
                        </span>
                    </div>
                    <form className=" p-2">
                        <div className="row">
                            <div className='HeadingEI'>
                                Employee Information
                            </div>
                            <div className="col-lg-12 Education_Info">
                                <div className="form-group EmployeeInput">
                                    <label htmlFor="">Employee Name</label>
                                    <input type="text" name="" id="" className='form-control  input' />
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
                                Education History
                            </div>
                            <div className="col-lg-12 EducationInfo">
                                <div className="EducationInput">
                                    <div className='form-group  edu_Select'>
                                        <label htmlFor="">Education</label>
                                        <select name="" id="" className='form-select'>
                                            <option value="">1</option>
                                        </select>
                                    </div>
                                    <div className='form-group edu_Select'>
                                        <label htmlFor="">Institute</label>
                                        <select name="" id="" className='form-select'>
                                            <option value="">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group EducationInput">
                                    <div className="form-group Edu_input">
                                    <label htmlFor="">Transaction Date</label>
                                    <input type="text" name="" id="" className='form-control  input' />
                                    </div>
                                    <div className="form-group Edu_input">
                                    <label htmlFor="">Confirmation Date</label>
                                    <input type="text" name="" id="" className='form-control  input' />
                                    </div>
                                    <div className="form-group Edu_input2">
                                        <label htmlFor="">Top</label>
                                        <div className='form-control top'>
                                            <input type="radio" name="" id="" className='' />
                                            <label htmlFor="">yes</label>
                                            <input type="radio" name="" id="" className='' />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
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

export default Transaction_Education_form