import * as Yup from "yup";
export const addProductSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
  category: Yup.string().required("This value is required"),
  brand: Yup.string().required("This value is required"),
  specification: Yup.string().required("This value is required"),
  unitPrice: Yup.string().required("This value is required"),
  productId: Yup.string().required("This value is required"),
  
});
