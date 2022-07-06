import * as Yup from "yup";
export const addRegionSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
});
