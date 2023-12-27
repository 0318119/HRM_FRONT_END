import * as yup from "yup";
import moment from 'moment';


const FamilySchema = yup.object().shape({
  ControlNo: yup.string().required("ControlNo is required"),
  ESS_Sr_No: yup.string().required("ESS_Sr_No is required"),
  Emp_code: yup.string().required("Emp_code is required"),
  Fam_member_DOB: yup.string().required("Fam_member_DOB is required"),
  Fam_member_name: yup.string().required("Fam_member_name is required"),
  Fam_member_type: yup.string().required("Fam_member_type is required"),
});
export {FamilySchema};



const MasterPersonal_schema = yup.object().shape({
  // Emp_code: yup.string().required("Emp code is required"),
  Emp_name: yup.string().required("Emp name is required"),
  Emp_Father_name: yup.string().required("Emp Father name is required"),
  Emp_sex_code: yup.string().required("gender is required"),
  Emp_marital_status: yup.string().required("marital status is required"),
  Emp_birth_date: yup.string().required('Birth date is required'),
  Emp_Confirm_date: yup.string().required('Confirm date is required'),
  Emp_Joining_date: yup.string().required('Emp joining date  is required'),
  Emp_category: yup.number().required("Emp category is required"),
  Emp_Leave_category: yup.number().required("Leave category is required"),
  Emp_address_line1: yup.string().required("Emp Address line is required"),
  Emp_address_line2: yup.string().required("Emp Address line2 is required"),
  Emp_home_tel1: yup.string().required("Emp home tell 1 is required"),
  Emp_home_tel2: yup.string().required("Emp home tell 2 is required"),
  Emp_office_tel1: yup.string().required("office tel1 tel1 is required"),
  Emp_office_tel2: yup.string().required("office tel2 is required"),
  Emp_mobile_No: yup.string().required("Emp_mobile_No is required"),
  Emp_nic_no: yup.string().required("Emp_nic_no is required"),
  Emp_NIC_Issue_date: yup.string().required('Emp NIC Issue date is required'),
  Emp_NIC_Expiry_date: yup.string().required('Emp NIC Expiry date is required')
  .test('is-later', 'CNIC Expiry date must be greater than issue date or equal to issue Date,', function (value) {
    const issueDate = this.parent.Emp_NIC_Issue_date; // Access the issue date from the parent object
    return moment(value).isAfter(issueDate);
  }),
  Emp_Retirement_age: yup.number().required("Emp Retirement age is required"),
  Emp_ntn_no: yup.string().required("Emp NTN no is required"),
  Emp_email: yup.string().required("Emp email is required"),
  Confirmation_Flag: yup.string().required("Confirmation_Flag is required"),
  Employment_Type_code: yup.number().required("Employment Type code is required"),
  Desig_code: yup.number().required("Desig code is required"),
  Grade_code: yup.number().required("Grade code is required"),
  Cost_Centre_code: yup.number().required("Cost Centre code is required"),
  Section_code: yup.number().required("Section code is required"),
  Shift_code: yup.number().required("Shift code is required"),
  Loc_code: yup.number().required("Loc code is required"),
  Edu_code: yup.number().required("Edu_code is required"),
  Supervisor_Code: yup.number().required("Supervisor_Code is required"),
  Religion_Code: yup.number().required("Religion Code is required"),
  Contact_Person_Name: yup.string().required("Contact Person Name is required"),
  Relationship: yup.string().required("Relationship is required"),
  Contact_address1: yup.string().required("Contact Address1 is required"),
  Contact_address2: yup.string().required("Contact Address2 is required"),
  Contact_home_tel1: yup.string().required("Contact home tel1 is required"),
  Contact_home_tel2: yup.string().required("Contact_home_tel2 is required"),
  Emp_Blood_Group: yup.string().required("Emp Blood Group is required"),
  Vehicle_Registration_Number: yup.string().required("Vehicle Registration Number is required"),
  Emp_Payroll_Category: yup.number().required("Emp PayrollCategory is required"),
  Offer_Letter_date: yup.string().required("Offer_Letter_date is required"),
  Tentative_Joining_date: yup.string().required("Tentative_Joining_date is required"),
  RefferedBy: yup.string().required("RefferedBy is required"),
  Probationary_period_months: yup.number().required("Probationary period months is required"),
  Notice_period_months: yup.number().required("Notice period months is required"),
  Permanent_address: yup.string().required("Permanent Address is required"),
  Nationality: yup.string().required("Nationality is required"),
});
export { MasterPersonal_schema };


const MasterEarningSchema = yup.object().shape({
  Deletion_Flag: yup.string().required("Deletion_Flag is required"),
});
export { MasterEarningSchema };

