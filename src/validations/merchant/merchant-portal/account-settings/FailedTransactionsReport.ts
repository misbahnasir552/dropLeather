import * as Yup from 'yup';

import type { IFailedTransactionsReport } from './interfaces';

export const failedTransactionsReportInitialValues: IFailedTransactionsReport =
  {
    storeId: '',
    customerMSISDN: '',
    storeName: '',
    orderID: '',
    orderDateBetween: '',
    failureReason: '',
    channel: '',
  };

export const failedTransactionsReportSchema = Yup.object().shape({
  storeId: Yup.string(),
  customerMSISDN: Yup.string(),
  storeName: Yup.string(),
  orderID: Yup.string(),
  orderDateBetween: Yup.string(),
  failureReason: Yup.string(),
  channel: Yup.string(),
});
