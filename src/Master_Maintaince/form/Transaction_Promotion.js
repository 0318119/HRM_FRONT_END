import React, { useState, useEffect } from 'react'
import '../assets/css/TransactionPromotionForm.css'
import Header from '../../components/Includes/Header'
import secureLocalStorage from 'react-secure-storage';
import { ImCross as Cross } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const config = require('../../config.json')


const Transaction_Promotion_form = (props) => {

    const [isGetInfo, setGetInfo] = useState([])
    const search = useLocation().search
    var PromotionId = new URLSearchParams(search).get('PromotionId')
    var Already_Process = new URLSearchParams(search).get('Process')

    const [isGetInfoErr, setGetInfoErr] = useState("")
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [currentDate, setCurrentDate] = useState(formattedDate);
    const navigate = useNavigate()
    const [whichAction, setwhichAction] = useState(Already_Process !== null ? "DeleteAndProcess" : "save")
    const [isConfirmationDate, setConfirmationDate] = useState(null)
    const [grade_codeData, setgrade_codeData] = useState([])
    const [grade_codeErr, setgrade_codeErr] = useState(false)
    const [grade_codeVal, setgrade_codeVal] = useState()
    const [getEmploymentCategory, setgetEmploymentCategory] = useState([])
    const [getEmploymentCategoryErr, setgetEmploymentCategoryErr] = useState(false)
    const [getEmploymentCategoryVal, setgetEmploymentCategoryVal] = useState()
    const [GetEmploymentDesigData, setGetEmploymentDesigData] = useState([])
    const [GetEmploymentDesigErr, setGetEmploymentDesigErr] = useState(false)
    const [GetEmploymentDesigVal, setGetEmploymentDesigVal] = useState()
    const [isSupervisor, setSupervisor] = useState([])
    const [isSupervisorErr, setSupervisorErr] = useState(false)
    const [isSupervisorVal, setSupervisorVal] = useState()
    const [GetEmploymentCostCenterData, setGetEmploymentCostCenterData] = useState([])
    const [GetEmploymentCostCenterErr, setGetEmploymentCostCenterErr] = useState(false)
    const [GetEmploymentCostCenterVal, setGetEmploymentCostCenterVal] = useState()
    const [isIncrementDate,setIncrementDate] = useState(null)
    const [isBtn, setBtn] = useState({
        saveBtnLoading: false,
        saveBtnDisabled: false,
        // =================================================================
        processBtnLoading: false,
        processBtnDisabled: false,
        // =================================================================
        deleteBtnLoading: false,
        deleteBtnDisabled: false,
        // =================================================================
    })





    // GET PROMOTION INFO API CALL =================================================================
    async function getInfo() {
        await fetch(
            `${config["baseUrl"]}/promotions/Pomotions_MasterEmployees_List_By_Code`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": PromotionId
                }),
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/promotions/Pomotions_MasterEmployees_List_By_Code`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": PromotionId
                        }),
                    }
                ).then((response) => {
                    return response.json();
                })
                    .then((response) => {
                        if (response.messsage == "timeout error") {
                            navigate("/");
                        } else {
                            if (response.success) {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                setGetInfo(response?.data[0]?.[0])
                            } else {
                                setGetInfoErr(response.message)
                            }
                        }
                    }).catch((error) => { setGetInfoErr(error.messsage) });
            } else {
                if (response.success) {
                    setGetInfo(response?.data[0]?.[0])
                    console.log("Get Promotion Data", response?.data)

                } else {
                    setGetInfoErr(response.message)
                }
            }
        }).catch((error) => { setGetInfoErr(error.message) });
    }
    // SAVE PROMOTION API CALL =================================
    async function SavePromotionInfo(e) {
        e.preventDefault();
        setBtn({
            saveBtnLoading: true,
            saveBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/promotions/PomotionsTranPromotionsSave`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": PromotionId,
                "Date_of_promotion" : isIncrementDate !==null ? isIncrementDate : currentDate,
                "Transaction_Date": currentDate,
                "Position_Code_to": getEmploymentCategoryVal,
                "Desig_code_to": GetEmploymentDesigVal,
                "Grade_code_to": grade_codeVal,
                "Supr_code_to": isSupervisorVal,
                "Cost_Centre_Code_To": GetEmploymentCostCenterVal,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/promotions/PomotionsTranPromotionsSave`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": PromotionId,
                        "Date_of_promotion" : isIncrementDate !==null ? isIncrementDate : currentDate,
                        "Transaction_Date": currentDate,    
                        "Position_Code_to": getEmploymentCategoryVal,
                        "Desig_code_to": GetEmploymentDesigVal,
                        "Grade_code_to": grade_codeVal,
                        "Supr_code_to": isSupervisorVal,
                        "Cost_Centre_Code_To": GetEmploymentCostCenterVal,
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                saveBtnLoading: false,
                                saveBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("Please click on Process button.")
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        } else {
                            setBtn({
                                saveBtnLoading: false,
                                saveBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 5000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("Please click on Process button.")
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    } else {
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        setGetInfoErr(response.message)
                        console.log("warning", response)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                saveBtnLoading: false,
                saveBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 5000);
        });
    }
    // PROCESS PROMOTION API CALL =================================
    async function processPromotion(e) {
        e.preventDefault();
        setBtn({
            processBtnLoading: true,
            processBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/promotions/PomotionsTranPromotionsProcess`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": PromotionId,
                "Date_of_promotion" : isIncrementDate !==null ? isIncrementDate : currentDate,
                "Transaction_Date": currentDate,
                "Position_Code_to": getEmploymentCategoryVal,
                "Desig_code_to": GetEmploymentDesigVal,
                "Grade_code_to": grade_codeVal,
                "Supr_code_to": isSupervisorVal,
                "Cost_Centre_Code_To": GetEmploymentCostCenterVal,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/promotions/PomotionsTranPromotionsProcess`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": PromotionId,
                        "Date_of_promotion" : isIncrementDate !==null ? isIncrementDate : currentDate,
                        "Transaction_Date": currentDate,
                        "Position_Code_to": getEmploymentCategoryVal,
                        "Desig_code_to": GetEmploymentDesigVal,
                        "Grade_code_to": grade_codeVal,
                        "Supr_code_to": isSupervisorVal,
                        "Cost_Centre_Code_To": GetEmploymentCostCenterVal,
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Processed this Promotion.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Promotion");
                            }, 5000);
                        } else {
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        processBtnLoading: false,
                        processBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 5000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Processed this Promotion.")
                        setTimeout(() => {
                            setGetInfoErr("")
                            navigate("/Promotion");
                        }, 5000);
                    } else {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setGetInfoErr(response.message)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                processBtnLoading: false,
                processBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 5000);
        });
    }
    // DELETE PROMOTION API CALL =================================
    async function deletePromotion(e) {
        e.preventDefault();
        setBtn({
            deleteBtnLoading: true,
            deleteBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/promotions/PomotionsTranPromotionsDelete`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": PromotionId,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/promotions/PomotionsTranPromotionsDelete`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": PromotionId,
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Deleted this Promotion.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Promotion");
                            }, 5000);
                        } else {
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 3000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        deleteBtnLoading: false,
                        deleteBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 3000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Deleted this Promotion.")
                        setTimeout(() => {
                            setGetInfoErr("")
                            navigate("/Promotion");
                        }, 5000);
                    } else {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setGetInfoErr(response.messsage)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 3000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                deleteBtnLoading: false,
                deleteBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 3000);
        });
    }
    // GET GRADE DATA API CALL =================================================================
    async function gradecodeDataCall() {
        await fetch(`${config['baseUrl']}/grade_code/GetGradeCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/grade_code/GetGradeCodeWOP`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setgrade_codeData(response.data[0])
                    }
                }).catch((error) => {
                    setgrade_codeErr(error.message)
                })
            }
            else {
                setgrade_codeData(response.data)
            }
        }).catch((error) => {
            setgrade_codeErr(error.message)
        })
    }
    // GET EMPLOYMENT CATEGORY DATA API CALL =================================================================
    async function EmploymentCategoryData() {
        await fetch(`${config['baseUrl']}/employment_category/GetEmploymentCategoryWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_category/GetEmploymentCategoryWOP`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setgetEmploymentCategory(response.data[0])
                    }
                }).catch((error) => {
                    setgetEmploymentCategoryErr(error.message)
                })
            }
            else {
                setgetEmploymentCategory(response.data)
            }
        }).catch((error) => {
            setgetEmploymentCategoryErr(error.message)
        })
    }
    // GET EMPLOYMENT DESIGNATION DATA API CALL =================================================================
    async function GetEmploymentDesigDataCall() {
        await fetch(`${config['baseUrl']}/employment_desig/GetEmploymentDesignationWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_desig/GetEmploymentDesignationWOP`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentDesigData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentDesigErr(error.message)
                })
            }
            else {
                setGetEmploymentDesigData(response.data)

            }
        }).catch((error) => {
            setGetEmploymentDesigErr(error.message)
        })
    }
    // GET CONFIRM ALL EMPLOYEE DATA API CALL ==========================================
    async function getConfirmEmp() {
        await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config["baseUrl"]}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") { navigate("/"); }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        if (response.success) {
                            setSupervisor(response?.data[0])
                        } else {
                            setSupervisorErr(response.message)
                        }
                    }
                }).catch((error) => { setSupervisorErr(error.message); })
            } else {
                if (response.messsage == "timeout error") { navigate("/"); }
                else {
                    if (response.success) {
                        setSupervisor(response?.data)
                    } else {
                        setSupervisorErr(response.message)
                    }
                }
            }
        }).catch((error) => { setSupervisorErr(error.message) })

    }
    // GET EMPLOYMENT COST CENTER DATA API CALL =================================================================
    async function GetEmploymentCostCenterDataCall() {
        await fetch(`${config['baseUrl']}/employment_cost_center/GetEmploymentCostCenterWithoutPagination`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_cost_center/GetEmploymentCostCenterWithoutPagination`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentCostCenterData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentCostCenterErr(error.message)
                })
            }
            else {
                setGetEmploymentCostCenterData(response.data)
                console.log(response.data, "response:asdasdasdsa ")
            }
        }).catch((error) => {
            setGetEmploymentCostCenterErr(error.message)
        })
    }


    useEffect(() => {
        getInfo()
        gradecodeDataCall()
        EmploymentCategoryData()
        GetEmploymentDesigDataCall()
        getConfirmEmp()
        GetEmploymentCostCenterDataCall()
    }, [])

    return (

        <>
            <div>
                <Header />
            </div>
            <div className="transaction_Promotion_Section px-1 ">
                <div className="container-fluid transaction_Promotion_container">
                    <div className="row mx-0 w-100 transaction_Promotion_Header">
                        <span className="transaction_Promotion_Header">
                            Transaction Increment
                            <Link to="#" className="backLink" onClick={props.onClick} ></Link>
                        </span>

                    </div>
                    <form className="responsiveform" onSubmit={
                        whichAction == "save" ? SavePromotionInfo :
                        whichAction == "DeleteAndProcess" ? processPromotion : false
                    }>
                        <div className="row mx-0 transaction_Promotion_row">
                            <div className='Promotion_Heading'>
                                Employee Information
                            </div>
                            
                            <div className="col-lg-12 Promotion_Info">
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Employee Name</label>
                                    <input type="text" name="" id="" className='form-control  input' readOnly value={isGetInfo?.Emp_name ? isGetInfo?.Emp_name : "Not Found"} />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" name="" id="" className='form-control input' readOnly value={isGetInfo?.Desig_name ? isGetInfo?.Desig_name : "Not Found"} />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Department</label>
                                    <input type="text" name="" id="" className='form-control input' readOnly value={isGetInfo?.Department ? isGetInfo?.Department : "Not Found"} />
                                </div>

                            </div>
                        </div>
                        <div className="row mx-0 transaction_Promotion_row">
                            <div className='Promotion_Heading'>
                                Promotion Date
                            </div>
                            <div className="col-lg-12 Promotion_Info">
                                <div className="Promotion_Date">
                                    <div className='form-group  Promotion_select mx-1'>
                                        <label htmlFor="">Increment Date</label>
                                        <input type="Date"  defaultValue={currentDate} onChange={(e) => {setIncrementDate(e.target.value)}} className='form-control' />
                                    </div>
                                    <div className='form-group Promotion_select mx-1'>
                                        <label htmlFor="">Transaction Date</label>
                                        <input type="Date" readOnly value={currentDate} className='form-control' />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row p-0 m-0">
                            <div className="col-lg-4 Existing_Container p-0">
                                <div className='Existing_Heading'>
                                    <p>Existing</p>
                                </div>
                                <div className='existingTable'>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td scope="row">
                                                    <div>
                                                        <label htmlFor="">Category</label>
                                                        <input type="text" readOnly value={isGetInfo?.Leave_Category ? isGetInfo?.Leave_Category : "Not Found"} className='form-control' />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div>
                                                        <label htmlFor="">Designation</label>
                                                        <input type="text" readOnly value={isGetInfo?.Desig_name ? isGetInfo?.Desig_name : "Not Found"} className='form-control' />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div>
                                                        <label htmlFor="">Grade</label>
                                                        <input type="text" readOnly value={isGetInfo?.Grade_name ? isGetInfo?.Grade_name : "Not Found"} className='form-control' />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div>
                                                        <label htmlFor="">Supervisor</label>
                                                        <input type="text" readOnly value={isGetInfo?.Supervisor ? isGetInfo?.Supervisor : "Not Found"} className='form-control' />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">
                                                    <div>
                                                        <label htmlFor="">Cost Center</label>
                                                        <input type="text" readOnly value={isGetInfo?.Cost_Center_name ? isGetInfo?.Cost_Center_name : "Not Found"} className='form-control' />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-8 Existing_Container">
                                <div className='Existing_Heading'>
                                    <p>Proposed</p>
                                </div>
                                <div className='revisedTable'>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <label htmlFor="">Category</label>
                                                        <span className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{getEmploymentCategoryErr ? getEmploymentCategoryErr : false}</span>
                                                        <select name="" id="" className="form-select" onChange={(e) => { setgetEmploymentCategoryVal(e.target.value) }}>
                                                            <option selected disabled value="">Select Category</option>
                                                            {getEmploymentCategory.map((items => {
                                                                return (<option key={items?.Emp_Category_code} value={items?.Emp_Category_code}>{items?.Emp_Category_name ? items?.Emp_Category_name : "Not Found"}</option>)
                                                            }))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <label htmlFor="">Designation</label>
                                                        <span className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentDesigErr ? GetEmploymentDesigErr : false}</span>
                                                        <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentDesigVal(e.target.value) }}>
                                                            <option selected disabled value="">Select Designation</option>
                                                            {GetEmploymentDesigData.map((items => {
                                                                return (<option key={items?.Desig_code} value={items?.Desig_code}>{items?.Desig_name ? items?.Desig_name : "Not Found"}</option>)
                                                            }))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <label htmlFor="">Grade</label>
                                                        <span style={{ fontSize: "12px", color: "red" }} className="m-0 p-0">{grade_codeErr ? grade_codeErr : false}</span>
                                                        <select name="" id="" className="form-select" onChange={(e) => { setgrade_codeVal(e.target.value) }}>
                                                            <option selected disabled value="">Select Grade</option>
                                                            {grade_codeData.map((items => {
                                                                return (<option key={items?.Grade_code} value={items?.Grade_code}>{items?.Grade_name ? items?.Grade_name : "Not Found"}</option>)
                                                            }))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <label htmlFor="">SuperVisor</label>
                                                        <span style={{ fontSize: "12px", color: "red" }} className="m-0 p-0">{isSupervisorErr ? isSupervisorErr : false}</span>
                                                        <select name="" id="" className="form-select" onChange={(e) => { setSupervisorVal(e.target.value) }}>
                                                            <option selected disabled value="">Select Employee</option>
                                                            {isSupervisor.map((items => {
                                                                return (<option value={items?.Emp_code}>{items?.Emp_name ? items?.Emp_name : "Not Found"}</option>)
                                                            }))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <label htmlFor="">Cost Center</label>
                                                        <span className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentCostCenterErr ? GetEmploymentCostCenterErr : false}</span>
                                                        <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentCostCenterVal(e.target.value) }}>
                                                            <option selected disabled value="">Select Cost Center</option>
                                                            {GetEmploymentCostCenterData.map((items => {
                                                                return (<option key={items?.Cost_Centre_code} value={items?.Cost_Centre_code}>{items?.Cost_Centre_name ? items?.Cost_Centre_name : "Not Found"}</option>)
                                                            }))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row TAFormBtn mt-3 p-3">
                            <div className="col-md-12 col-sm-12">
                                {
                                    whichAction == "save" ?
                                        <>
                                            <button type="submit" className="btn btn-dark" disabled={isBtn.saveBtnDisabled}>{isBtn.saveBtnLoading ? "Please wait..." : "Save"}</button>
                                        </>
                                        : whichAction == "DeleteAndProcess" ?
                                            <>
                                                <button type="button" className="ml-2 btn btn-dark" onClick={deletePromotion} disabled={isBtn.deleteBtnDisabled}>{isBtn.deleteBtnLoading ? "Please wait..." : "Delete"}</button>
                                                <button type="submit" className="ml-2 btn btn-dark" disabled={isBtn.processBtnDisabled} > {isBtn.processBtnLoading ? "Please wait..." : "Process"}</button>
                                            </> : false
                                }
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>

            <ul className="px-3" style={{ position: "fixed", bottom: "0", right: "0", widows: "50%" }}>
                {isGetInfoErr && (
                    <li className={`alert alert-warning` + " " + "mt-1"}>{`${isGetInfoErr}`}</li>
                )}
            </ul>
        </>
    )
}

export default Transaction_Promotion_form