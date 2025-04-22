import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

import type { SearchTransactionsForm } from '@/interfaces/interface';

export const searchTransactionsInitialValues: SearchTransactionsForm = {
  paymentMethod: '',
  customerEmail: '',
  otcExpirationDate: '',
  customerCellPhone: '',
  otcToken: '',
  orderDate: '',
  customerName: '',
  merchantName: '',
  authId: '',
  batch: '',
  paymentDate: '',
  creditCard: '',
  currency: '',
  integratingBankName: '',
  amount: '',
  bankTransactionId: '',
  orderID: '',
  ddGateway: '',
  ccOrderId: '',
  ddBankName: '',
  transactionReference: '',
  // transactionStatus: '',
  escrowStatus: '',
  settlementtransactionStatus: '',
  value3d: '',
  threeDSecureEnabled: '',
  escrow: '',
  transactionPoint: '',
  channel: '',
  status: '',
  storeID: '',
  fromDate: '',
  toDate: '',
  storeName: '',
};

export const searchTransactionsSchema = Yup.object().shape({
  paymentMethod: Yup.string(),
  customerEmail: Yup.string(),
  otcExpirationDate: Yup.string(),
  customerCellPhone: Yup.string(),
  otcToken: Yup.string(),
  orderDate: Yup.string(),
  customerName: Yup.string(),
  authId: Yup.string(),
  batch: Yup.string(),
  paymentDate: Yup.string(),
  creditCard: Yup.string(),
  currency: Yup.string(),
  integratingBankName: Yup.string(),
  amount: Yup.string(),
  bankTransactionId: Yup.string(),
  orderID: Yup.string(),
  ddGateway: Yup.string(),
  ccOrderId: Yup.string(),
  ddBankName: Yup.string(),
  transactionReference: Yup.string(),
  transactionStatus: Yup.string(),
  escrowStatus: Yup.string(),
  settlementtransactionStatus: Yup.string(),
  value3d: Yup.string(),
  threeDSecureEnabled: Yup.string(),
  escrow: Yup.string(),
  transactionPoint: Yup.string(),
  channel: Yup.string(),
  // status: Yup.string(),
  storeID: Yup.string(),
  toDate: Yup.string()
    .test(
      'toDate-required',
      'To Date is required',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;
        return !fromDate || (fromDate && value);
      },
    )
    .test(
      'toDate-max-15-days',
      'To Date should not be more than 15 days from From Date',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;

        if (!fromDate || !value) return true;

        const fromDates = parseISO(fromDate);
        const toDate = parseISO(value);

        if (!isValid(fromDates) || !isValid(toDate)) return true;

        return differenceInDays(toDate, fromDates) <= 15;
      },
    ),
  storeName: Yup.string(),
});
