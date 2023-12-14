import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import '../../src/Assets/css/main.css'
import { Login } from '../LoginScreens/Login';
import Dashboard from '../dashboard/dashboard';
import Appointment from '../TransactionAppointment/Appointment';
import TAPersonalform from '../TransactionAppointForm/TAPersonalform';
import TAEducationForm from '../TransactionAppointForm/TAEducationForm';
import TAExprienceForm from '../TransactionAppointForm/TAExprienceForm';
import TASalaryForm from '../TransactionAppointForm/TASalaryForm';
import TAppointmentMasterPayroll from '../TransactionAppointForm/TAppointmentMasterPayroll';
import TACheckList from '../TransactionAppointForm/TACheckList'
import TAFamilyForm from '../TransactionAppointForm/TAFamilyForm';
import TAShortsCut from '../TransactionAppointForm/TAShortsCut'
import Employment_Type from '../HrOperations/Employment_Type';
import Divisions from '../HrOperations/Divisions'
import Departments from '../HrOperations/Departments';
import EmpListForm from '../HrOperations/form/EmpListForm'
import Sections from "../HrOperations/Sections";
import Cost_Centre from "../HrOperations/Cost_Centre";
import Education_Levels from "../HrOperations/Education_Levels";
import Employee_Category from "../HrOperations/Employee_Category";
import Country from "../HrOperations/Country";
import Grade from "../HrOperations/Grade";
import Education from '../HrOperations/Education';
import Designation from '../HrOperations/Designation';
import Leave_Category from '../HrOperations/Leave_Category'
import Leave_Types from '../HrOperations/Leave_Types'
import Previous_Employers from '../HrOperations/Previous_Employers'
import Transportation from '../HrOperations/Transportation'
import Institution from '../HrOperations/Institution';
import LateArrival from '../HrOperations/LateArrival'
import GenerateLateArrival from '../HrOperations/GanerateLateArrival'
import Resignation from '../HrOperations/Resignation';
import Religion from '../HrOperations/Religion';
import Locations from '../HrOperations/Locations';
import MasterData_Sec from '../Master_Maintaince/MasterData_Sec'
import MasterData_Leaves from '../Master_Maintaince/MasterData_Leaves';
import MasterPersonal from '../Master_Maintaince/MasterPersonal'
import Confirmation from '../Master_Maintaince/Confirmation';
import Confirmation_Extensio from '../Master_Maintaince/Confirmation_Extensio';
import Increment from '../Master_Maintaince/Increment'
import Get_Attendance from '../Attendance/Get_Attendance'
import Attendance_Check from '../Attendance/Attendance_Check'
import Manual_Leave_Deletio from '../Master_Maintaince/Manual_Leave_Deletio';
import Promotion from '../Master_Maintaince/Promotion'
import Holidays from '../HrOperations/Holidays'
import Leave_Applications from '../LeavesModule/Leave_Applications'
import Transaction_Leave from '../LeavesModule/Transaction_Leave';
import Leave_Year_End from '../LeavesModule/Leave_Year_End'
import Leave_Report_Detail from '../LeavesModule/Leave_Report_Detail';
import Transaction_confirmation_form from '../Master_Maintaince/form/Confirmationform';
import Leave_Report_Balance from '../LeavesModule/Leave_Report_Balance';
import Leave_Balance_Upload from '../LeavesModule/Leave_Balance_Upload';
import Manual_leave_posting from '../LeavesModule/Manual_leave_posting'
import Transaction_Education_form from '../Master_Maintaince/form/Transaction_Education';
import LeaveSummary from '../LeavesModule/components/LeaveSummary';
import Transaction_Increment_form from '../Master_Maintaince/form/Transaction_Increment_form';
import Transaction_Promotion from '../Master_Maintaince/form/Transaction_Promotion';
import FormWaitingTranConfiramtion from '../Master_Maintaince/components/FormWaitingTranConfiramtion';
import ConfirmationExtension from '../Master_Maintaince/form/ConfirmationExtension';
import ConfirmExtensionWaitingProcess from '../Master_Maintaince/components/ConfirmExtensionWaitingProcess';
import Transaction_Resignation from '../Master_Maintaince/Transaction_Resignation';
import Transation_Resignation_Form from '../Master_Maintaince/form/Transation_Resignation_Form';
import ProccessIncrement from '../Master_Maintaince/components/ProccessIncrement';
import Transaction_Resignation_process from '../Master_Maintaince/components/Transaction_Resignation_process';
import PromotionWaitingForm from '../Master_Maintaince/components/PromotionWaitingForm';
import Transaction_Experience from '../Master_Maintaince/Transaction_Experience';
import Transaction_Marriage from '../Master_Maintaince/Transaction_Marriage';
import Transaction_Education from '../Master_Maintaince/Transaction_Education';
import Family from '../Master_Maintaince/Family'
import TransactionFamilyForm from '../Master_Maintaince/form/TransactionFamilyForm'
import Base_City from '../HrOperations/Base_City'
import RefreshableData from '../HrOperations/RefreshableData'
import Positions from '../HrOperations/Positions'
import Download_Parameter_Access from '../HrOperations/Download_Parameter_Access';
import OneTimeAllowance from '../payroll/pages/transactionPosting/oneTimeAllowance/oneTimeAllowances'
import FixedAllowance from '../payroll/pages/transactionPosting/fixedAllowance/fixedAllowances'
import CashAllowance from '../payroll/pages/transactionPosting/cashAllowance/cashAllowances'
import ConfirmationReport from '../payroll/pages/report/rdlcReport/rdlcReport'
import OneTimeDeduction from '../payroll/pages/transactionPosting/oneTimeDeduction/oneTimeDeduction'
import FixedDeduction from '../payroll/pages/transactionPosting/fixedDeduction/fixedDeduction'
import AdvanceSalary from '../payroll/pages/transactionPosting/advanceSalary/advanceSalary'
import AdvanceSalaryInstallment from '../payroll/pages/transactionPosting/advanceSalaryInstallment/advanceSalaryInstallment'
import SalaryHold from '../payroll/pages/transactionPosting/salaryHold/salaryHold'
import PayrollUpload from '../payroll/pages/transactionPosting/payrollUpload/payRollUpload'
import HrStop from '../payroll/pages/transactionPosting/hrStop/hrStop'
import HrRelease from '../payroll/pages/transactionPosting/hrRelease/hrRelease'
import ClosingPayrollMonth from '../payroll/pages/transactionPosting/closingPayrollmonth/closingPayrollmonth'
import UndoPayrollCalculation from '../payroll/pages/transactionPosting/undoPayrollCalculation/undoPayrollCalculation'
import AddLoans from '../payroll/pages/transactionPosting/addLoans/addLoans'
import AddAllowance from '../payroll/pages/transactionPosting/addAllowance/addAllowance'
import AddDeduction from '../payroll/pages/transactionPosting/addDeduction/addDeduction'
import AddPayroll from '../payroll/pages/transactionPosting/addPayroll/addPayroll'
import AddPayrollMethod from '../payroll/pages/transactionPosting/payrollMethod/addpayrollMethod'
import AddPayrollMethodPdf from '../payroll/pages/transactionPosting/pdfRender/index'
import Earnings from '../Master_Maintaince/Earnings';
import PaySlip from '../payroll/pages/PaySlip';
import TaxReport from '../payroll/pages/transactionPosting/taxReport/taxReport';
import JV_Code from '../payroll/pages/Setup/JV_Code/index'
import Income_Tax from '../payroll/pages/Setup/Income_Tax/index'
import Bank_Branches from '../payroll/pages/Setup/Bank_Branches/index'
import Payroll_Master from '../payroll/pages/masterMaintaince/Payroll_Master';
import TaxStructure from '../payroll/pages/Setup/TaxStructure'
import Bank from '../payroll/pages/Setup/Bank'
import OutstandingRecoveries from '../payroll/pages/Setup/OutstandingRecoveries'
import FLow from '../DesignationsFlow/ChartFlow'
import PayrollCategoryAccess from '../payroll/pages/Setup/PayrollCategoryAccess'
import Change_Password from '../Addministration/pages/Change_Password'
import Due_For_Confirmation from '../HrOperations/Due_For_Confirmation';
import NewAppointmentReport from '../HrOperations/New_Appointment_Report.js'
import TAEducationForm2 from '../TransactionAppointForm/TAEducationForm2.js'
import TASalaryForm2 from '../TransactionAppointForm/TASalaryForm2.js'
import TAExperienceForm2 from '../TransactionAppointForm/TAExperienceForm2.js'
import TAappointmentMasterPayrollForm2 from '../TransactionAppointForm/TAappointmentMasterPayrollForm2.js'
import TAFamilyForm2 from '../TransactionAppointForm/TAFamilyForm2.js'
import TACheckListForm2 from '../TransactionAppointForm/TACheckListForm2.js'
// import NewAppointmentReport from '../HrOperations/New_Appointment_Report.js'
import NotFound from '../Error_Pages';
import Access_Control from '../Addministration/pages/Access_Control'
import Forgetpassword from '../LoginScreens/ForgetPassword/forgetpassword';
import VerifyOTP from '../LoginScreens/ForgetPassword/verifyOtp';
import Updatepassword from '../LoginScreens/ForgetPassword/Updatepassword';
import ConfirmatioWaiting from '../Master_Maintaince/Waiting/ConfirmatioWaiting'



const routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        {/* 
        {
            localStorage.getItem('access_token') !== undefined &&
            localStorage.getItem('access_token') !== null &&
            localStorage.getItem('access_token') !== "" ?
            <> */}
        {/*==================Forget Password============*/}
        <Route path="/Forgetpassword" element={<Forgetpassword />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/Updatepassword" element={<Updatepassword />} />
        {/*==================Forget Password End============*/}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/TAPersonalform" element={<TAPersonalform />} />
        <Route path="/TAEducationForm" element={<TAEducationForm />} />
        <Route path="/TAExprienceForm" element={<TAExprienceForm />} />
        <Route path="/TASalaryForm" element={<TASalaryForm />} />
        <Route path="/TAppointmentMasterPayroll" element={<TAppointmentMasterPayroll />} />
        <Route path="/TACheckList" element={<TACheckList />} />
        <Route path="/TAFamilyForm" element={<TAFamilyForm />} />
        <Route path="/TAShortsCut" element={<TAShortsCut />} />
        <Route path="/Employment_Type" element={<Employment_Type />} />
        <Route path="/Divisions" element={<Divisions />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/EmpListForm" element={<EmpListForm />} />
        <Route path="/Sections" element={<Sections />} />
        <Route path="/Cost_Centre" element={<Cost_Centre />} />
        <Route path="/Education_Levels" element={<Education_Levels />} />
        <Route path="/Employee_Category" element={<Employee_Category />} />
        <Route path="/Country" element={<Country />} />
        <Route path="/Grade" element={<Grade />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Designation" element={<Designation />} />
        <Route path="/Leave_Category" element={<Leave_Category />} />
        <Route path="/Leave_Types" element={<Leave_Types />} />
        <Route path="/Previous_Employers" element={<Previous_Employers />} />
        <Route path="/Transportation" element={<Transportation />} />
        <Route path="/Institution" element={<Institution />} />
        <Route path="/LateArrival" element={<LateArrival />} />
        <Route path="/GenerateLateArrival" element={<GenerateLateArrival />} />
        <Route path="/Resignation" element={<Resignation />} />
        <Route path="/Religion" element={<Religion />} />
        <Route path="/Locations" element={<Locations />} />
        <Route path="/MasterData_Sec" element={<MasterData_Sec />} />
        <Route path="/MasterData_Leaves" element={<MasterData_Leaves />} />
        <Route path="/MasterPersonal" element={<MasterPersonal />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/Increment" element={<Increment />} />
        <Route path="/Get_Attendance" element={<Get_Attendance />} />
        <Route path="/Attendance_Check" element={<Attendance_Check />} />
        <Route path="/Confirmation_Extensio" element={<Confirmation_Extensio />} />
        <Route path="/Manual_Leave_Deletio" element={<Manual_Leave_Deletio />} />
        <Route path="/Promotion" element={<Promotion />} />
        <Route path="/Holidays" element={<Holidays />} />
        <Route path="/Leave_Applications" element={<Leave_Applications />} />
        <Route path="/Transaction_Leave" element={<Transaction_Leave />} />
        <Route path="/Transaction_Education_form" element={<Transaction_Education_form />} />
        <Route path="/Leave_Year_End" element={<Leave_Year_End />} />
        <Route path="/Leave_Report_Detail" element={<Leave_Report_Detail />} />
        <Route path="/Leave_Report_Balance" element={<Leave_Report_Balance />} />
        <Route path="/Leave_Balance_Upload" element={<Leave_Balance_Upload />} />
        <Route path="/Manual_leave_posting" element={<Manual_leave_posting />} />
        <Route path="/LeaveSummary" element={<LeaveSummary />} />
        <Route path="/Transaction_confirmation_form" element={<Transaction_confirmation_form />} />
        <Route path="/ConfirmatioWaiting" element={<ConfirmatioWaiting />} />
        <Route path="/Transaction_Increment_form" element={<Transaction_Increment_form />} />
        <Route path="/ConfirmationExtension" element={<ConfirmationExtension />} />
        <Route path="/ConfirmExtensionWaitingProcess" element={<ConfirmExtensionWaitingProcess />} />
        <Route path="/Transaction_Promotion" element={<Transaction_Promotion />} />
        <Route path="/Transaction_Resignation" element={<Transaction_Resignation />} />
        <Route path="/Transation_Resignation_Form" element={<Transation_Resignation_Form />} />
        <Route path="/ProccessIncrement" element={<ProccessIncrement />} />
        <Route path="/Transaction_Resignation_process" element={<Transaction_Resignation_process />} />
        <Route path="/PromotionWaitingForm" element={<PromotionWaitingForm />} />
        <Route path="/Transaction_Eduction" element={<Transaction_Education />} />
        <Route path="/Transaction_Experience" element={<Transaction_Experience />} />
        <Route path="/Transaction_Marriage" element={<Transaction_Marriage />} />
        <Route path="/Family" element={<Family />} />
        <Route path="/TransactionFamilyForm" element={<TransactionFamilyForm />} />
        <Route path="/Base_City" element={<Base_City />} />
        <Route path="/RefreshableData" element={<RefreshableData />} />
        <Route path="/Positions" element={<Positions />} />
        <Route path="/Download_Parameter_Access" element={<Download_Parameter_Access />} />
        {/* payroll */}
        <Route path="/payroll/oneTimeAllowance" element={<OneTimeAllowance />} />
        <Route path="/payroll/FixedAllowance" element={<FixedAllowance />} />
        <Route path="/payroll/CashAllowance" element={<CashAllowance />} />
        <Route path="/payroll/oneTimeDeduction" element={<OneTimeDeduction />} />
        <Route path="/payroll/fixedDeduction" element={<FixedDeduction />} />
        <Route path="/payroll/advancesalary" element={<AdvanceSalary />} />
        <Route path="/payroll/advanceSalaryInstallment" element={<AdvanceSalaryInstallment />} />
        <Route path="/payroll/salaryHold" element={<SalaryHold />} />
        <Route path="/payroll/payrollUpload" element={<PayrollUpload />} />
        <Route path="/payroll/hrStop" element={<HrStop />} />
        <Route path="/payroll/hrRelease" element={<HrRelease />} />
        <Route path="/payroll/undoPayrollCalculation" element={<UndoPayrollCalculation />} />
        <Route path="/payroll/closingPayrollMonth" element={<ClosingPayrollMonth />} />
        <Route path="/payroll/addLoans" element={<AddLoans />} />
        <Route path="/payroll/addallowance" element={<AddAllowance />} />
        <Route path="/payroll/addDeduction" element={<AddDeduction />} />
        <Route path="/payroll/addPayroll" element={<AddPayroll />} />
        <Route path="/payroll/addPayrollMethod" element={<AddPayrollMethod />} />
        <Route path="/payroll/report/attendanceReport" element={<AddPayrollMethodPdf />} />
        <Route path="/payroll/report/taxReport" element={<TaxReport />} />
        <Route path="/Earnings" element={<Earnings />} />
        <Route path="/JV_Codes" element={<JV_Code />} />
        <Route path="IncomeTax_Columns" element={<Income_Tax />} />
        <Route path="Bank_Branches" element={<Bank_Branches />} />
        <Route path="/Earnings" element={<Earnings />} />
        <Route path="/Payroll_Master" element={<Payroll_Master />} />
        <Route path="/Tax_Structure" element={<TaxStructure />} />
        <Route path="/Bank" element={<Bank />} />
        <Route path="/Outstanding_Recoveries" element={<OutstandingRecoveries />} />
        <Route path='/Payroll_Catery_Access' element={<PayrollCategoryAccess />} />
        <Route path='/New_Appointment_Report' element={<NewAppointmentReport />} />
        <Route path='/Due_For_Confirmation' element={<Due_For_Confirmation />} />
        
        {/* REPORT =============================================================== */}
        <Route path="/report/ConfirmationReport" element={<ConfirmationReport />} />
        {/* PAY SLIP ============================================================== */}
        <Route path="/Pay/PaySlip" element={<PaySlip />} />
        {/* ORG CHART ========================================= */}
        <Route path="flow/DesignationsFlowChart" element={<FLow />} />
        {/* ADDMINISTRATION ---> USER PROFILE =============================================================== */}
        <Route path="/Change_Password" element={<Change_Password />} />
        {/* HR OPERATIONS ---> TA EDUCATION FORM 2 =============================================================== */}
        <Route path="/TAEducationForm2" element={<TAEducationForm2 />} />
        {/* HR OPERATIONS ---> TA Salary FORM 2 =============================================================== */}
        <Route path="/TASalaryForm2" element={<TASalaryForm2 />} />
        {/* HR OPERATIONS ---> TA Experience FORM 2 =============================================================== */}
        <Route path="/TAExperienceForm2" element={<TAExperienceForm2 />} />
        {/* HR OPERATIONS ---> TA Appointment Master Payroll FORM 2 =============================================================== */}
        <Route path="/TAappointmentMasterPayrollForm2" element={<TAappointmentMasterPayrollForm2 />} />
        {/* HR OPERATIONS ---> TA Appointment Family FORM 2 =============================================================== */}
        <Route path="/TAFamilyForm2" element={< TAFamilyForm2 />} />
        {/* HR OPERATIONS ---> TA Appointment Check List FORM 2 =============================================================== */}
        <Route path="/TACheckListForm2" element={<TACheckListForm2 />} />
        {/* ADDMINISTRATION ---> Access Control =============================================================== */}
        <Route path="/Access_Control" element={<Access_Control />} />
        {/* ERRORS PAGE ============================ */}
        <Route path="NotFound/404" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        {/* </> :  */}
        {/* } */}
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* localStorage.getItem('access_token') !== undefined ||
            localStorage.getItem('access_token') !== null ||
            localStorage.getItem('access_token') !== "" || 
            !localStorage.getItem('access_token') ? 
            <Route path="/" element={<Login />} />  */}



        {/*new Appoint -----*/}
        
        {/*new Appoint -----*/}
      </Routes>
    </Router>

  );
}

export default routing