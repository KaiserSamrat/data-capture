import * as Yup from "yup";
export const addTerritorySchema = Yup.object().shape({
  area: Yup.string().required("This value is required"),
  name: Yup.string().required("This value is required"),
});
