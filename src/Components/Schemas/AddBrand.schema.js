import * as Yup from "yup";
export const addBrandSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
});
