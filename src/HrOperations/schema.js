import * as yup from "yup";

const Cost_CentreSchema = yup.object().shape({
  Cost_Centre_code: yup.string().required("Cost_Centre_code is required"),
  Cost_Centre_name: yup.string().required("Cost_Centre_name is required"),
  Cost_Centre_abbr: yup.string().required("Cost_Centre_abbr is required"),
  Train_Cost_Budget: yup.number().required("Train_Cost_Budget is required"),
  Train_Cost_Actual: yup.number().required("Train_Cost_Actual is required"),
  JV_Code1: yup.string().required("JV_Code1 is required"),
  JV_Code: yup.string().required("JV_Code is required"),
  JVCode: yup.string().required("JVCode is required"),
  Temporary_JV_Code: yup.string().required("Temporary_JV_Code is required"),
  emp_category_1: yup.number().required("emp_category_1 is required"),
  emp_category_2: yup.number().required("emp_category_2 is required"),
  emp_category_3: yup.number().required("emp_category_3 is required"),
  Functional_Category_code: yup.number().required("Functional_Category_code is required"),
  Major_Code_Mgmt: yup.string().required("Major_Code_Mgmt is required"),
  Major_Code_Union: yup.string().required("Major_Code_Union is required"),
  Sort_Key: yup.string().required("Sort_Key is required"),
  total_cost_budget: yup.number().required("Total_Cost_Budget is required"),
  Azad_Kashmir_Tax_Flag: yup.string().required("Azad_Kashmir_Tax_flag is required"),
  Pay_Grade_Areas_code: yup.number().required("Pay_Grade_Areas_code is required"),
  Business_Sector_Code: yup.number().required("Business_Sector_Code is required"),
  org_unit_code: yup.number().required("org_unit_code is required"),
});
export {Cost_CentreSchema};

const CountryScheme = yup.object().shape({
  Country_Name: yup.string().required("Country_Name is required"),
  Country_Abbr: yup.string().required("Country_Abbr is required"),
  SortKey: yup.string().required("Country_Abbr is required"),
});
export {CountryScheme};

// HR-OPERATIONS ===> Department SCHEME
const DepartmentScheme = yup.object().shape({
  Dept_code: yup.number().required("Dept_code is required"),
  Dept_name: yup.string().required("Country_Name is required"),
  Dept_abbr: yup.string().required("Country_Name is required"),
  Div_code: yup.number().required("Country_Name is required"),
  Dept_Head: yup.number().required("Country_Name is required"),
  Permanent_Budget: yup.number().required("Country_Name is required"),
  Temporary_Budget: yup.number().required("Country_Name is required"),
  Sort_key: yup.string().required("Country_Name is required")
});
export {DepartmentScheme};

