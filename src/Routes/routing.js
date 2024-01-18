import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../../src/Assets/css/bootstrap.css";
import '../../src/Assets/css/main.css'
import Login from '../LoginScreens/Login';
import Dashboard from '../dashboard/dashboard';
import Appointment from '../TransactionAppointment/Appointment';
import TAPersonalform from '../TransactionAppointForm/TAPersonalform';
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
import Employee_List_Active from '../Master_Maintaince/Employee_List_Active'
import Employee_List_InActive from '../Master_Maintaince/Employee_List_InActive';
import Employee_Master from '../Master_Maintaince/Employee_Master'
import Confirmation from '../Master_Maintaince/Confirmation';
import ConfirmationWaiting from '../Master_Maintaince/Waiting/ConfirmatioWaiting.js';
import Increment from '../Master_Maintaince/components/Increment.js'
import Get_Attendance from '../Attendance/Get_Attendance'
import Attendance_Check from '../Attendance/Attendance_Check'
import Manual_Leave_Deletio from '../Master_Maintaince/Manual_Leave_Deletio';
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
import Transaction_Promotion from '../Master_Maintaince/form/Transaction_Promotion';
import Transaction_Resignation from '../Master_Maintaince/Transaction_Resignation';
import IncrementFormProcessing from '../Master_Maintaince/components/IncrementFormProcessing';
import Transation_Resignation_Process from '../Master_Maintaince/form/Transation_Resignation_Process.js';
import ProccessIncrement from '../Master_Maintaince/components/Increment.js';
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
import Earning_Master from '../Master_Maintaince/Earning_Master';
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
import NewAppointmentReport from '../HrOperations/New_Appointment_Report'
import TAExperienceForm from '../TransactionAppointForm/TAExperienceForm.js'
import TAFamilyForm from '../TransactionAppointForm/TAFamilyForm.js'
import TACheckListForm from '../TransactionAppointForm/TACheckListForm.js'
import NotFound from '../Error_Pages';
import Access_Control from '../Addministration/pages/Access_Control'
import Forgetpassword from '../LoginScreens/ForgetPassword/forgetpassword';
import VerifyOTP from '../LoginScreens/ForgetPassword/verifyOtp';
import Updatepassword from '../LoginScreens/ForgetPassword/Updatepassword';
import ConfirmatioWaiting from '../Master_Maintaince/Waiting/ConfirmatioWaiting'
import SalaryOnHold from '../payroll/pages/Reports/SalaryOnHold';
import RetirementDueReport from '../HrOperations/Retirement_Due_Report.js'
import ServiceLengthReport from '../HrOperations/ServiceLengthReport.js'
import TranEducationReport from '../HrOperations/TranEducationReport.js'
import Employee_Experience_Report from '../HrOperations/Employee_Experience_Report.js'
import RetirementSeparationReport from '../HrOperations/RetirementSeparationReport.js'
import Date_Of_Birth_Inquiry_Report from '../HrOperations/Date_Of_Birth_Inquiry_Report.js'
import OfferLeter from '../TransactionAppointment/AppointmentLetter/index.js'
import ManualAttendance from '../ManualAttendance/ManualAttendance.js';
import ManualAttendHistory from '../ManualAttendance/ManualAttendHistory.js';
import Due_For_Confirmation from '../HrOperations/Due_For_Confirmation.js'
import Bank_Letter_Report from '../payroll/pages/Bank_Letter_Report.js'
import Promotion from '../Master_Maintaince/Promotion.js';
import Paysheet_Report from '../payroll/pages/Paysheet_Report.js'
import Confirmation_Extension from '../Master_Maintaince/components/Confirmation_Extension.js'
import ConfirmExtensionFormProcessing from '../Master_Maintaince/components/ConfirmExtensionFormProcessing.js';
import PaySlip_Employee_Wise from '../payroll/pages/PaySlip_Employee_Wise.js'
import PaySlip_Employee_WiseForm from '../payroll/form/transactionPosting/PaySlip_Employee_WiseForm.js'

