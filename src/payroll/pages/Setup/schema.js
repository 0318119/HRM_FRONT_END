import * as yup from "yup";


const TaxStructureSchema = yup.object().shape({
    Structure_Code: yup.string().required("Structure Code is required"),
    Taxable_Income_From: yup.string().required("Taxable Income is required"),
    Taxable_Income_To: yup.string().required("Taxable Income is required"),
    Fixed_Amount: yup.string().required("Fixed Amount is required"),
    Tax_Percentage: yup.string().required("Tax Percentage is required"),
});
export { TaxStructureSchema };