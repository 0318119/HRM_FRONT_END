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
  SupervisorPosition_Code: yup.number().required("SupervisorPosition_Code is required"),
  Company_Code: yup.number().required("Company_Code is required"),
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
  updated_on: yup.date().required("updated_on is required"),
  updated_by: yup.number().required("updated_by is required"),
  SubmitFlag: yup.string().required("SubmitFlag is required"),
  SubmittedOn: yup.date().required("SubmittedOn is required"),
  ApprovedFlag: yup.string().required("ApprovedFlag is required"),
  ApprovedBy: yup.number().required("ApprovedBy is required"),
  ApprovedOn: yup.date().required("ApprovedOn is required"),
  BudgetYear: yup.number().required("BudgetYear is required"),
  BudgetYear: yup.date().required("BudgetYear is required"),
  BudgetConfirmFlag: yup.string().required("BudgetConfirmFlag is required"),
});
export { PositionScheme };
