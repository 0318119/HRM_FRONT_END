import * as yup from "yup";


const MasterPayrollSchema = yup.object().shape({
    Sequence_no: yup.number().required("Sequence_no is required"),
    Mode_Of_Payment: yup.number().required("Mode_Of_Payment  is required"),
    Recreation_Club_Flag: yup.string().required("Recreation  Club Flag is required"),
    Meal_Deduction_Flag: yup.string().required("Meal Deduction Flag is required"),
    Union_Flag: yup.string().required('Union Flag is required'),
    Overtime_Flag: yup.string().required('Overtime_Flag is required'),
    Incentive_Flag: yup.string().required("Incentive_Flag is required"),
    SESSI_Flag: yup.string().required("SESSI_Flag is required"),
    EOBI_Flag: yup.string().required("EOBI_Flag is required"),
    SESSI_Number: yup.string().required("SESSI_Number is required"),
    EOBI_Number: yup.string().required("EOBI_Number is required"),
    Account_Type1: yup.string().required("Account_Type1 is required"),
    Bank_Account_No1: yup.string().required("Bank_Account_No1 is required"),
    Branch_Code1: yup.number().required("Branch_Code1 is required"),
    Bank_Amount_1: yup.number().required("Bank_Amount_1 is required"),
    Bank_Percent_1: yup.number().required("Bank_Percent_1 is required"),
    Account_Type2: yup.string().required('Account_Type2 is required'),
    Bank_Account_No2: yup.string().required('Bank_Account_No2 is required'),
    Branch_Code2: yup.number().required("Branch_Code2 is required"),
    Bank_Amount_2: yup.number().required("Bank_Amount_2 is required"),
    Bank_Percent_2: yup.number().required("Bank_Percent_2 is required"),
    Account_Type3: yup.string().required("Account_Type3 is required"),
    Bank_Account_No3: yup.string().required("Bank_Account_No3 is required"),
    Branch_Code3: yup.number().required("Branch_Code3 is required"),
    Bank_Amount_3: yup.number().required("Bank_Amount_3 is required"),
    Bank_Percent_3: yup.number().required("Bank_Percent_3 is required"),
    Account_Type4: yup.string().required("Account_Type4 is required"),
    Bank_Account_No4: yup.string().required("Bank_Account_No4 is required"),
    Branch_Code4: yup.number().required("Branch_Code4 is required"),
    Bank_Amount_4: yup.number().required("Bank_Amount_4 required"),
    Bank_Percent_4: yup.number().required("Bank_Percent_4 is required"),
    Fuel: yup.string().required("Fuel is required"),
    Fuel_Amount: yup.number().required("Fuel_Amount is required"),
    Tax_Exemption: yup.string().required("Tax_Exemption is required"),
    UserCode: yup.number().required("UserCode is required"),
});
export { MasterPayrollSchema };
