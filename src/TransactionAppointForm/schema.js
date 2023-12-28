import * as yup from "yup";
import moment from 'moment';

const TAPersonalSchema = yup.object().shape({
    Sequence_no: yup.number().required("Emp code is required"),
    Emp_name: yup.string().required("Emp Name is required"),
    Emp_Father_name: yup.string().required("Emp Father name is required"),
    Emp_sex_code: yup.string().required("Gender is required"),
    Emp_marital_status: yup.string().required("Emp marital status is required"),
    Confirmation_Flag: yup.string().required("Confirmation Flag is required"),
    Emp_address_line1: yup.string().required("Emp address line 1 is required"),
    Emp_address_line2: yup.string().required("Emp address line 2 is required"),
    Emp_home_tel1: yup.number().required("Emp home tel 1 code is required"),
    Emp_home_tel2: yup.number().required("Emp home tel 2 is required"),
    Emp_office_tel1: yup.number().required("Emp office tel 1 is required"),
    Emp_office_tel2: yup.number().required("Emp office tel 2 is required"),
    Emp_mobile_No: yup.number().required("Emp mobile No is required"),
    Emp_email: yup.string().required("Emp email is required"),
    Emp_nic_no: yup.number().required("Emp nic no is required"),
    Emp_NIC_Issue_date: yup.string().required('Emp NIC Issue date is required'),
    Emp_NIC_Expiry_date: yup.string().required('Emp NIC Expiry date is required')
    .test('is-later', 'CNIC Expiry date must be greater than issue date or equal to issue Date,', function (value) {
      const issueDate = this.parent.Emp_NIC_Issue_date; // Access the issue date from the parent object
      return moment(value).isAfter(issueDate);
    }),
    Emp_Retirement_age: yup.number().required("Emp Retirement age is required"),
    Emp_ntn_no: yup.number().required("Emp ntn no is required"),
    Emp_birth_date: yup.string().required("Emp birth date is required"),
    Vehicle_Registration_Number: yup.number().required("Vehicle Registration Number is required"),
    Contact_Person_Name: yup.string().required("Contact Person Name is required"),
    Relationship: yup.string().required("Relationship is required"),
    Contact_address1: yup.string().required("Contact address 1 is required"),
    Contact_address2: yup.string().required("Contact address 2 is required"),
    Contact_home_tel1: yup.number().required("Contact home tel 1 is required"),
    Contact_home_tel2: yup.number().required("Contact home tel 2 is required"),
    Emp_Blood_Group: yup.string().required("Emp Blood Group is required"),
    Employment_Type_code: yup.number().required("Employment Type code is required"),
    Emp_category: yup.number().required("Emp category is required"),
    Emp_Leave_category: yup.number().required("Emp Leave category is required"),
    Emp_Payroll_category: yup.number().required("Emp Payroll category is required"),
    Shift_code: yup.number().required("Shift  is required"),
    Desig_code: yup.number().required("Desig is required"),
    Cost_Centre_code: yup.number().required("Cost Centre is required"),
    Section_code: yup.number().required("Section is required"),
    Grade_code: yup.number().required("Grade is required"),
    Edu_code: yup.number().required("Education is required"),
    Loc_code: yup.number().required("Location is required"),
    Religion_Code: yup.number().required("Religion is required"),
    Supervisor_Code: yup.number().required("Supervisor  is required"),
    Offer_Letter_date: yup.string().required("Offer Letter date is required"),
    Tentative_Joining_date: yup.string().required('Tentative Joining date is required'),
    ContractExpiryDate: yup.string().required('Contract Expiry Date is required')
    .test('is-later', 'Contract Expiry Date must be greater than or equal to Tentative Joining Date and today date,', function (value1) {
      const Tentative_Joining_date = this.parent.Tentative_Joining_date; // Access the issue date from the parent object
      return moment(value1).isAfter(Tentative_Joining_date);
    }),
    RefferedBy: yup.string().required("Reffered By is required"),
    Probationary_period_months: yup.number().required("Probationary period months is required"),
    Notice_period_months: yup.number().required("Notice period months is required"),
    Emp_confirm_date: yup.string().required("Emp confirm date is required"),
    Emp_joining_date: yup.string().required("Emp joining is required"),
    Permanent_address: yup.string().required("Permanent address is required"),
    Nationality: yup.string().required("Nationality is required"),
});
  
export {TAPersonalSchema};







