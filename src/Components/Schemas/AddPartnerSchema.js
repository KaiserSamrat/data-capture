import * as Yup from "yup";
export const AddPartnerSchema = Yup.object().shape({
  hubId: Yup.string().required("This value is required"),
  outletName: Yup.string().required("This value is required"),
  ownerName: Yup.string().required("This value is required"),
  partnerCode: Yup.string().required("This value is required"),
  email: Yup.string().required("This value is required"),
  phoneNumber: Yup.string().required("This value is required"),
  alternativePhoneNumber: Yup.string().required("This value is required"),
  address: Yup.string().required("This value is required"),
  point: Yup.string().required("This value is required"),
  route: Yup.string().required("This value is required"),
  area: Yup.string().required("This value is required"),
  region: Yup.string().required("This value is required"),
  territory: Yup.string().required("This value is required"),
  category: Yup.string().required("This value is required"),
});
