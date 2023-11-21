import * as yup from "yup";


const TaxStructureSchema = yup.object().shape({
    Structure_Code: yup.number().required("Structure Code is required"),
    Taxable_Income_From: yup.number().required("Taxable Income is required"),
    Taxable_Income_To: yup.number().required("Taxable Income is required"),
    Fixed_Amount: yup.number().required("Fixed Amount is required"),
    Tax_Percentage: yup.number().required("Tax Percentage is required"),
});
export { TaxStructureSchema };