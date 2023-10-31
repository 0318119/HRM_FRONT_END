import * as yup from "yup";

const FamilySchema = yup.object().shape({
  ControlNo: yup.string().required("ControlNo is required"),
  ESS_Sr_No: yup.string().required("ESS_Sr_No is required"),
  Emp_code: yup.string().required("Emp_code is required"),
  Fam_member_DOB: yup.string().required("Fam_member_DOB is required"),
  Fam_member_name: yup.string().required("Fam_member_name is required"),
  Fam_member_type: yup.string().required("Fam_member_type is required"),
});

export {FamilySchema};