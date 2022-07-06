import * as Yup from "yup";
export const AddStockSchema = Yup.object().shape({
  inventoryOpt: Yup.string().required("This value is required"),
  // warehouse: Yup.string().required("This value is required"),

});
