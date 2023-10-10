import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/Transaction_Promotion.css'

function Transaction_Pro() {

    return (
        <div className="container-fluid mt-5 p-2">
            <div className="container-fluid mt-5 Transaction_Pro_listContainer">
                <div className="row w-100 mx-0">
                    <span className="Transaction_Pro_listHeader">
                        Transaction Promotion
                    </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control Transaction_Pro_listSearch" name="" id="" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>

                                <th scope="col">Edit</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="    ">
                            <button type="submit" className='btn btn-dark'>
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction_Pro;