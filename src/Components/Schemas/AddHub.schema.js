import * as Yup from "yup";
export const addHubSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
  address: Yup.string().required("This value is required"),
  uniqueId: Yup.string().required("This value is required"),
  WarehouseType: Yup.string().required("This value is required"),
  area: Yup.string().required("This value is required"),
  region: Yup.string().required("This value is required"),
  territory: Yup.string().required("This value is required"),
});
