import * as yup from "yup";


// Payroll ===> JV Code SCHEME
const JvCodeScheme = yup.object().shape({
  JV_Unit: yup.number().optional("JV_Unit is required"),
  JV_Currency: yup.string().required("JV_Currency is required"),
  JV_Cost_Centre: yup.string().required("JV_Cost_Centre is required"),
  JV_MainAC: yup.string().required("JV_MainAC is required"),
  JV_SubAC: yup.string().required("JV_SubAC is required"),
  JV_Description: yup.string().required("JV_Description is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export { JvCodeScheme };

// Payroll ===> IncomeTax_Column SCHEME
const IncomeTax_ColumnScheme = yup.object().shape({
  Column_No: yup.number().optional("Column_No is required"),
  Column_name: yup.string().required("Column_name is required"),
  Head_Line_01: yup.string().required("Head_Line_01 is required"),
  Head_Line_02: yup.string().required("Head_Line_02 is required"),
  Head_Line_03: yup.string().required("Head_Line_03 is required"),
  Head_Line_04: yup.string().required("Head_Line_04 is required"),
  Head_Line_05: yup.string().required("Head_Line_05 is required"),
  Head_Line_06: yup.string().required("Head_Line_06 is required"),
  Head_Line_07: yup.string().required("Head_Line_07 is required"),
  Head_Line_08: yup.string().required("Head_Line_08 is required"),
  Colunm_Type: yup.string().required("Colunm_Type is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export { IncomeTax_ColumnScheme };

// Payroll ===> Bank_Branches SCHEME
const Bank_BranchesScheme = yup.object().shape({
  Branch_code: yup.string().optional("Branch_code is required"),
  Branch_name: yup.string().required("Branch_name is required"),
  Branch_abbr: yup.string().required("Branch_abbr is required"),
  Branch_address_line1: yup.string().required("Branch_address_line1 is required"),
  Branch_address_line2: yup.string().required("Branch_address_line2 is required"),
  Contact: yup.string().required("Contact is required"),
  Bank_Branch_Code: yup.string().required("Bank_Branch_Code is required"),
  Bank_Code: yup.string().required("Bank_Code is required"),
  City_Code: yup.string().required("City_Code is required"),
  Country_Code: yup.string().required("countrycode is required"),
  Zone_Code: yup.string().required("zonecode is required"),
  Sort_key: yup.string().required("Sort_key is required"),
});
export { Bank_BranchesScheme };

// TAX STRUCTURE
const TaxStructureSchema = yup.object().shape({
  Taxable_Income_From: yup.number().required("Taxable Income is required"),
  Taxable_Income_To: yup.number().required("Taxable Income is required"),
  Fixed_Amount: yup.number().required("Fixed Amount is required"),
  Tax_Percentage: yup.number().required("Tax Percentage is required"),
});
export { TaxStructureSchema };

//Bank
const BankSchema = yup.object().shape({
  bank_name: yup.string().required("Bank name is required"),
  bank_abbr: yup.string().required("Bank Abbreviation is required"),
  Sort_key: yup.string().required("Sort Key is required"),
  Bank_Address1: yup.string().required("Bank Address 1 is required"),
  Bank_Address2: yup.string().required("Bank Address 2 is required"),
  Bank_Address3: yup.string().required("Bank Address 3 is required"),
  Current_Account: yup.string().required("Current Account is required"),
  IMDCode: yup.string().required("IMD Code is required"),
  Swift: yup.string().required("Swift is required"),
});
export { BankSchema };

//Outstanding Recoveries
const OutstandingRecoveries = yup.object().shape({
  Outstanding_Recovery_name: yup.string().required("Outstanding Recovery Name is required"),
  Final_Settlement_Report_Mandatory_Flag: yup.string().required("Final Settlement Report Mandatory Flag is required"),
});
export { OutstandingRecoveries };

//Payroll Category Access
const PayrollCategoryAccess = yup.object().shape({
  Payroll_Category_name: yup.string().required("Payroll Category Name is required"),
  Payroll_Category_abbr: yup.string().required("Payroll Category Abbreviation is required"),
  Payroll_Month: yup.string().required("Payroll Month is required"),
  Payroll_Year: yup.string().required("Payroll Year is required"),
  Payroll_Last_Month: yup.string().required(" Payroll Last Month is required"),
  Payroll_Last_Year: yup.string().required("Payroll Last Year is required"),
  Payroll_Undo_Flag: yup.string().required("Payroll Undo Flag is required"),
  Loan_Completion_Flag: yup.string().required("Loan Completion Flag is required"),
  Sort_key: yup.string().required("Sort key is required"),
  pf_percentage: yup.number().required("Pf percentage is required"),
  active_flag: yup.string().required("Active flag is required"),

});
export { PayrollCategoryAccess };