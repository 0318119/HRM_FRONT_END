import React from 'react'
import './assets/css/LeaveUpload.css'
import Header from '../components/Includes/Header'

const Leave_Balance_Upload = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container-fluid mt-5 p-2">
                <div className="container-fluid mt-1 LeaveReportBalance_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="LeaveReportBalance_listHeader">
                            Leave Uploads
                        </span>
                    </div>
                    <form action="" >
                        <div className="row px-3 mt-2 UploadRow">
                            <div className="col-lg-4 LeaveUploadContainer">
                                <div className="form-group">
                                    <label htmlFor="">Year</label>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="">Upload File</label>
                                    <input type="File" className="form-control fileupload" name="" id="" />
                                </div>
                                <div className="form-group mt-2">
                                    <button className='mx-1'>Upload</button>
                                    <button className='mx-1'>Download Excel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Leave_Balance_Upload