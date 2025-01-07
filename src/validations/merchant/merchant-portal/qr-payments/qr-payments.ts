import * as Yup from 'yup';

import type { IQrPayments } from './interfaces';

export const qrPaymentsInitialValues: IQrPayments = {
  qrDateBetween: '',
  storeName: '',
  transactionPointNumber: '',
  storeId: '',
};

export const qrPaymentsSchema = Yup.object().shape({
  qrDateBetween: Yup.string(),
  storeName: Yup.string(),
  transactionPointNumber: Yup.string(),
  storeId: Yup.string(),
});
