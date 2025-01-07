import * as Yup from 'yup';

import type { IViewProductQr } from './interfaces';

export const viewProductQrInitialValues: IViewProductQr = {
  productNumber: '',
  storeId: '',
  productName: '',
};

export const viewProductQrSchema = Yup.object().shape({
  productNumber: Yup.string(),
  storeId: Yup.string(),
  productName: Yup.string(),
});
