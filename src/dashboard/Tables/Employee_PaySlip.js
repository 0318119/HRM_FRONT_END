import React, { useState } from "react";
import "../assets/css/tables.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu as Hamb_ico } from 'react-icons/gi'

const Employee_PaySlip = (Data) => {


    return (
        <>
            <div className="TableContainer">
                <div className="d-flex justify-content-between TableHeaderContainer">
                    <span className="d-flex align-items-center">
                        <Hamb_ico /> <p className="m-1">EMPLOYEE PAYSLIP</p>
                    </span>
                </div>
                <div className="OverFlowtble">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <td>Payslip Period</td>
                                <td></td>
                                <td></td>
                                <td>Balance</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                            <tr>
                                <th>February</th>
                                <th></th>
                                <th></th>
                                <th><Link>View Profile</Link></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Employee_PaySlip;
