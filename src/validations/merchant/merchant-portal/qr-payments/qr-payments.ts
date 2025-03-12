import * as Yup from 'yup';

import type { IQrPayments } from './interfaces';

export const qrPaymentsInitialValues: IQrPayments = {
  storeName: '',
  transactionPointNumber: '',
  storeId: '',
};

export const qrPaymentsSchema = Yup.object().shape({
  storeName: Yup.string(),
  transactionPointNumber: Yup.string(),
  storeId: Yup.string(),
});
