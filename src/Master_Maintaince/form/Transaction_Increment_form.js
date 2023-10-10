import React from 'react'
import '../assets/css/Transaction_incre_form.css'
import Header from '../../components/Includes/Header'
import { Link } from 'react-router-dom'

const Transaction_Education_form = (props) => {
    return (
        <>
            <div className="transaction_Increament_Section px-1 ">
                <div className="container-fluid Transaction_Increment_container">
                    <div className="row mx-0 w-100 Transaction_Increment_Header">
                        <span className="Transaction_Increment_Header">
                            Transaction Increment
                            <Link to="#" className="backLink" onClick={props.onClick} >Back </Link>
                        </span>
                        </div>
                    <form className="">
                        <div className="row mx-0 increment_row">
                            <div className='Increment_heading'>
                                Employee Information
                            </div>
                            <div className="col-lg-12 Increment_Info">
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Employee Name</label>
                                    <input type="text" name="" id="" className='form-control  input' />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" name="" id="" className='form-control input' />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Department</label>
                                    <input type="text" name="" id="" className='form-control input' />
                                </div>

                            </div>
                        </div>
                        <div className="row mx-0 increment_row">
                            <div className='Increment_heading'>
                                Increment
                            </div>
                            <div className="col-lg-12 Increment_Info">
                                <div className="Inrement_Date">
                                    <div className='form-group  Increment_select mx-1'>
                                        <label htmlFor="">Increment Date</label>
                                        <input type="Date" className='form-control' />
                                    </div>
                                    <div className='form-group Increment_select mx-1'>
                                        <label htmlFor="">Transaction Date</label>
                                        <input type="Date" className='form-control' />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="row p-0 m-0">
                            <div className="col-lg-6 Existing_Container">
                                <div className='Existing_Heading'>
                                    <p>Existing</p>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Allowance</th>
                                            <th scope="col">Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td><input type="text" name="" id="" /></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 Existing_Container">
                                <div className='Existing_Heading'>
                                    <p>Revised</p>
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Allowance</th>
                                            <th scope="col">Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td><input type="text" name="" id="" /></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row TAFormBtn mt-3 p-3">
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