import * as Yup from "yup";
export const addAreaSchema = Yup.object().shape({
   region: Yup.string().required("This value is required"),
  name: Yup.string().required("This value is required"),
});
