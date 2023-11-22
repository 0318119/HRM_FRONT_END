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
  export {JvCodeScheme};

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
export {IncomeTax_ColumnScheme};

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
  export {Bank_BranchesScheme};