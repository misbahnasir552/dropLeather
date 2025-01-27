import * as Yup from 'yup';

import type { IDynamicQR } from './interfaces';

export const dynamicQRInitialValues: IDynamicQR = {
  productName: '',
  amount: '',
  productDetails: '',
  // productNumber: '',
  storeId: '',
  expirationTime: 0,
  // categoryCode: '',
};

export const dynamicQRSchema = Yup.object().shape({
  productName: Yup.string().required('Please fill this field'),
  amount: Yup.string()
    .required('Please fill this field')
    .matches(/^\d+$/, 'Only numeric values are allowed')
    .test(
      'is-greater-than-zero',
      'Amount must be greater than 0',
      (value) => !!value && Number(value) > 0,
    ),
  productDetails: Yup.string().required('Please fill this field'),
  // productNumber: Yup.string().required('Please fill this field'),
  storeId: Yup.string().required('Please fill this field'),
  expirationTime: Yup.number()
    .required('Please fill this field')
    .test(
      'is-valid-expiration-time',
      'Expiration time should nor be 0 neither it may exceed 12 hours',
      (value) =>
        value !== undefined && value <= 12 * 60 * 60 && Number(value) > 0, // 12 hours in seconds
    ),
  // categoryCode: Yup.string().required('Please fill this field'),
});
