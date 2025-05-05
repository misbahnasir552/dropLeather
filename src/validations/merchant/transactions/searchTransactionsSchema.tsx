// import { differenceInDays, isValid, parseISO } from 'date-fns';
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

// const isOtherFiltersUsed = (values: any) => {
//   const { orderID, fromDate, toDate, ...rest } = values;

//   return Object.entries(rest)?.some(
//     ([key, val]) => val !== undefined && val !== '' && key !== 'storeName',
//   );
// };

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
  storeID: Yup.string(),

  fromDate: Yup.string(),
  toDate: Yup.string()
    // .required('To Date is required')
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
      `toDate-max-${process.env.NEXT_PUBLIC_DAYS_RANGE}-days`,
      `To Date should not be more than ${process.env.NEXT_PUBLIC_DAYS_RANGE} days from From Date`,
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;

        if (!fromDate || !value) return true;

        const fromDates = parseISO(fromDate);
        const toDate = parseISO(value);

        if (!isValid(fromDates) || !isValid(toDate)) return true;

        return (
          differenceInDays(toDate, fromDates) <=
          Number(process.env.NEXT_PUBLIC_DAYS_RANGE)
        );
      },
    ),
  storeName: Yup.string(),
});
