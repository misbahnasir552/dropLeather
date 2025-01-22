import * as Yup from 'yup';

import type { IDynamicQR } from './interfaces';

export const dynamicQRInitialValues: IDynamicQR = {
  productName: '',
  amount: '',
  productDetails: '',
  productNumber: '',
  storeId: '',
  expirationTime: 0,
  categoryCode: '',
};

export const dynamicQRSchema = Yup.object().shape({
  productName: Yup.string().required('Please fill this field'),
  amount: Yup.string().required('Please fill this field'),
  productDetails: Yup.string().required('Please fill this field'),
  productNumber: Yup.string().required('Please fill this field'),
  storeId: Yup.string().required('Please fill this field'),
  expirationTime: Yup.number().required('Please fill this field'),
  categoryCode: Yup.string().required('Please fill this field'),
});
