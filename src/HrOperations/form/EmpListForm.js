import React, { useEffect, useState } from 'react'
import Header from '../../components/Includes/Header'
import './assets/css/HREmpListForm.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
// import { useSelector, useDispatch } from 'react-redux';
// import { EditLeaveCatApiCall } from '../.././redux/slices/EditLeaveSlice';
const config = require('../../config.json')

const EmpListForm = () => {
    // const dispatch = useDispatch();
    const isDataFilter = '';
    const search = useLocation().search
    const [getFormData, setgetFormData] = useState(sessionStorage.getItem("FormData"))
    const [convertData, setCovertData] = useState(JSON.parse(getFormData))
    const [whichForm, setwhichForm] = useState(false)
    const [textInput, settextInput] = useState({})
    const [numberInput, setnumberInput] = useState({})
    const [checkBoxInput, setCheckBoxInput] = useState({})
    const [dateInput, setdateInput] = useState({})
    const [selectTag, setselectTag] = useState({})
    const [DateType, setDateType] = useState({})
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
    const [formErr, setformErr] = useState(false)
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()
    const showAlert = (message, type) => {
        setformErr({
            message: message,
            type: type,
        })
    }

     // Leave Category Filter ========================
     var leaveCatId = new URLSearchParams(search).get('leaveCatId')
     const isLeaveCatFilter = isDataFilter?.data?.data?.[0].filter((items) => items?.Leave_Category_code == leaveCatId)[0];

     // Leave Category Filter ========================
     var leaveTypeId = new URLSearchParams(search).get('leaveTypeId')
     const isLeaveTypeFilter = isDataFilter?.data?.data?.[0].filter((items) => items.Leave_type_code == leaveTypeId)[0];
     console.log("isDataFilter",isLeaveTypeFilter)
     const [isDefalutChecked,setDefalutChecked] = useState()
     
     useEffect(() => {
        setDefalutChecked(`${isLeaveTypeFilter?.Proportionate_flag}`)
          console.log("isDefalutChecked",isDefalutChecked)
    }, [isDefalutChecked])


const CreateEmpTypeData = JSON.stringify({
    "Empt_Type_code": 0,
    "Empt_Type_name": textInput.Employee_Type,
    "Empt_Type_abbr": textInput.Employee_Type_Abbrivation,
    "Company_Employee_Flag": checkBoxInput.Company_Employee_Flag,
    "Emp_Code_Prefix": numberInput.Company_Code,
    "PermanantFlag": checkBoxInput.Permanant_Flag,
    "Retirement_Age": numberInput.Retirement_Age,
    "ProbationMonths": dateInput.Probation_Month,
    "AllowChangeProbationMonths": selectTag.Change_Probation_Month,
    "Sort_key": textInput.Sort_key,
})

const CreateEmpType = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_type_code/AddEmploymentType`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: CreateEmpTypeData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_type_code/AddEmploymentType`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: CreateEmpTypeData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => { 
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning") 
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
            
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const CreateEmpCatData = JSON.stringify({
    "Emp_Category_code": 0,
    "Emp_Category_name": textInput.Employee_cat_Name,
    "Emp_Category_abbr": textInput.Emp_Category_abbr,
    "graduity_fund_percentage": numberInput.graduity_fund_percentage,
    "Sort_key": textInput.Sort_key,
})
const CreateEmpCat = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        await fetch(`${config['baseUrl']}/employment_category/AddEmploymentCategory`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: CreateEmpCatData
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_category/AddEmploymentCategory`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: CreateEmpCatData
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh",  response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(response.messsage, "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }).catch((errs) => {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(errs.messsage, "warning")
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        }).catch((errs) => {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(errs.messsage, "warning")
        })
}
const CreateEmpDesignationData = JSON.stringify({
    "Desig_code" : 0,
    "Desig_name": textInput.Designation_Name,
    "Desig_abbr": textInput.Designation_Abbr,
    "Sort_key": textInput.Sort_key,
    "Job_Evaluation_Flag": checkBoxInput.Job_Evaluation_Flag,
    "Dept_code": numberInput.Department_Code,
    "SatAllowance": numberInput.Sat_Allowance,
    "EveAllowance": numberInput.Eve_Allowance,
    "JD_Desig_Code": numberInput.JD_Designation_Code

})
const CreateEmpDesignation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_desig/AddEmploymentDesignation`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: CreateEmpDesignationData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_desig/AddEmploymentDesignation`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: CreateEmpDesignationData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}
const CostCenterData = JSON.stringify({
    "Cost_Centre_code": 0,
    "Cost_Centre_name": textInput.Cost_Center_Name,
    "Cost_Centre_abbr": textInput.Cost_Centre_Abbr,
    "Train_Cost_Budget": numberInput.Train_Cost_Bugdet,
    "Train_Cost_Actual": numberInput.Train_Cost_Actual,
    "JV_Code1": textInput.JV_Code1,
    "JV_Code": textInput.JV_Code,
    "JVCode": textInput.JVCode,
    "Temporary_JV_Code": textInput.Temporary_JV_Code,
    "emp_category_1": numberInput.Employe_category_1,
    "emp_category_2": numberInput.Employe_category_2,
    "emp_category_3": numberInput.Employe_category_3,
    "Functional_Category_code": numberInput.Functional_Cat_Code,
    "Major_Code_Mgmt": textInput.Major_Code_Mgmt,
    "Major_Code_Union": textInput.Major_Code_Union,
    "Sort_key": textInput.Sort_Key,
    "total_cost_budget": numberInput.Total_Bugdet_Cost,
    "Azad_Kashmir_Tax_Flag": checkBoxInput.Azad_Kashmir_Tax_Flag,
    "Pay_Grade_Areas_code": numberInput.Pay_Grade_Areas_code,
    "Business_Sector_Code": numberInput.Business_Sector_Code,
    "org_unit_code": numberInput.org_unit_code,
})
const CreateCostCenterList = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_cost_center/AddCostCenter`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: CostCenterData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_cost_center/AddCostCenter`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: CostCenterData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}
const GradeData = JSON.stringify({
    "Grade_code": 0,
    "Grade_name": textInput.Grade_Name,
    "Grade_abbr": textInput.Grade_Abbr,
    "ProbationMonths": numberInput.Probation_Months,    
    "Incentive_Hour_Rate": numberInput.Incentive_Hour_Rate,
    "Incentive_Weekdays_Limit_Hour": numberInput.Incentive_Weekdays_Limit_Hour,
    "Incentive_Saturday_Limit_Hour": numberInput.Incentive_Saturday_Limit_Hour,
    "Medical_Insurance_Amount": numberInput.Medical_Insurance_Amount,
    "Meal_Deduction": numberInput.Meal_Deduction,
    "Sort_key": textInput.Sort_Key,
    "Litres_for_Petrol": numberInput.Litres_For_Petrol,
    "Insurance_Category": textInput.Insurance_Category,
    "Life_Insurance_Category": textInput.Life_Insurance_Category,
    "Long_Name": textInput.Long_Name,
    "job_description_flag": checkBoxInput.Job_Description_Flag,
    "next_promotion_grade": numberInput.Next_Promotion_Grade,
    "Assigning_Critaria_For_Next_Promotion": numberInput.Assigning_Critaria_For_Next_Promotion,
    "Overtime_flag": textInput.Overtime_Flag,
    "mobile_amount": numberInput.Mobile_Amount,
    "Car_Amount": numberInput.Car_Amount
})
const CreateGradeList = async (e) => {
    e.preventDefault();
    // console.log("CreateGradeList", GradeData)
    // return
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/grade_code/AddGrade`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: GradeData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/grade_code/AddGrade`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: GradeData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
} 
const InstituteData = JSON.stringify({
    "Inst_code": 0,
    "Inst_name": textInput.Institution_Name,
    "Inst_abbr": textInput.Institution_Abbrivation,
    "Inst_type": textInput.Institution_Type,
    "Inst_address_line1": textInput.Institution_Address_line1,
    "Inst_address_line2": textInput.Institution_Address_line2,
    "Inst_address_line3": textInput.Institution_Address_line3,
    "Inst_phone1": numberInput.Institution_Phone1,
    "Inst_phone2": numberInput.Institution_Phone2,
    "Inst_fax1": numberInput.Institution_Fax1,
    "Inst_fax2": numberInput.Institution_Fax2,
    "Inst_email": textInput.Institution_Email,
    "Inst_Web_Site": textInput.Institution_Website,
    "Sort_key": textInput.Sort_Key,
    "Verification_Fee": numberInput.Verification_Fee
})
const CreateInstitute = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/institutions/AddInstitution`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: InstituteData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/institutions/AddInstitution`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: InstituteData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
} 
const CountryData = JSON.stringify({
    "Country_Code": 0,
    "Country_Name": textInput.Country_Name,
    "Country_Abbr": textInput.Country_Abbrivation,
    "SortKey": textInput.Sort_Key
})
const CreateCountry = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/countries/AddCountry`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: CountryData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/countries/AddCountry`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: CountryData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}    
const DivisionData = JSON.stringify({
    "Div_code": 0,
    "Div_name": textInput.Division_Name,
    "Div_abbr": textInput.Division_Abbrivation,
    "Div_Head": numberInput.Division_Head,
    "Sort_key": textInput.Sort_Key,
    "division_category_code": numberInput.Division_Category_Code
})
const CreateDivisions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/division/AddDivision`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: DivisionData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/division/AddDivision`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: DivisionData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
                navigate('/Divisions')
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}   
const ReligionData = JSON.stringify({
    "Religion_code": 0,
    "Religion_name": textInput.Religion_Name,
    "Religion_abbr": textInput.Religion_Abbrivation,
    "Sort_key": textInput.Sort_Key
})    
const CreateReligion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/religion_code/AddReligion`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: ReligionData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/religion_code/AddReligion`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: ReligionData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}
const EducationData = JSON.stringify({
    "Edu_level_code": 0,
    "Edu_level_name": textInput.Education_Level_Name,
    "Edu_level_abbr": textInput.Education_Level_Abbrivation,
    "Sort_key": textInput.Sort_Key
})     
const CreateEduLevel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/educationlevel/AddEducationLevel`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: EducationData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/educationlevel/AddEducationLevel`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: EducationData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}
const TransportData = JSON.stringify({
    "Transport_code": 0,
    "Transport_name": textInput.Transport_Name,
    "Transport_abbr": textInput.Transport_Abbrivation,
    "Sort_key": textInput.Sort_Key,
    "area_code": numberInput.Area_Code,
    "region_code": numberInput.Region_Code,
    "loc_code": numberInput.Location_Code,
    "Leave_HeadOffice_Treatment_Flag": checkBoxInput.Leave_Head_Office_Treatment_Flag,
    "headoffcie_region_offcie_flag": checkBoxInput.Head_Office_Region_Flag

})     
const CreateTransportList = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/transportation/AddTransportation`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: TransportData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/transportation/AddTransportation`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: TransportData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}
const ResignationData = JSON.stringify({
    "Resign_code": 0,
    "Resign_reason": textInput.Resignation_Reason,
    "Resign_abbr": textInput.Resignation_Abbrivation,
    "Sort_key": textInput.Sort_Key

})
const CreateResignation = async (e) => {
    e.preventDefault();
    // console.log("first", ResignationData)
    // return
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employee_resignation/AddResignation`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: ResignationData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employee_resignation/AddResignation`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: ResignationData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
            navigate('/Resignation')
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const EducatData = JSON.stringify({
    "Edu_code": 0,
    "Edu_name": textInput.Education_Name,
    "Edu_abbr": textInput.Education_Abbrivation,
    "Edu_level_code": numberInput.Education_Level_Code,
    "Sort_key": textInput.Sort_key

})
const CreateEducation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/eduation_code/AddEducation`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: EducatData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/eduation_code/AddEducation`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: EducatData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)
            navigate('/Education')
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const leaveCatData = JSON.stringify({
    "Leave_Category_code": leaveCatId ? leaveCatId : 0,
    "Leave_Category_name": textInput.Leave_Category_Name ? textInput.Leave_Category_Name : isLeaveCatFilter?.Leave_Category_name,
    "Leave_Category_abbr": textInput.Leave_Category_Abbrivation ? textInput.Leave_Category_Abbrivation : isLeaveCatFilter?.Leave_Category_abbr,
    "Sort_key": textInput.Sort_Key ? textInput.Sort_Key : isLeaveCatFilter?.Sort_key
})

const CreateLeaveCat = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_leave_category/AddEmploymentLeaveCategory`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: leaveCatData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_leave_category/AddEmploymentLeaveCategory`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: leaveCatData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    navigate('/Leave_Category')
                }, 3000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                navigate('/Leave_Category')
            }, 3000)
        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
} 
const leaveTypeData = JSON.stringify({
    "Leave_type_code": leaveTypeId? leaveTypeId : 0,
    "Leave_name": textInput.Leave_Name? textInput.Leave_Name : isLeaveTypeFilter?.Leave_name,
    "Leave_type_abbr": textInput.Leave_Type_Abbrivation ? textInput.Leave_Type_Abbrivation : isLeaveTypeFilter?.Leave_type_abbr,
    "Leave_Category_code": numberInput.Leave_Category_Code ? numberInput.Leave_Category_Code : isLeaveTypeFilter?.Leave_type_code,
    "Start_date": DateType.Start_Date ? DateType.Start_Date : isLeaveTypeFilter?.Start_date,
    "End_date": DateType.End_Date ? DateType.End_Date : isLeaveTypeFilter?.End_date,
    "Annual_Credit": numberInput.Annual_Credit ? numberInput.Annual_Credit : isLeaveTypeFilter?.Annual_Credit,
    "Accumulation_limit": numberInput.Accumulation_Limit ? numberInput.Accumulation_Limit : isLeaveTypeFilter?.Accumulation_limit,
    "Proportionate_flag": checkBoxInput.Proportionate_Flag ? checkBoxInput.Proportionate_Flag : isLeaveTypeFilter?.Proportionate_flag,
    "Advance_days": numberInput.Advance_Days ? numberInput.Advance_Days : isLeaveTypeFilter?.Advance_days,
    "Minimum_days_per_form": numberInput.Minimum_Days_Per_Form ? numberInput.Minimum_Days_Per_Form :  isLeaveTypeFilter?.Minimum_days_per_form,
    "Maximum_days_per_form": numberInput.Maximum_Days_Per_Form ? numberInput.Maximum_Days_Per_Form : isLeaveTypeFilter?.Maximum_days_per_form,
    "Life_times": numberInput.Life_Times ? numberInput.Life_Times : isLeaveTypeFilter?.Life_times,
    "Religion_code": numberInput.Religion_Code ? numberInput.Religion_Code : isLeaveTypeFilter?.Religion_code,
    "Increase_Leave_code": numberInput.Increase_Leave_Code ? numberInput.Increase_Leave_Code : isLeaveTypeFilter?.Increase_Leave_code,
    "Join_Confirm_flag": checkBoxInput.Join_Confirm_Flag ? checkBoxInput.Join_Confirm_Flag :  isLeaveTypeFilter?.Join_Confirm_flag,
    "Balance_Check_flag": checkBoxInput.Balance_Check_Flag ? checkBoxInput.Balance_Check_Flag : isLeaveTypeFilter?.Balance_Check_flag,
    "Meal_flag": checkBoxInput.Meal_Flag ? checkBoxInput.Meal_Flag : isLeaveTypeFilter?.Meal_flag,
    "Encashment_flag": checkBoxInput.Encashment_Flag ? checkBoxInput.Encashment_Flag : isLeaveTypeFilter?.Encashment_Flag,
    "Without_pay_flag": checkBoxInput.Without_Pay_Flag ? checkBoxInput.Without_Pay_Flag : isLeaveTypeFilter?.Without_Pay_Flag,
    "Medical_Certificate_flag": checkBoxInput.Medical_Certificate_Flag ? checkBoxInput.Medical_Certificate_Flag : isLeaveTypeFilter?.Medical_Certificate_Flag,
    "Medical_Certificate_days": numberInput.Medical_Certificate_Days ? numberInput.Medical_Certificate_Days : isLeaveTypeFilter?.Medical_Certificate_Days,
    "Special_Approval_flag": checkBoxInput.Special_Approval_Flag ? checkBoxInput.Special_Approval_Flag : isLeaveTypeFilter?.Special_Approval_Flag,
    "Special_Approval_days": numberInput.Special_Approval_Days  ? numberInput.Special_Approval_Days : isLeaveTypeFilter?.Special_Approval_Days,
    "married_flag": checkBoxInput.Married_Flag ? checkBoxInput.Married_Flag : isLeaveTypeFilter?.Married_Flag,
    "Adjustment_flag": checkBoxInput.Adjustment_flag ? checkBoxInput.Adjustment_flag : isLeaveTypeFilter?.Adjustment_flag,
    "Adjustment_Leave_code": numberInput.Adjustment_Leave_Code ? numberInput.Adjustment_Leave_Code : isLeaveTypeFilter?.Adjustment_Leave_Code,
    "Sort_key": textInput.Sort_Key  ? textInput.Sort_Key : isLeaveTypeFilter?.Sort_Key,
    "On_Confirm_Flag": checkBoxInput.On_Confirm_Flag ? checkBoxInput.On_Confirm_Flag : isLeaveTypeFilter?.On_Confirm_Flag,
    "DaysApplyOn": checkBoxInput.Days_Apply_On ? checkBoxInput.Days_Apply_On : isLeaveTypeFilter?.Days_Apply_On,
    "SandwichFlag": checkBoxInput.Sandwich_Flag ? checkBoxInput.Sandwich_Flag : isLeaveTypeFilter?.Sandwich_Flag,
    "AttachmentFlag": checkBoxInput.Attachment_Flag ? checkBoxInput.Attachment_Flag : isLeaveTypeFilter?.Attachment_Flag,
    "AttachmentDays": numberInput.Attachment_Days ? numberInput.Attachment_Days : isLeaveTypeFilter?.Attachment_Days,
    "HREntryStopFlag": checkBoxInput.HR_Entry_Stop_Flag ? checkBoxInput.HR_Entry_Stop_Flag : isLeaveTypeFilter?.HR_Entry_Stop_Flag,
    "RepaymentFlag": checkBoxInput.Repayment_Flag ? checkBoxInput.Repayment_Flag : isLeaveTypeFilter?.Repayment_Flag,
    "GenderFlag": checkBoxInput.Gender_Flag ? checkBoxInput.Gender_Flag  : isLeaveTypeFilter?.Gender_Flag,
    "CompensatoryFlag": checkBoxInput.Compensatory_Flag ? checkBoxInput.Compensatory_Flag : isLeaveTypeFilter?.Compensatory_Flag
})
const CreateLeaveType = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_leave_type/AddEmploymentLeaveType`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: leaveTypeData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_leave_type/AddEmploymentLeaveType`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: leaveTypeData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    navigate('/Leave_Types')
                }, 3000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                navigate('/Leave_Types')
            }, 3000)

        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const DepartmentData = JSON.stringify({
    "Dept_code": 0,
    "Dept_name": textInput.Department_Name,
    "Dept_abbr": textInput.Department_Abbrivation,
    "Div_code": numberInput.Division_Code,
    "Dept_Head": numberInput.Department_Head,
    "Permanent_Budget": numberInput.Permanent_Budget,
    "Temporary_Budget": numberInput.Temporary_Budget,
    "Sort_key": textInput.Sort_Key


})
const CreateDepartList = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/department/AddDepartmentList`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: DepartmentData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/department/AddDepartmentList`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: DepartmentData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)

            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const LocationData = JSON.stringify({
        "Loc_code": 0,
        "Loc_name": textInput.Location_Name,
        "Loc_abbr": textInput.Location_Abbrivation,
        "Loc_address_line1": textInput.Location_Address_Line1,
        "Loc_address_line2": textInput.Location_Address_Line2,
        "Loc_address_contact": textInput.Location_Address_Contact,
        "Loc_address_phone": numberInput.Location_Address_Phone,
        "Loc_address_fax": numberInput.Location_Address_Fax,
        "City_code": numberInput.City_Code,
        "Level_1_Code": numberInput.Level_1_Code,
        "Bank_Code": numberInput.Bank_Code,
        "Sort_key": textInput.Sort_Key,
        "eobi_city_code": numberInput.Eobi_City_Code,
        "JV_CODE": textInput.JV_Code,
        "Branch_Flag": checkBoxInput.Branch_Flag,
        "BranchManager_Code": numberInput.Branch_Manager_Code,
        "Branch_Operation_Manager_Code": numberInput.Branch_Operation_Manager_Code,
        "evening_banking_peron_limit": numberInput.Evening_Banking_person_Limit,
        "Evening_banking_flag": checkBoxInput.Evening_Banking_Flag,
        "Saturday_banking_peron_limit": numberInput.Saturday_Banking_Person_limit,
        "Saturday_banking_flag": checkBoxInput.Saturday_Banking_Flag,
        "SatEveningFlag": checkBoxInput.Saturday_Evening_Flag,
        "Sunday_banking_peron_limit": numberInput.Sunday_Banking_Person_limit,
        "Sunday_banking_flag": checkBoxInput.Sunday_Banking_Flag,
        "Saturday_Affactive_Date": DateType.Saturday_Affactive_Date,
        "Saturday_InActive_Date": DateType.Saturday_InActive_Date,
        "Evening_Affactive_Date": DateType.Evening_Affactive_Date,
        "Evening_InActive_Date": DateType.Evening_InActive_Date,
        "Sunday_Affactive_Date": DateType.Sunday_Affactive_Date,
        "Sunday_InActive_Date": DateType.Sunday_InActive_Date,
        "Booth_Flag": checkBoxInput.Both_Flag

    
})
const CreateLocation = async (e) => {   
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/location_code/AddLocation`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: LocationData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/location_code/AddLocation`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: LocationData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const SectionsData = JSON.stringify({
    "Section_code": 0,
    "Section_name": textInput.Section_Name,
    "Section_abbr": textInput.Section_Abbrivation,
    "Dept_code": numberInput.Department_Code,
    "Section_Head": numberInput.Section_Head,
    "Sort_key": textInput.Sort_Key

})
const CreateSections = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employment_section_code/AddEmploymentSectionCode`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: SectionsData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/employment_section_code/AddEmploymentSectionCode`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: SectionsData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
}  
const PreviousEmployerData = JSON.stringify({
    "Employer_Name": textInput.Employer_Name,
    "Employer_Code": numberInput.Employer_Code,
    "Industry_Flag": checkBoxInput.Industry_Flag,
    "Contact_Name": textInput.Contact_Name,
    "Contact_Title": textInput.Contact_Title,
    "Address_Line_1": textInput.Address_Line_1,
    "Address_Line_2": textInput.Address_Line_2,
    "Telephone_number": numberInput.Telephone_Number,
    "Fax_number": numberInput.Fax_Number
})
const PreviousEmployer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/allemployer/AddEmployer`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: PreviousEmployerData
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/allemployer/AddEmployer`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: PreviousEmployerData
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((errs) => {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(errs.messsage, "warning")
            })
        }
        else if (response.messsage == "timeout error") { navigate('/') }
        else {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }
    }).catch((errs) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(errs.messsage, "warning")
    })
} 


// GET API CALL =======================================

const API_URLS = leaveCatId ? "/employment_leave_category/GetEmploymentLeaveCategory" :
leaveTypeId ? "/employment_leave_type/GetLeaveType" : false

// useEffect(() => {
//     dispatch(EditLeaveCatApiCall(API_URLS))
// }, [dispatch])

useEffect(() => {
    setwhichForm(sessionStorage.getItem("whichForm"))
}, [whichForm])




    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container p-3"></div>
            <div className="container p3 mt-5">
                <div className="container-fluid mt-2 EmployeeListContainer ">
                    <div className="row w-100 mx-0">
                    <span className="EmployeeListHeader py-2">
                        Form
                    </span>
                    </div>
                    <div className="row mt-2 p-3">
                        <form onSubmit={
                            whichForm == "CreateEmpType" ? CreateEmpType : 
                            whichForm == "CreateEmpCat" ? CreateEmpCat :
                            whichForm == "CreateEmpDesignation" ? CreateEmpDesignation :
                            whichForm == 'CreateCostCenterList' ? CreateCostCenterList :
                            whichForm == 'CreateGradeList' ? CreateGradeList :
                            whichForm == 'CreateInstitute' ? CreateInstitute :
                            whichForm == "CreateCountry" ? CreateCountry :
                            whichForm == "CreateDivisions" ? CreateDivisions :
                            whichForm == 'CreateReligion' ? CreateReligion :
                            whichForm == 'CreateTransportList' ? CreateTransportList :
                            whichForm == 'CreateResignation' ? CreateResignation :
                            whichForm == 'CreateEduLevel' ? CreateEduLevel :
                            whichForm == 'CreateEducation' ? CreateEducation :
                            whichForm == 'CreateLeaveCat' ? CreateLeaveCat :
                            whichForm == 'CreateLeaveType' ? CreateLeaveType :
                            whichForm == 'CreateDepartList' ? CreateDepartList :
                            whichForm == 'CreateLocation' ?  CreateLocation :
                            whichForm == 'CreateSections' ? CreateSections :
                            whichForm == 'PreviousEmployer' ? PreviousEmployer :
                            whichForm == "empty"? "" : false
                        }>
                            <ul className='p-0'>
                                {formErr && (
                                    <li className={`alert alert-${formErr.type}` + " " + "mt-1"}>{`${formErr.message}`}</li>
                                )}
                            </ul>
                            <div className="EmployeeTypeForm">
                                {convertData?.map((checkType,index) => {
                                    switch (checkType.type) {
                                        case 'text':
                                            return <div className="form-group mt-3">
                                                <label className='text-dark'>{checkType?.name}</label>
                                                <input type="text" name={checkType?.name} className="form-control inputtext"
                                                    defaultValue={
                                                        index == 0 ? isLeaveCatFilter?.Leave_Category_name || isLeaveTypeFilter?.Leave_name: 
                                                        index == 1 ? isLeaveCatFilter?.Leave_Category_abbr || isLeaveTypeFilter?.Leave_type_abbr: 
                                                        index == 2 ? isLeaveCatFilter?.Sort_key : 
                                                        index == 26 ? isLeaveTypeFilter?.Sort_key : ""
                                                    }
                                                    onChange={(e) => {
                                                        const originalString = e.target.name;
                                                        const stringWithoutSpaces = originalString.split(' ').join('_');
                                                        settextInput({
                                                            ...textInput,
                                                            [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value :  false,
                                                        });
                                                    }}
                                                />
                                            </div>;
                                        case 'number':
                                            switch (checkType?.name) {
                                                case "Retirement Age":
                                                    return <div className="form-group mt-3">
                                                        <label className='text-dark'>{checkType?.name}</label>
                                                        <input type="number" name={checkType?.name} className="form-control inputtext"
                                                            onChange={(e) => {
                                                                const originalString = e.target.name;
                                                                const stringWithoutSpaces = originalString.split(' ').join('_');
                                                                setnumberInput({
                                                                    ...numberInput,
                                                                    [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value : false,
                                                                });
                                                            }}
                                                        />
                                                        <span className='Errormsg'>{numberInput.Retirement_Age < 10 ? "Plese type words less then 10 or equal  to ten" :  ""}</span>
                                                    </div>;
                                                    
                                            
                                                default:
                                                    return <div className="form-group mt-3">
                                                            <label className='text-dark'>{checkType?.name}</label>
                                                        <input type="number" name={checkType?.name} className="form-control inputtext"
                                                                defaultValue={
                                                                    index == 2 ? isLeaveTypeFilter?.Leave_type_code :
                                                                    index == 5 ? isLeaveTypeFilter?.Annual_Credit :
                                                                    index == 6 ? isLeaveTypeFilter?.Accumulation_limit :
                                                                    index == 8 ? isLeaveTypeFilter?.Advance_days :
                                                                    index == 9 ? isLeaveTypeFilter?.Minimum_days_per_form : 
                                                                    index == 10 ? isLeaveTypeFilter?.Maximum_days_per_form : 
                                                                    index == 11 ? isLeaveTypeFilter?.Life_times :
                                                                    index == 12 ? isLeaveTypeFilter?.Religion_code :
                                                                    index == 13 ? isLeaveTypeFilter?.Increase_Leave_code :
                                                                    index == 20 ? isLeaveTypeFilter?.Medical_Certificate_days :
                                                                    index == 22 ? isLeaveTypeFilter?.Special_Approval_days :
                                                                    index == 25 ? isLeaveTypeFilter?.Adjustment_Leave_code :
                                                                    index == 31 ? isLeaveTypeFilter?.AttachmentDays : ""
                                                                }
                                                                onChange={(e) => {
                                                                    const originalString = e.target.name;
                                                                    const stringWithoutSpaces = originalString.split(' ').join('_');
                                                                    setnumberInput({
                                                                        ...numberInput,
                                                                        [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value : false,
                                                                    });
                                                                }}
                                                            />
                                                        </div>;
                                            }
                                        case 'checkbox':
                                            return <div className="form-group mt-3">
                                                <label className='text-dark mx-2'>{checkType?.name}</label>
                                                <div className='form-control'>
                                                    <input type="checkbox" name={checkType?.name} className="form-check-input inputtext" 
                                                    defaultChecked={
                                                        isLeaveTypeFilter?.Proportionate_flag == 'Y' ? true : false
                                                    }
                                                        // defaultChecked={
                                                        //     index == 7 ? 
                                                        //     isLeaveTypeFilter?.Proportionate_flag == 'Y' ? true : false :
                                                        //     index == 14 ? 
                                                        //     isLeaveTypeFilter?.Join_Confirm_flag  == 'Y' ? true : false  : 
                                                        //     index == 15 ? 
                                                        //     isLeaveTypeFilter?.Balance_Check_flag == 'Y' ? true : false :
                                                        //     index == 16 ? 
                                                        //     isLeaveTypeFilter?.Meal_flag == 'Y' ? true : false : 
                                                        //     index == 17 ? 
                                                        //     isLeaveTypeFilter?.Encashment_flag == 'Y' ? true : false : 
                                                        //     index == 18 ? 
                                                        //     isLeaveTypeFilter?.Without_pay_flag == 'Y' ? true : false : 
                                                        //     index == 19 ? 
                                                        //     isLeaveTypeFilter?.Medical_Certificate_flag == 'Y' ? true : false : 
                                                        //     index == 21 ? 
                                                        //     isLeaveTypeFilter?.Special_Approval_flag == 'Y' ? true : false :
                                                        //     index == 23 ? 
                                                        //     isLeaveTypeFilter?.married_flag == 'Y' ? true : false :
                                                        //     index == 24 ? 
                                                        //     isLeaveTypeFilter?.Adjustment_flag == 'Y' ? true : false :
                                                        //     index == 27 ? 
                                                        //     isLeaveTypeFilter?.On_Confirm_Flag == 'Y' ? true : false :
                                                        //     index == 28 ? 
                                                        //     isLeaveTypeFilter?.DaysApplyOn == 'Y' ? true : false :
                                                        //     index == 29 ? 
                                                        //     isLeaveTypeFilter?.SandwichFlag == 'Y' ? true : false :
                                                        //     index == 30 ? 
                                                        //     isLeaveTypeFilter?.AttachmentFlag == 'Y' ? true : false :
                                                        //     index == 32 ? 
                                                        //     isLeaveTypeFilter?.HREntryStopFlag == 'Y' ? true : false :
                                                        //     index == 33 ? 
                                                        //     isLeaveTypeFilter?.RepaymentFlag == 'Y' ? true : false :
                                                        //     index == 34 ? 
                                                        //     isLeaveTypeFilter?.GenderFlag == 'Y' ? true : false :
                                                        //     index == 35 ? 
                                                        //     isLeaveTypeFilter?.CompensatoryFlag == 'Y' ? true : false : ""
                                                        // }
                                                        onClick={(e) => {
                                                            const originalString = e.target.name;
                                                            const stringWithoutSpaces = originalString.split(' ').join('_');
                                                            setCheckBoxInput({
                                                                ...checkBoxInput,
                                                                [stringWithoutSpaces]: e.target.checked == true ? "Y" : "N",
                                                            });
                                                        }}
                                                />
                                                    <span className='text-dark mx-2 inputtext'>{checkType?.value}</span>
                                                </div>
                                            </div>;
                                        case 'month':
                                            return <div className="form-group mt-3">
                                                <label className='text-dark'>{checkType?.name}</label>
                                                <input type="Month" name={checkType?.name} className="form-control inputtext"
                                                    onChange={(e) => {
                                                        const originalString = e.target.name;
                                                        const stringWithoutSpaces = originalString.split(' ').join('_');
                                                        setdateInput({
                                                            ...dateInput,
                                                            [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value : false,
                                                        });
                                                    }}
                                                />
                                            </div>;
                                        case 'date':
                                            return <div className="form-group mt-3">
                                                <label className='text-dark'>{checkType?.name}</label>
                                                <input type="date" name={checkType?.name} className="form-control inputtext" 
                                                    defaultValue={
                                                        index == 3 ? isLeaveTypeFilter?.Start_date : 
                                                        index == 4 ? isLeaveTypeFilter?.End_date : ""
                                                    }
                                                    onChange={(e) => {
                                                        const originalString = e.target.name;
                                                        const stringWithoutSpaces = originalString.split(' ').join('_');
                                                        setDateType({
                                                            ...DateType,
                                                            [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value : false,
                                                        });
                                                    }}
                                                />
                                            </div>;
                                        case 'select':
                                            switch (checkType?.name) {
                                                case "Change Probation Month":
                                                    return <div className="form-group mt-3">
                                                        <label className='text-dark'>{checkType?.name}</label>
                                                        <select name={checkType?.name} className='form-select'
                                                        //  required="true"
                                                            onClick={(e) => {
                                                                const originalString = e.target.name;
                                                                const stringWithoutSpaces = originalString.split(' ').join('_');
                                                                setselectTag({
                                                                    ...selectTag,
                                                                    [stringWithoutSpaces]: e.target.value == e.target.value ? e.target.value : false,
                                                                });
                                                            }}
                                                        >
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>

                                                default:
                                                    return null
                                            }

                                        default:
                                            return null
                                    }
                                })}

                            </div>
                            <button
                                type="submit"
                                disabled={btnEnaledAndDisabled}
                                className="mt-3 btn btn-dark"
                            >
                                {loading ? "A moment please..." : "Submit"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EmpListForm