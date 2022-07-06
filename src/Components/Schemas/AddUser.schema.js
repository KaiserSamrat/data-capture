import * as Yup from "yup";
export const addUserSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
  employeeId: Yup.string().required("This value is required"),
  password: Yup.string().required("This value is required").min(8,"Minimum 8 Character required"),
  passwordConfirm: Yup.string().required("This value is required").min(8,"Minimum 8 Character required").oneOf([Yup.ref("password"),null],"Password Not Matched"),
  role: Yup.string().required("This value is required"),
  //  warehouse: Yup.string().required("This value is required"),
  phoneNumber: Yup.string().required("This value is required"),
});
