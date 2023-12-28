import React from 'react'
import '../assets/css/Reports.css'

const Transac_leave = () => {
    return (
        <div className="container-fluid mt-5 p-2">
            <div className="container-fluid mt-1 Reports_listContainer">
                <div className="row w-100 mx-0">
                    <span className="Reports_listHeader">
                        Leave Application Form
                    </span>
                </div>
                <div className="row px-3 mt-2 p-2">
                    <div className="col-lg-6">
                        <div className="form-group w-100 d-flex">
                            <div className=' w-100'>
                                <label htmlFor="">Leave Type</label>
                                <select name="" id="" className='form-select' >
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">2</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group w-100 d-flex">
                            <div className='w-100'>
                                <label htmlFor="">Designation</label>
                                <input type="text" name="" id="" className='form-control' />
                            </div>
                            <div className='w-100 mx-1'>
                                <label htmlFor="">Department</label>
                                <input type="text" name="" id="" className='form-control' />
                            </div>
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="">Leave Type</label>
                            <select name="" id="" className='form-select'>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                            </select>
                        </div>
                        <div className="form-group w-100 d-flex">
                            <div className='w-100'>
                                <label htmlFor="">Start Date</label>
                                <input type="Date" name="" id="" className='form-control' />
                            </div>
                            <div className='w-100 mx-1'>
                                <label htmlFor="">End Date</label>
                                <input type="Date" name="" id="" className='form-control' />
                            </div>

                        </div>
                        <div className="form-group w-100 d-flex">
                            <div className='w-100'>
                                <label htmlFor="">No Of Days</label>
                                <input type="Number" name="" id="" className='form-control' />
                            </div>
                            <div className='w-100 mx-1'>
                                <label htmlFor="">Reason</label>
                                <textarea type="text" name="" id="" className='form-control' />
                            </div>
                        </div>
                        <div className="row mt-1  ">
                            <div className="col-md-10 ">
                                <div className="d-flex">
                                    <button type="submit" className='btn btn-dark'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 border border-light mt-md-3 mt-sm-3 Responsive p-0">
                        <div className="row w-100 mx-0">
                            <span className="Reports_listHeader">
                                Leave Application History
                            </span>
                        </div>
                        <div className="row p-3">
                            <table className='table table-striped border' >
                                <thead >
                                    <tr>
                                        <td>Leave Type</td>
                                        <td>No of Day</td>
                                        <td>Start Date</td>
                                        <td>End Date</td>
                                        <td>Reason</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <th>1</th>
                                        <th>1</th>
                                        <th>1</th>
                                        <th>1</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transac_leave