const routing = () => {
  return (
    <Router>
      <Routes>
        {
            localStorage.getItem('access_token') !== undefined &&
            localStorage.getItem('access_token') !== null &&
            localStorage.getItem('access_token') !== "" ?
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/TAPersonalform" element={<TAPersonalform />} />
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
              <Route path="/Late_Arrival" element={<GenerateLateArrival />} />
              <Route path="/Resignation" element={<Resignation />} />
              <Route path="/Religion" element={<Religion />} />
              <Route path="/Locations" element={<Locations />} />
              <Route path="/Employee_List_Active" element={<Employee_List_Active />} />
              <Route path="/Employee_List_InActive" element={<Employee_List_InActive />} />
              <Route path="/Employee_Master" element={<Employee_Master />} />
              <Route path="/Confirmation" element={<Confirmation />} />
              <Route path="/ConfirmationWaiting" element={<ConfirmationWaiting />} />
              <Route path="/Increment" element={<Increment />} />
              <Route path="/Get_Attendance" element={<Get_Attendance />} />
              <Route path="/Attendance_Check" element={<Attendance_Check />} />
              <Route path="/Manual_Leave_Deletio" element={<Manual_Leave_Deletio />} />
              <Route path="/Holidays" element={<Holidays />} />
              <Route path="/Leave_Applications" element={<Leave_Applications />} />
              <Route path="/Transaction_Leave" element={<Transaction_Leave />} />
              <Route path="/Transaction_Education_form" element={<Transaction_Education_form />} />
              <Route path="/Leave_Year_End" element={<Leave_Year_End />} /> {/*check*/}
              <Route path="/Leave_Report_Detail" element={<Leave_Report_Detail />} />
              <Route path="/Leave_Report_Balance" element={<Leave_Report_Balance />} />
              <Route path="/Leave_Balance_Upload" element={<Leave_Balance_Upload />} />
              <Route path="/Manual_leave_posting" element={<Manual_leave_posting />} />
              <Route path="/LeaveSummary" element={<LeaveSummary />} />
              <Route path="/Transaction_confirmation_form" element={<Transaction_confirmation_form />} />
              <Route path="/ConfirmatioWaiting" element={<ConfirmatioWaiting />} />
              <Route path="/Transaction_Promotion" element={<Transaction_Promotion />} />
              <Route path="/Transaction_Resignation" element={<Transaction_Resignation />} />
              <Route path="IncrementFormProcessing" element={<IncrementFormProcessing />} />
              <Route path="/Transation_Resignation_Process" element={<Transation_Resignation_Process />} />
              <Route path="/ProccessIncrement" element={<ProccessIncrement />} />
              <Route path="/Transaction_Eduction" element={<Transaction_Education />} />
              <Route path="/Transaction_Experience" element={<Transaction_Experience />} />
              <Route path="/Transaction_Marriage" element={<Transaction_Marriage />} />
              <Route path="/Family" element={<Family />} />
              <Route path="/TransactionFamilyForm" element={<TransactionFamilyForm />} />
              <Route path="/Base_City" element={<Base_City />} />
              <Route path="/RefreshableData" element={<RefreshableData />} />
              <Route path="/Positions" element={<Positions />} />
              <Route path="/Download_Parameter_Access" element={<Download_Parameter_Access />} />
              <Route path='/New_Appointment_Report' element={<NewAppointmentReport />} />
              <Route path='/Retirement_Due_Report' element={<RetirementDueReport />} />
              <Route path='/Due_For_Confirmation' element={<Due_For_Confirmation />} />
              <Route path='/ServiceLengthReport' element={<ServiceLengthReport />} />
              <Route path='/TranEducationReport' element={<TranEducationReport />} />
              <Route path='/Service_Length_Report' element={<ServiceLengthReport />} />
              <Route path='/Employee_Education_Report' element={<TranEducationReport />} />
              <Route path='/Employee_Experience_Report' element={<Employee_Experience_Report />} />
              <Route path='/RetirementSeparationReport' element={<RetirementSeparationReport />} />
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
              <Route path="/Attendance_Excel_Report" element={<AddPayrollMethodPdf />} />
              <Route path="/payroll/report/taxReport" element={<TaxReport />} />
              <Route path="/payroll/report/SalaryOnHold" element={<SalaryOnHold />} />
              <Route path="/Earning_Master" element={<Earning_Master />} />
              <Route path="/JV_Codes" element={<JV_Code />} />
              <Route path="IncomeTax_Columns" element={<Income_Tax />} />
              <Route path="Bank_Branches" element={<Bank_Branches />} />
              <Route path="/Payroll_Master" element={<Payroll_Master />} />
              <Route path="/Tax_Structure" element={<TaxStructure />} />
              <Route path="/Bank" element={<Bank />} />
              <Route path="/Outstanding_Recoveries" element={<OutstandingRecoveries />} />
              <Route path='/Payroll_Catery_Access' element={<PayrollCategoryAccess />} />
              <Route path="/report/ConfirmationReport" element={<ConfirmationReport />} />
              <Route path="/Pay/PaySlip" element={<PaySlip />} />
              <Route path="/flow/DesignationsFlowChart" element={<FLow />} />
              <Route path="/TAExperienceForm" element={<TAExperienceForm />} />
              <Route path="/TAFamilyForm" element={<TAFamilyForm />} />
              <Route path="/TACheckListForm" element={<TACheckListForm />} />
              <Route path="/Access_Control" element={<Access_Control />} />
              <Route path='/Date_Of_Birth_Inquiry_Report' element={<Date_Of_Birth_Inquiry_Report />} />
              <Route path="/OfferLeter" element={<OfferLeter />} />
              <Route path="/Manual_Attendance" element={<ManualAttendance />} />
              <Route path="/ManualAttendHistory" element={<ManualAttendHistory />} />
              <Route path='/Bank_Letter_Report' element={<Bank_Letter_Report />} />
              <Route path='/Paysheet_Report' element={<Paysheet_Report />} />
              <Route path='/Confirmation_Extension' element={<Confirmation_Extension />} />
              <Route path="/ConfirmExtensionFormProcessing" element={<ConfirmExtensionFormProcessing />} />
              <Route path="/PaySlip_Employee_Wise" element={<PaySlip_Employee_Wise />} />
              <Route path="/PaySlip_Employee_WiseForm" element={<PaySlip_Employee_WiseForm />} />

            </> :
            <>
              <Route path="*" element={<NotFound />} />
            </>
        }

        {
          localStorage.getItem('access_token') == undefined ||
            localStorage.getItem('access_token') == null ||
            localStorage.getItem('access_token') == "" ?
            <>
              <Route path="/" element={<Login />} />
              <Route path="/Forgetpassword" element={<Forgetpassword />} />
              <Route path="/VerifyOTP" element={<VerifyOTP />} />
              <Route path="/Updatepassword" element={<Updatepassword />} />
              <Route path="/Change_Password" element={<Change_Password />} />
            </> :
            <>
              {
                "access_token" in localStorage ?
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path="/Forgetpassword" element={<Forgetpassword />} />
                    <Route path="/VerifyOTP" element={<VerifyOTP />} />
                    <Route path="/Updatepassword" element={<Updatepassword />} />
                    <Route path="/Change_Password" element={<Change_Password />} />
                  </> :
                  <>
                    <Route path="*" element={<NotFound />} />
                  </>
              }
            </>
        }

        {/* =====Temporary routing ======= */}
        <Route path="/Promotion" element={<Promotion />} />
        {/* =====Temporary routing ======= */}
      </Routes>
    </Router>
  );
}

export default routing