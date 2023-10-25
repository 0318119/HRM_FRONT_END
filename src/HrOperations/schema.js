import * as yup from "yup";


// HR-OPERATIONS ===> COST CENTER SCHEME
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


// HR-OPERATIONS ===> COUNTRY SCHEME
const CountryScheme = yup.object().shape({
  Country_Name: yup.string().required("Country_Name is required"),
  Country_Abbr: yup.string().required("Country_Abbr is required"),
  SortKey: yup.string().required("SortKey is required"),
});
export {CountryScheme};


// HR-OPERATIONS ===> COUNTRY SCHEME
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

// HR-OPERATIONS ===> COUNTRY SCHEME
const DesignationScheme = yup.object().shape({
  Desig_code : yup.number().required("Desig_code is required"),
  Desig_name: yup.string().required("Desig_name is required"),
  Desig_abbr: yup.string().required("Desig_abbr is required"),
  Sort_key: yup.string().required("Sort_key is required"),
  Job_Evaluation_Flag: yup.boolean().required("Job_Evaluation_Flag is required"),
  Dept_code: yup.number().required("Dept_code is required"),
  SatAllowance: yup.number().required("SatAllowance is required"),
  EveAllowance: yup.number().required("EveAllowance is required"),
  JD_Desig_Code: yup.number().required("JD_Desig_Code is required")
});
export {DesignationScheme};