// HR-OPERATIONS ===> Designation SCHEME
const DesignationScheme = yup.object().shape({
  Desig_code : yup.number().required("Desig_code is required"),
  Desig_name: yup.string().required("Desig_name is required"),
  Desig_abbr: yup.string().required("Desig_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  Job_Evaluation_Flag: yup.string().required("Job_Evaluation_Flag is required"),
  Dept_code: yup.number().required("Dept_code is required"),
  SatAllowance: yup.number().required("SatAllowance is required"),
  EveAllowance: yup.number().required("EveAllowance is required"),
  JD_Desig_Code: yup.number().required("JD_Desig_Code is required")
});
export {DesignationScheme};

// HR-OPERATIONS ===> Base City SCHEME
const Base_City_Scheme = yup.object().shape({
  City_code : yup.number().required("City_code is required"),
  City_name: yup.string().required("City_name is required"),
  City_abbr: yup.string().required("City_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  Region_Code: yup.number().required("Region_Code is required"),
  Province_Code: yup.number().required("Province_Code is required")
});
export {Base_City_Scheme};

// HR-OPERATIONS ===> Division SCHEME
const DivisionScheme = yup.object().shape({
  Div_code: yup.number().required("Div_code is required"),
  Div_name: yup.string().required("Div_name is required"),
  Div_abbr: yup.string().required("Div_abbr is required"),
  Div_Head: yup.number().required("Div_Head is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  division_category_code: yup.number().required("division_category_code is required")
});
export {DivisionScheme};


// HR-OPERATIONS ===> EDUCATION LEVEL SCHEME
const EduLevelScheme = yup.object().shape({
  Edu_level_code: yup.number().required("Edu_level_code is required"),
  Edu_level_name: yup.string().required("Edu_level_name is required"),
  Edu_level_abbr: yup.string().required("Edu_level_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {EduLevelScheme};


// HR-OPERATIONS ===> EDUCATION SCHEME
const EducationScheme = yup.object().shape({
  Edu_code: yup.number().required("Edu_code is required"),
  Edu_name: yup.string().required("Edu_name is required"),
  Edu_abbr: yup.string().required("Edu_abbr is required"),
  Edu_level_code: yup.number().required("Edu_level_code is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {EducationScheme};


// HR-OPERATIONS ===> EMPLOYEE TYPE SCHEME
const EmployeeTypeScheme = yup.object().shape({
  Empt_Type_code: yup.number().required("Empt_Type_code is required"),
  Empt_Type_name: yup.string().required("Empt_Type_name is required"),
  Empt_Type_abbr: yup.string().required("Empt_Type_abbr is required"),
  Company_Employee_Flag: yup.string().required("Edu_level_code is required"),
  Emp_Code_Prefix: yup.number().required("Emp_Code_Prefix is required"),
  PermanantFlag: yup.string().required("PermanantFlag is required"),
  Retirement_Age: yup.number().required("Retirement_Age is required"),
  ProbationMonths: yup.number().required("ProbationMonths is required"),
  AllowChangeProbationMonths: yup.string().required("AllowChangeProbationMonths is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {EmployeeTypeScheme};

// HR-OPERATIONS ===> EMPLOYEE CAT SCHEME
const EmployeeCatScheme = yup.object().shape({
  Emp_Category_code: yup.number().required("Emp_Category_code is required"),
  Emp_Category_name: yup.string().required("Emp_Category_name is required"),
  Emp_Category_abbr: yup.string().required("Emp_Category_abbr is required"),
  graduity_fund_percentage: yup.number().required("graduity_fund_percentage is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {EmployeeCatScheme};


// HR-OPERATIONS ===> GRADES SCHEME
const GradesScheme = yup.object().shape({
  Grade_code: yup.number().required("Grade_code is required"),
  Grade_name: yup.string().required("Grade_name is required"),
  Grade_abbr: yup.string().required("Grade_abbr is required"),
  ProbationMonths: yup.number().required("Probation Months is required"),
  Incentive_Hour_Rate: yup.number().required("Incentive_Hour_Rate is required"),
  Incentive_Weekdays_Limit_Hour: yup.number().required("Incentive_Weekdays_Limit_Hour is required"),
  Incentive_Saturday_Limit_Hour: yup.number().required("Incentive_Saturday_Limit_Hour is required"),
  Medical_Insurance_Amount: yup.number().required("Medical_Insurance_Amount is required"),
  Meal_Deduction: yup.number().required("Meal_Deduction is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  Litres_for_Petrol: yup.number().required("Litres_for_Petrol is required"),
  Insurance_Category: yup.string().required("Insurance_Category is required"),
  Life_Insurance_Category: yup.string().required("Life_Insurance_Category is required"),
  Long_Name: yup.string().required("Long_Name is required"),
  job_description_flag: yup.string().required("job_description_flag is required"),
  next_promotion_grade: yup.number().required("next_promotion_grade is required"),
  Assigning_Critaria_For_Next_Promotion: yup.number().required("Assigning_Critaria_For_Next_Promotion is required"),
  Overtime_flag: yup.string().required("Overtime_flag is required"),
  mobile_amount: yup.number().required("mobile_amount is required"),
  Car_Amount: yup.number().required("Car_Amount is required"),
});
export {GradesScheme};

const PositionScheme = yup.object().shape({
  Position_Code: yup.number().required("Position_Code is required"),
  PositionName: yup.string().required("PositionName is required"),
  Position_Active_Flag: yup.string().required("Position_Active_Flag is required"),
  Position_Active_Date: yup.date().required("Position_Active_Date is required"),
  PermanentEmp_Code: yup.number().required("PermanentEmp_Code is required"),
  OfficiatingEmp_Code: yup.number().required("OfficiatingEmp_Code is required"),
  BackupEmp_Code: yup.number().required("BackupEmp_Code is required"),
  SupervisorPosition_Code: yup.number().required("Supervisor Position Code is required"),
  Desig_code: yup.number().required("Desig_code is required"),
  Cost_Centre_Code: yup.number().required("Cost_Centre_Code is required"),
  Section_code: yup.number().required("Section_code is required"),
  Grade_code: yup.number().required("Grade_code is required"),
  Loc_Code: yup.number().required("Loc_Code is required"),
  Default_Workflow_levels_For_Leaves_normal: yup.number().required("Default_Workflow_levels_For_Leaves_normal is required"),
  Default_Workflow_levels_For_Leaves_Special: yup.number().required("Default_Workflow_levels_For_Leaves_Special is required"),
  Minimum_Salary: yup.number().required("Minimum_Salary is required"),
  Maximum_Salary: yup.number().required("Maximum_Salary is required"),
  Avg_Salary_in_Market_survey: yup.number().required("Avg_Salary_in_Market_survey is required"),
  Budgeted_Basic_Salary: yup.number().required("Budgeted_Basic_Salary is required"),
  Budgeted_Other_Salary: yup.number().required("Budgeted_Other_Salary is required"),
  Assign_Delegation_to_all_subordinate: yup.string().required("Assign_Delegation_to_all_subordinate is required"),
  Budgeted_Flag: yup.string().required("Budgeted_Flag is required"),
  Budget_Type_Name: yup.string().required("Budget_Type_Name is required"),
  Budget_Report_Heading_1: yup.string().required("Budget_Report_Heading_1 is required"),
  Budget_Report_Heading_2: yup.string().required("Budget_Report_Heading_2 is required"),
  Budget_Report_Heading_3: yup.string().required("Budget_Report_Heading_3 is required"),
  Preferable_Gender: yup.string().required("Preferable_Gender is required"),
  SubmitFlag: yup.string().required("SubmitFlag is required"),
  SubmittedOn: yup.date().required("SubmittedOn is required"),
  ApprovedFlag: yup.string().required("ApprovedFlag is required"),
  BudgetYear: yup.number().required("BudgetYear is required"),
  BudgetConfirmFlag: yup.string().required("BudgetConfirmFlag is required"),
});
export { PositionScheme };

// HR-OPERATIONS ===> Institution SCHEME
const Institution_Scheme = yup.object().shape({
  Inst_code : yup.number().required("Inst_code is required"),
  Inst_name: yup.string().required("Inst_name is required"),
  Inst_abbr: yup.string().required("Inst_abbr is required"),
  Inst_type: yup.string().required("Inst_type is required"),
  Inst_address_line1: yup.string().required("Inst_address_line1 is required"),
  Inst_address_line2: yup.string().required("Inst_address_line2 is required"),
  Inst_address_line3: yup.string().required("Inst_address_line3 is required"),
  Inst_phone1: yup.string().required("Inst_phone1 is required"),
  Inst_phone2: yup.string().required("Inst_phone2 is required"),
  Inst_fax1: yup.string().required("Inst_fax1 is required"),
  Inst_fax2: yup.string().required("Inst_fax2 is required"),
  Inst_email: yup.string().required("Inst_email is required"),
  Inst_Web_Site: yup.string().required("Inst_Web_Site is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  Verification_Fee: yup.number().required("Verification_Fee is required")
});
export {Institution_Scheme};



// HR-OPERATIONS ===> HOLIDAYS
const Holidays_Scheme = yup.object().shape({
  
  Calendar_Date: yup.string().required("Calendar_Date is required"),
  Date_Type: yup.string().required("Date Type is required"),
  Holiday_Type: yup.string().required("Holiday Type is required"),
  Reason: yup.string().required("Reason is required"),
  ramdan_flag: yup.string().required("ramdan flag is required"),

});
export { Holidays_Scheme };

// HR-OPERATIONS ===> Location
const Locations_Scheme = yup.object().shape({

  Loc_code: yup.number().required("Loc_code is required"),
  Loc_name: yup.string().required("Loc_name is required"),
  Loc_abbr: yup.string().required("Loc_abbr Type is required"),
  Loc_address_line1: yup.string().required("Loc_address_line1 is required"),
  Loc_address_line2: yup.string().required("Loc_address_line2 is required"),
  Loc_address_contact: yup.string().required("Loc_address_contact is required"),
  Loc_address_phone: yup.string().required("Loc_address_phone is required"),
  Loc_address_fax: yup.string().required("Loc_address_fax is required"),
  City_code: yup.number().required("City_code is required"),
  Level_1_Code: yup.number().required("Level_1_Code is required"),
  Bank_Code: yup.string().required("Bank_Code is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  eobi_city_code: yup.number().required("eobi_city_code is required"),
  JV_CODE: yup.string().required("JV_CODE is required"),
  Branch_Flag: yup.string().required("Branch_Flag is required"),
  BranchManager_Code: yup.number().required("BranchManager_Code is required"),
  Branch_Operation_Manager_Code: yup.number().required("Branch_Operation_Manager_Code is required"),
  evening_banking_peron_limit: yup.number().required("evening_banking_peron_limit is required"),
  Evening_banking_flag: yup.string().required("Evening_banking_flag is required"),
  Saturday_banking_peron_limit: yup.string().required("Saturday_banking_peron_limit is required"),
  Saturday_banking_flag: yup.string().required("Saturday_banking_flag is required"),
  SatEveningFlag: yup.string().required("SatEveningFlag is required"),
  Sunday_banking_peron_limit: yup.number().required("Sunday_banking_peron_limit is required"),
  Sunday_banking_flag: yup.string().required("Sunday_banking_flag is required"),
  Saturday_Affactive_Date: yup.date().required("Saturday_Affactive_Date is required"),
  Saturday_InActive_Date: yup.date().required("Saturday_InActive_Date is required"),
  Evening_Affactive_Date: yup.date().required("Evening_Affactive_Date is required"),
  Evening_InActive_Date: yup.date().required("Evening_InActive_Date is required"),
  Sunday_Affactive_Date: yup.date().required("Sunday_Affactive_Date is required"),
  Sunday_InActive_Date: yup.date().required("Sunday_InActive_Date is required"),
  Booth_Flag: yup.string().required("Booth_Flag is required"),

});
export { Locations_Scheme };
// HR-OPERATIONS ===> LEAVE CAT SCHEME
const LeaveCatScheme = yup.object().shape({
  Leave_Category_code: yup.number().required("Leave_Category_code is required"),
  Leave_Category_name: yup.string().required("Leave_Category_name is required"),
  Leave_Category_abbr: yup.string().required("Leave_Category_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {LeaveCatScheme};

// HR-OPERATIONS ===> Religion SCHEME
const ReligionScheme = yup.object().shape({
  Religion_code: yup.number().required("Religion_code is required"),
  Religion_name: yup.string().required("Religion_name is required"),
  Religion_abbr: yup.string().required("Religion_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {ReligionScheme};
  
// HR-OPERATIONS ===> Religion SCHEME
const ResignationScheme = yup.object().shape({
  Resign_code: yup.number().required("Resign_code is required"),
  Resign_reason: yup.string().required("Resign_reason is required"),
  Resign_abbr: yup.string().required("Resign_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {ResignationScheme};

// HR-OPERATIONS ===> Section SCHEME
const SectionScheme = yup.object().shape({
  Section_code: yup.number().required("Section_code is required"),
  Section_name: yup.string().required("Section_name is required"),
  Section_abbr: yup.string().required("Section_abbr is required"),
  Dept_code: yup.number().required("Dept_code is required"),
  Section_Head: yup.number().required("Section_Head is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export {SectionScheme};

// HR-OPERATIONS ===> Previous-Emp SCHEME
const Previous_EmpScheme = yup.object().shape({
  Employer_Code: yup.number().required("Employer_Code is required"),
  Employer_Name: yup.string().required("Employer_Name is required"),
  Industry_Flag: yup.string().required("Industry_Flag is required"),
  Contact_Name: yup.string().required("Contact_Name is required"),
  Contact_Title: yup.string().required("Contact_Title is required"),
  Fax_number: yup.number().required("Fax_number is required"),
  Address_Line_1: yup.string().required("Address_Line_1 is required"),
  Address_Line_2: yup.string().required("Address_Line_2 is required"),
  Contact_Title: yup.string().required("Contact_Title is required"),
  Telephone_number: yup.number().required("Telephone_number is required"),
});
export {Previous_EmpScheme};


const Leave_TypeScheme = yup.object().shape({
  Leave_type_code: yup.number().optional("Leave_type_code is required"),
  Leave_name: yup.string().required("Leave_name is required"),
  Leave_type_abbr: yup.string().required("Leave_type_abbr is required"),
  Leave_Category_code: yup.number().required("Leave_Category_code is required"),
  Start_date: yup.string().required("Start_date is required"),
  End_date: yup.string().required("End_date is required"),
  Annual_Credit: yup.number().required("Annual_Credit is required"),
  Accumulation_limit: yup.number().required("Accumulation_limit is required"),
  Proportionate_flag: yup.string().required("Proportionate_flag is required"),
  Advance_days: yup.number().required("Advance_days is required"),
  Minimum_days_per_form: yup.number().required("Minimum_days_per_form is required"),
  Maximum_days_per_form: yup.number().required("Maximum_days_per_form is required"),
  Life_times: yup.number().required("Life_times is required"),
  Religion_code: yup.number().required("Religion_code is required"),
  Increase_Leave_code: yup.number().required("Increase_Leave_code is required"),
  Join_Confirm_flag: yup.string().required("Join_Confirm_flag is required"),
  Balance_Check_flag: yup.string().required("Balance_Check_flag is required"),
  Meal_flag: yup.string().required("Meal_flag is required"),
  Encashment_flag: yup.string().required("Encashment_flag is required"),
  Without_pay_flag: yup.string().required("Without_pay_flag is required"),
  Medical_Certificate_flag: yup.string().required("Medical_Certificate_flag is required"),
  Medical_Certificate_days: yup.number().required("Medical_Certificate_days is required"),
  Special_Approval_flag: yup.string().required("Special Approval flag is required"),
  Special_Approval_days: yup.number().required("Special Approval days is required"),
  married_flag: yup.string().required("married_flag is required"),
  Adjustment_flag: yup.string().required("Adjustment_flag is required"),
  Adjustment_Leave_code: yup.number().required("Adjustment_Leave_code is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  On_Confirm_Flag: yup.string().required("On_Confirm_Flag is required"),
  DaysApplyOn: yup.string().required("DaysApplyOn is required"),
  SandwichFlag: yup.string().required("SandwichFlag is required"),
  AttachmentFlag: yup.string().required("AttachmentFlag is required"),
  AttachmentDays: yup.number().required("AttachmentDays is required"),
  HREntryStopFlag: yup.string().required("HREntryStopFlag is required"),
  RepaymentFlag: yup.string().required("RepaymentFlag is required"),
  GenderFlag: yup.string().required("GenderFlag is required"),
  CompensatoryFlag: yup.string().required("CompensatoryFlag is required"),
  
});
export { Leave_TypeScheme };


    