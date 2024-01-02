import React, { useState, useEffect } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import './assets/css/MasterDateLeavers.css'
import * as MASTERACTIVE_ACTIONS from "../store/actions/MasterMaintaince/MasterActive/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { message } from 'antd';
import { Space, Table, Tag, Tooltip } from 'antd';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import baseUrl from '../config.json'





const Employee_List_Active = () => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isEmp_Code, setEmp_Code] = useState('')
    const [Transaction_Date, setTransaction_Date] = useState('')
    const [Emp_name, setEmp_name] = useState('')
    const [Emp_Father_name, setEmp_Father_name] = useState('')
    const [Emp_sex_code, setEmp_sex_code] = useState('')
    const [Emp_marital_status, setEmp_marital_status] = useState('')
    const [Emp_birth_date, setEmp_birth_date] = useState('')
    const [Emp_appointment_date, setEmp_appointment_date] = useState('')
    const [Emp_Confirm_date, setEmp_Confirm_date] = useState('')
    const [Emp_category, setEmp_category] = useState('')
    const [Emp_address_line1, setEmp_address_line1] = useState('')
    const [Emp_address_line2, setEmp_address_line2] = useState('')
    const [Emp_Leave_category, setEmp_Leave_category] = useState('')
    const [Emp_home_tel1, setEmp_home_tel1] = useState('')
    const [Emp_home_tel2, setEmp_home_tel2] = useState('')
    const [Emp_office_tel1, setEmp_office_tel1] = useState('')
    const [Emp_office_tel2, setEmp_office_tel2] = useState('')
    const [Emp_mobile_No, setEmp_mobile_No] = useState('')
    const [Emp_nic_no, setEmp_nic_no] = useState('')
    const [Emp_nic_issue_date, setEmp_nic_issue_date] = useState('')
    const [Emp_nic_expiry_date, setEmp_nic_expiry_date] = useState('')
    const [Emp_retirement_age, setEmp_retirement_age] = useState('')
    const [Emp_ntn_no, setEmp_ntn_no] = useState('')
    const [Emp_email, setEmp_email] = useState('')
    const [Confirmation_Flag, setConfirmation_Flag] = useState('')
    const [Employment_Type_code, setEmployment_Type_code] = useState('')
    const [Desig_code, setDesig_code] = useState('')
    const [Grade_code, setGrade_code] = useState('')
    const [Cost_Centre_code, setCost_Centre_code] = useState('')
    const [Dept_code, setDept_code] = useState('')
    const [Section_code, setSection_code] = useState('')
    const [Shift_code, setShift_code] = useState('')
    const [Loc_code, setLoc_code] = useState('')
    const [Edu_code, setEdu_code] = useState('')
    const [Transport_code, setTransport_code] = useState('')
    const [Supervisor_Code, setSupervisor_Code] = useState('')
    const [Religion_Code, setReligion_Code] = useState('')
    const [Deletion_Flag, setDeletion_Flag] = useState('')
    const [Contact_Person_Name, setContact_Person_Name] = useState('')
    const [Relationship, setRelationship] = useState('')
    const [Contact_address1, setContact_address1] = useState('')
    const [Contact_address2, setContact_address2] = useState('')
    const [Contact_home_tel1, setContact_home_tel1] = useState('')
    const [Contact_home_tel2, setContact_home_tel2] = useState('')
    const [Emp_Blood_Group, setEmp_Blood_Group] = useState('')
    const [Vehicle_Registration_Number, setVehicle_Registration_Number] = useState('')
    const [Emp_Payroll_Category, setEmp_Payroll_Category] = useState('')
    const [Mode_Of_Payment, setMode_Of_Payment] = useState('')
    const [Bank_Account_No1, setBank_Account_No1] = useState('')
    const [Branch_Code1, setBranch_Code1] = useState('')
    const [Bank_Amount_1, setBank_Amount_1] = useState('')
    const [Bank_Percent_1, setBank_Percent_1] = useState('')
    const [Bank_Percent_2, setBank_Percent_2] = useState('')
    const [Bank_Percent_3, setBank_Percent_3] = useState('')
    const [Bank_Account_No2, setBank_Account_No2] = useState('')
    const [Bank_Account_No3, setBank_Account_No3] = useState('')
    const [Bank_Account_No4, setBank_Account_No4] = useState('')
    const [Branch_Code2, setBranch_Code2] = useState('')
    const [Branch_Code3, setBranch_Code3] = useState('')
    const [Branch_Code4, setBranch_Code4] = useState('')
    const [Bank_Amount_2, setBank_Amount_2] = useState('')
    const [Bank_Amount_3, setBank_Amount_3] = useState('')
    const [Bank_Amount_4, setBank_Amount_4] = useState('')
    const [Bank_Percent_4, setBank_Percent_4] = useState('')
    const [SESSI_Flag, setSESSI_Flag] = useState('')
    const [EOBI_Flag, setEOBI_Flag] = useState('')
    const [Union_Flag, setUnion_Flag] = useState('')
    const [Recreation_Club_Flag, setRecreation_Club_Flag] = useState('')
    const [Meal_Deduction_Flag, setMeal_Deduction_Flag] = useState('')
    const [Overtime_Flag, setOvertime_Flag] = useState('')
    const [Incentive_Flag, setIncentive_Flag] = useState('')
    const [Bonus_Type, setBonus_Type] = useState('')
    const [Salary_Hold_Flag, setSalary_Hold_Flag] = useState('')
    const [Salary_Hold_Date, setSalary_Hold_Date] = useState('')
    const [Salary_Hold_Description, setSalary_Hold_Description] = useState('')
    const [Tax_Exemption_Flag, setTax_Exemption_Flag] = useState('')
    const [EOBI_Number, setEOBI_Number] = useState('')
    const [SESSI_Number, setSESSI_Number] = useState('')
    const [ACCOUNT_TYPE1, setACCOUNT_TYPE1] = useState('')
    const [ACCOUNT_TYPE2, setACCOUNT_TYPE2] = useState('')
    const [ACCOUNT_TYPE3, setACCOUNT_TYPE3] = useState('')
    const [ACCOUNT_TYPE4, setACCOUNT_TYPE4] = useState('')
    const [Interest_Flag, setInterest_Flag] = useState('')
    const [Zakat_Flag, setZakat_Flag] = useState('')
    const [PF_Nomination_Flag, setPF_Nomination_Flag] = useState('')
    const [PF_Nomination_Date, setPF_Nomination_Date] = useState('')
    const [car_date, setCar_date] = useState('')
    const [car_value, setCar_value] = useState('')
    const [Bonus_Factor, setBonus_Factor] = useState('')
    // const [Emp_hr_category, setEmp_hr_category] = useState('')
    const [Emp_OldNIC, setEmp_OldNIC] = useState('')
    const [Reffrence_leter_date, setReffrence_leter_date] = useState('')
    const [Emp_id, setEmp_id] = useState('')
    const [Offer_Letter_date, setOffer_Letter_date] = useState('')
    const [Tentative_Joining_date, setTentative_Joining_date] = useState('')
    const [RefferedBy, setRefferedBy] = useState('')
    const [Probationary_period_months, setProbationary_period_months] = useState('')
    const [Notice_period_months, setNotice_period_months] = useState('')
    const [Extended_confirmation_days, setExtended_confirmation_days] = useState('')
    const [Permanent_address, setPermanent_address] = useState('')
    const [Nationality, setNationality] = useState('')
    const [Sub_company_code, setSub_company_code] = useState('')
    const [Roster_group_code, setRoster_group_code] = useState('')
    const [Card_no, setCard_no] = useState('')
    const [Sharia_Flag, setSharia_Flag] = useState('')
    const [Company_Code, setCompany_Code] = useState('')
    const [Old_Emp_code, setOld_Emp_code] = useState('')
    const [Old_Company_Code, setOld_Company_Code] = useState('')
    const [Id, setId] = useState('')
    // const [Payroll_Year, setPayroll_Year] = useState('')
    // const [Payroll_Month, setPayroll_Month] = useState('')
    // const [Leave_Category_name, setLeave_Category_name] = useState('')
    // const [Position_code, setPosition_code] = useState('')
    const [Fuel_Card_Flag, setFuel_Card_Flag] = useState('')
    const [AllSelect, setAllSelect] = useState('')




    const [SelectedData, setSelectedData] = useState('')
    async function GetExcelActive() {
        await fetch(
            `${baseUrl.baseUrl}/allemployee/GetMasterEmployeeDataSelected`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify(
                {
                    "selectedFields": {
                        "Emp_Code": isEmp_Code ? isEmp_Code : AllSelect,
                        "Transaction_Date": Transaction_Date ? Transaction_Date : AllSelect,
                        "Emp_name": Emp_name ? Emp_name : AllSelect,
                        "Emp_Father_name": Emp_Father_name ? Emp_Father_name : AllSelect,
                        "Emp_sex_code": Emp_sex_code ? Emp_sex_code : AllSelect,
                        "Emp_marital_status": Emp_marital_status ? Emp_marital_status : AllSelect,
                        "Emp_birth_date": Emp_birth_date ? Emp_birth_date : AllSelect,
                        "Emp_appointment_date": Emp_appointment_date ? Emp_appointment_date : AllSelect,
                        "Emp_Confirm_date": Emp_Confirm_date ? Emp_Confirm_date : AllSelect,
                        "Emp_category": Emp_category ? Emp_category : AllSelect,
                        "Emp_Leave_category": Emp_Leave_category ? Emp_Leave_category : AllSelect,
                        "Emp_address_line1": Emp_address_line1 ? Emp_address_line1 : AllSelect,
                        "Emp_address_line2": Emp_address_line2 ? Emp_address_line2 : AllSelect,
                        "Emp_home_tel1": Emp_home_tel1 ? Emp_home_tel1 : AllSelect,
                        "Emp_home_tel2": Emp_home_tel2 ? Emp_home_tel2 : AllSelect,
                        "Emp_office_tel1": Emp_office_tel1 ? Emp_office_tel1 : AllSelect,
                        "Emp_office_tel2": Emp_office_tel2 ? Emp_office_tel2 : AllSelect,
                        "Emp_mobile_No": Emp_mobile_No ? Emp_mobile_No : AllSelect,
                        "Emp_nic_no": Emp_nic_no ? Emp_nic_no : AllSelect,
                        "Emp_nic_issue_date": Emp_nic_issue_date ? Emp_nic_issue_date : AllSelect,
                        "Emp_nic_expiry_date": Emp_nic_expiry_date ? Emp_nic_expiry_date : AllSelect,
                        "Emp_retirement_age": Emp_retirement_age ? Emp_retirement_age : AllSelect,
                        "Emp_ntn_no": Emp_ntn_no ? Emp_ntn_no : AllSelect,
                        "Emp_email": Emp_email ? Emp_email : AllSelect,
                        "Confirmation_Flag": Confirmation_Flag ? Confirmation_Flag : AllSelect,
                        "Employment_Type_code": Employment_Type_code ? Employment_Type_code : AllSelect,
                        "Desig_code": Desig_code ? Desig_code : AllSelect,
                        "Grade_code": Grade_code ? Grade_code : AllSelect,
                        "Cost_Centre_code": Cost_Centre_code ? Cost_Centre_code : AllSelect,
                        "Dept_code": Dept_code ? Dept_code : AllSelect,
                        "Section_code": Section_code ? Section_code : AllSelect,
                        "Shift_code": Shift_code ? Shift_code : AllSelect,
                        "Loc_code": Loc_code ? Loc_code : AllSelect,
                        "Edu_code": Edu_code ? Edu_code : AllSelect,
                        "Transport_code": Transport_code ? Transport_code : AllSelect,
                        "Supervisor_Code": Supervisor_Code ? Supervisor_Code : AllSelect,
                        "Religion_Code": Religion_Code ? Religion_Code : AllSelect,
                        "Deletion_Flag": Deletion_Flag ? Deletion_Flag : AllSelect,
                        "Contact_Person_Name": Contact_Person_Name ? Contact_Person_Name : AllSelect,
                        "Relationship": Relationship ? Relationship : AllSelect,
                        "Contact_address1": Contact_address1 ? Contact_address1 : AllSelect,
                        "Contact_address2": Contact_address2 ? Contact_address2 : AllSelect,
                        "Contact_home_tel1": Contact_home_tel1 ? Contact_home_tel1 : AllSelect,
                        "Contact_home_tel2": Contact_home_tel2 ? Contact_home_tel2 : AllSelect,
                        "Emp_Blood_Group": Emp_Blood_Group ? Emp_Blood_Group : AllSelect,
                        "Vehicle_Registration_Number": Vehicle_Registration_Number ? Vehicle_Registration_Number : AllSelect,
                        "Emp_Payroll_Category": Emp_Payroll_Category ? Emp_Payroll_Category : AllSelect,
                        "Mode_Of_Payment": Mode_Of_Payment ? Mode_Of_Payment : AllSelect,
                        "Bank_Account_No1": Bank_Account_No1 ? Bank_Account_No1 : AllSelect,
                        "Branch_Code1": Branch_Code1 ? Branch_Code1 : AllSelect,
                        "Bank_Amount_1": Bank_Amount_1 ? Bank_Amount_1 : AllSelect,
                        "Bank_Percent_1": Bank_Percent_1 ? Bank_Percent_1 : AllSelect,
                        "Bank_Account_No2": Bank_Account_No2 ? Bank_Account_No2 : AllSelect,
                        "Branch_Code2": Branch_Code2 ? Branch_Code2 : AllSelect,
                        "Bank_Amount_2": Bank_Amount_2 ? Bank_Amount_2 : AllSelect,
                        "Bank_Percent_2": Bank_Percent_2 ? Bank_Percent_2 : AllSelect,
                        "Bank_Account_No3": Bank_Account_No3 ? Bank_Account_No3 : AllSelect,
                        "Branch_Code3": Branch_Code3 ? Branch_Code3 : AllSelect,
                        "Bank_Amount_3": Bank_Amount_3 ? Bank_Amount_3 : AllSelect,
                        "Bank_Percent_3": Bank_Percent_3 ? Bank_Percent_3 : AllSelect,
                        "Bank_Account_No4": Bank_Account_No4 ? Bank_Account_No4 : AllSelect,
                        "Branch_Code4": Branch_Code4 ? Branch_Code4 : AllSelect,
                        "Bank_Amount_4": Bank_Amount_4 ? Bank_Amount_4 : AllSelect,
                        "Bank_Percent_4": Bank_Percent_4 ? Bank_Percent_4 : AllSelect,
                        "SESSI_Flag": SESSI_Flag ? SESSI_Flag : AllSelect,
                        "EOBI_Flag": EOBI_Flag ? EOBI_Flag : AllSelect,
                        "Union_Flag": Union_Flag ? Union_Flag : AllSelect,
                        "Recreation_Club_Flag": Recreation_Club_Flag ? Recreation_Club_Flag : AllSelect,
                        "Meal_Deduction_Flag": Meal_Deduction_Flag ? Meal_Deduction_Flag : AllSelect,
                        "Overtime_Flag": Overtime_Flag ? Overtime_Flag : AllSelect,
                        "Incentive_Flag": Incentive_Flag ? Incentive_Flag : AllSelect,
                        "Bonus_Type": Bonus_Type ? Bonus_Type : AllSelect,
                        "Salary_Hold_Flag": Salary_Hold_Flag ? Salary_Hold_Flag : AllSelect,
                        "Salary_Hold_Date": Salary_Hold_Date ? Salary_Hold_Date : AllSelect,
                        "Salary_Hold_Description": Salary_Hold_Description ? Salary_Hold_Description : AllSelect,
                        "Tax_Exemption_Flag": Tax_Exemption_Flag ? Tax_Exemption_Flag : AllSelect,
                        "EOBI_Number": EOBI_Number ? EOBI_Number : AllSelect,
                        "SESSI_Number": SESSI_Number ? SESSI_Number : AllSelect,
                        "ACCOUNT_TYPE1": ACCOUNT_TYPE1 ? ACCOUNT_TYPE1 : AllSelect,
                        "ACCOUNT_TYPE2": ACCOUNT_TYPE2 ? ACCOUNT_TYPE2 : AllSelect,
                        "ACCOUNT_TYPE3": ACCOUNT_TYPE3 ? ACCOUNT_TYPE3 : AllSelect,
                        "ACCOUNT_TYPE4": ACCOUNT_TYPE4 ? ACCOUNT_TYPE4 : AllSelect,
                        "Interest_Flag": Interest_Flag ? Interest_Flag : AllSelect,
                        "Zakat_Flag": Zakat_Flag ? Zakat_Flag : AllSelect,
                        "PF_Nomination_Flag": PF_Nomination_Flag ? PF_Nomination_Flag : AllSelect,
                        "PF_Nomination_Date": PF_Nomination_Date ? PF_Nomination_Date : AllSelect,
                        "car_date": car_date ? car_date : AllSelect,
                        "car_value": car_value ? car_value : AllSelect,
                        "Bonus_Factor": Bonus_Factor ? Bonus_Factor : AllSelect,
                        "Fuel_Card_Flag": Fuel_Card_Flag ? Fuel_Card_Flag : AllSelect,
                        "Picture_image": "N",
                        // "emp_hr_category": Emp_hr_category ? Emp_hr_category : AllSelect,
                        "Emp_OldNIC": Emp_OldNIC ? Emp_OldNIC : AllSelect,
                        "reffrence_leter_date": Reffrence_leter_date ? Reffrence_leter_date : AllSelect,
                        "Emp_id": Emp_id ? Emp_id : AllSelect,
                        "Offer_Letter_date": Offer_Letter_date ? Offer_Letter_date : AllSelect,
                        "Tentative_Joining_date": Tentative_Joining_date ? Tentative_Joining_date : AllSelect,
                        "RefferedBy": RefferedBy ? RefferedBy : AllSelect,
                        "Probationary_period_months": Probationary_period_months ? Probationary_period_months : AllSelect,
                        "Notice_period_months": Notice_period_months ? Notice_period_months : AllSelect,
                        "Extended_confirmation_days": Extended_confirmation_days ? Extended_confirmation_days : AllSelect,
                        "Permanent_address": Permanent_address ? Permanent_address : AllSelect,
                        "Nationality": Nationality ? Nationality : AllSelect,
                        "sub_company_code": Sub_company_code ? Sub_company_code : AllSelect,
                        "roster_group_code": Roster_group_code ? Roster_group_code : AllSelect,
                        "card_no": Card_no ? Card_no : AllSelect,
                        "Sharia_Flag": Sharia_Flag ? Sharia_Flag : AllSelect,
                        "Company_Code": Company_Code ? Company_Code : AllSelect,
                        "Old_Emp_code": Old_Emp_code ? Old_Emp_code : AllSelect,
                        "Old_Company_Code": Old_Company_Code ? Old_Company_Code : AllSelect,
                        "id": Id ? Id : AllSelect,
                        // "Payroll_Year": Payroll_Year ? Payroll_Year : AllSelect,
                        // "Payroll_Month": Payroll_Month ? Payroll_Month : AllSelect,
                        // "Leave_Category_name": Leave_Category_name ? Leave_Category_name : AllSelect,
                        // "position_code": Position_code ? Position_code : AllSelect,
                    }
                }
            ),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {

            if (response.success) {
                setSelectedData(response.data)
                DownloadExcel(response.data)
                messageApi.open({
                    type: 'success',
                    content: "You have successfully Download",
                });

            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }


    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';

    const DownloadExcel = async (hjh) => {
        const ws = XLSX.utils.json_to_sheet(hjh);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "data" + fileExtension);
    }

    return (
        <>
            <div>
                <Header />
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        <>
                            <div className="MasterActiveFlexBox">
                                <h4 className="text-dark">Master Data Active</h4>
                                <div className="MasterActivesearchBox">
                                    <Button title="EXPORT EXCEL" onClick={GetExcelActive} />
                                </div>
                            </div>
                            <hr />
                        </>

                        <div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="" value="Y" onChange={(e) => setAllSelect(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Select All</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex">
                                <div className="col-md-2">
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setTransaction_Date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Transaction Date</label>
                                    </div>

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_name(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Name</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Father_name(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Father Name</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_sex_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Gender</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_marital_status(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Marital Status</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_birth_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Date OF Birth</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_appointment_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Appointment Date</label>
                                    </div>

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Confirm_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Confirmation Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setConfirmation_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Confirmation Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_category(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Category</label>
                                    </div>
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setConfi(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Confirmation Extended</label>
                                    </div> */}
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_address_line1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Address Line1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_address_line2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Address Line2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_home_tel1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Home tel1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_home_tel2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Home tel2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_office_tel1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Office tel</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_office_tel2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Office tel2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_mobile_No(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Mobile No</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_nic_no(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Cnic NO</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_retirement_age(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Retirement Age</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_ntn_no(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">NTN No</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_nic_issue_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">CNIC Issue Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_nic_expiry_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">CNIC Expiry Date</label>
                                    </div>

                                </div>
                                <div className="col-md-2">

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_email(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Email Address</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmployment_Type_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employement Type Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setDesig_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Desination Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setCost_Centre_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">CostCenter Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setGrade_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Grade Code</label>
                                    </div>

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSection_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Section Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setDept_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Department Code</label>
                                    </div>
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" onChange={(e) => set(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Division Code</label>
                                    </div> */}
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setShift_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Shift Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setLoc_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Location Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setTransport_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Transport Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEdu_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Education Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSupervisor_Code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Supervisor Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setReligion_Code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Religion Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setDeletion_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Deletion Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setContact_Person_Name(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Contact Person Name</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setRelationship(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Relationship</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setContact_address1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Contact Address1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setContact_address2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Contact Address2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setContact_home_tel1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Contact Home tel1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setContact_home_tel2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Contact Home  tel2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Blood_Group(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Blood group</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setVehicle_Registration_Number(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Vehicle Registration</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Payroll_Category(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Payroll Cat Name</label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setMode_Of_Payment(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Mode Of payment</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Amount_1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bank Amount No1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBranch_Code1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch Code1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Percent_1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch percent1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Amount_2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bank Amount 2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBranch_Code2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch Code2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Percent_2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch percent2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Amount_3(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bank Account No3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBranch_Code3(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch Code3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Percent_3(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch percent3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Amount_4(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bank Amount No4</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBranch_Code4(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch Code4</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Percent_4(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Branch percent4</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSESSI_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">SESSI Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEOBI_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">EOBIFlag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setUnion_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">UNION Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setRecreation_Club_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">ReCreation Club Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setMeal_Deduction_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Meal Deduction Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setOvertime_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Over Time Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setIncentive_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Incentive Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBonus_Type(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bonus Type</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSalary_Hold_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Salary Hold Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSalary_Hold_Date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Salary Hold Date</label>
                                    </div>

                                </div>
                                <div className="col-md-2">

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSalary_Hold_Description(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Salary Hold Description</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setTax_Exemption_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Tax Exemption Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEOBI_Number(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">EOBI No.</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSESSI_Number(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">SESSI No.</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setACCOUNT_TYPE1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account Type1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setACCOUNT_TYPE2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account Type2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setACCOUNT_TYPE3(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account Type3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setACCOUNT_TYPE4(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account Type3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Account_No1(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account No.1</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Account_No2(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account No.2</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Account_No3(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account No.3</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBank_Account_No4(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Account No.4</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setInterest_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Interest Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setZakat_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Zakat Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPF_Nomination_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">PF Nomination Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPF_Nomination_Date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">PF Nomination Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setCar_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Car Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setCar_value(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Car Value</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setBonus_Factor(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Bonus Factor</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setFuel_Card_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Fuel Card Flag</label>
                                    </div>

                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_hr_category(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Hr Cat</label>
                                    </div> */}
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setOffer_Letter_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Offer Letter Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setTentative_Joining_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Tentative Joining Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setRefferedBy(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Reffered by</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setProbationary_period_months(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Probation month </label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setNotice_period_months(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Notice Month</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setExtended_confirmation_days(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Extended Confirmation Days</label>
                                    </div>
                                </div>
                                <div className="col-md-3">


                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPermanent_address(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Permanent Address</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setNationality(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Nationality</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSub_company_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Sub Company Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setRoster_group_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Roster Group Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setCard_no(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Card No</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setSharia_Flag(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Sharia Flag</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setCompany_Code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Company Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setOld_Company_Code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Old Company Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setOld_Emp_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Old Employee Code</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setId(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Id</label>
                                    </div>
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPayroll_Year(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Payroll Year</label>
                                    </div> */}
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPayroll_Month(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Payroll Month</label>
                                    </div> */}
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setLeave_Category_name(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Leave Cat Name</label>
                                    </div> */}

                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_Leave_category(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Leave Category</label>
                                    </div>
                                    {/* <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setPosition_code(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Positon</label>
                                    </div> */}
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setReffrence_leter_date(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Refference Letter Date</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_OldNIC(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Old NIC</label>
                                    </div>
                                    <div className="form-group MasterChecklist d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input" name="" id="All" value="Y" onChange={(e) => setEmp_id(e.target.checked ? "Y" : "N")} />
                                        <label htmlFor="">Employee Id</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}


export default Employee_List_Active