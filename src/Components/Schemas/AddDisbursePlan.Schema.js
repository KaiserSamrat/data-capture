import * as Yup from 'yup';
export const AddDisbursePlanSchema = Yup.object().shape({
  // hubId: Yup.string().required("This value is required"),
  // BpId: Yup.string().required("This value is required"),
  date: Yup.string().required('This value is required'),
});
