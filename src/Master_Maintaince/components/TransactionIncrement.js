import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../assets/css/TransactionIncrement.css'
import  Transaction_increment_form from '../form/Transaction_Increment_form'

function TransactionIncrement_list() {

const [isIncrementform, setIncrementForm] = useState(false)
const HandleFormPopup = () => {
    setIncrementForm(false)
}

    return (
        <>
        <div className="container-fluid p-2 IncrementPage">
            <div className="container-fluid TransactionIncrement_listContainer">
                <div className="row w-100 mx-0">
                <span className="TransactionIncrement_listHeader">
                    Transaction Increment - List
                </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control TransactionIncrement_listSearch" name="" id="" />
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
                                <td><button className="editBtnTable" onClick={() => setIncrementForm(!isIncrementform)}>Edit</button></td>
                                
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
                                Form waiting for process
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {isIncrementform ? <Transaction_increment_form onClick={HandleFormPopup} /> : "" }
        </>
    );
}

export default TransactionIncrement_list;