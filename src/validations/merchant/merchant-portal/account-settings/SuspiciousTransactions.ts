import * as Yup from 'yup';

import type { ISuspiciousTransactionForm } from './interfaces';

export const suspiciousTransactionsInitialValues: ISuspiciousTransactionForm = {
  storeName: '',
  orderDateBetween: '',
  opsId: '',
  orderID: '',
  customerMSISDN: '',
  cardNo: '',
};

export const suspiciousTransactionsSchema = Yup.object().shape({
  storeName: Yup.string(),
  orderDateBetween: Yup.string(),
  opsId: Yup.string(),
  orderID: Yup.string(),
  customerMSISDN: Yup.string(),
  cardNo: Yup.string(),
});
