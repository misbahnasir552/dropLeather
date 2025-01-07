import * as Yup from 'yup';

import type { ITransactionFeedbackReportForm } from './interfaces';

export const transactionsFeedbackReportInitialValues: ITransactionFeedbackReportForm =
  {
    orderDateBetween: '',
    transactionId: '',
    orderID: '',
    review: '',
    customerMSISDN: '',
    customerEmail: '',
  };

export const transactionsFeedbackReportSchema = Yup.object().shape({
  orderDateBetween: Yup.string(),
  transactionId: Yup.string(),
  orderID: Yup.string(),
  review: Yup.string(),
  customerMSISDN: Yup.string(),
  customerEmail: Yup.string(),
});
