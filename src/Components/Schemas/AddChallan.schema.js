import * as Yup from 'yup';
export const addChallanSchema = Yup.object().shape({
  distributionHubId: Yup.string().required('This value is required'),
  InventoryOperation: Yup.string().required('This value is required'),
  deliveryFrom: Yup.string().required('This value is required'),
  centralWarehouseId: Yup.string().when('deliveryFrom', {
    is: 'Warehouse',
    then: Yup.string().required('This value is required'),
  }),
  vendorId: Yup.string().when('deliveryFrom', {
    is: 'Vendor',
    then: Yup.string().required('This value is required'),
  }),
});
