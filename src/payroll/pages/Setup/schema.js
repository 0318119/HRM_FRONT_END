import * as yup from "yup";


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
    Outstanding_Recovery_code: yup.string().required("Outstanding Recovery Code is required"),
    Outstanding_Recovery_name: yup.string().required("Outstanding Recovery Name is required"),
    Final_Settlement_Report_Mandatory_Flag: yup.string().required("Final Settlement Report Mandatory Flag is required"),
});
export { OutstandingRecoveries };