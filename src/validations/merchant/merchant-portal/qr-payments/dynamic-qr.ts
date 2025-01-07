import * as Yup from 'yup';

import type { IDynamicQR } from './interfaces';

export const dynamicQRInitialValues: IDynamicQR = {
  productName: '',
  amount: '',
  productDetails: '',
  productNumber: '',
  storeId: '',
};

export const dynamicQRSchema = Yup.object().shape({
  productName: Yup.string(),
  amount: Yup.string(),
  productDetails: Yup.string(),
  productNumber: Yup.string(),
  storeId: Yup.string(),
});
