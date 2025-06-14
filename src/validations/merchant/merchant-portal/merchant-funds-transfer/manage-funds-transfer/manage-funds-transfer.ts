import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

import type { IManageFundsTransfer } from './interfaces';

export const manageFundsTransferInitialValues: IManageFundsTransfer = {
  accountType: '',
  // msisdn: '',
  // availableBalance: '',
  // currentBalance: '',
  beneficiaryName: '',
  transferDateTo: '',
  transferDateFrom: '',
  status: '',
  // transferAmount: '',
};

export const manageFundsTransferSchema = Yup.object().shape({
  accountType: Yup.string(),
  beneficiaryName: Yup.string(),
  transferDate: Yup.string(),
  status: Yup.string(),
  transferDateFrom: Yup.string(),
  transferDateTo: Yup.string()
    // .required('To Date is required')
    .test(
      'transferDateTo-required',
      'To Date is required',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;
        return !transferDateFrom || (transferDateFrom && value);
      },
    )
    .test(
      `transferDateTo-max-${process.env.NEXT_PUBLIC_DAYS_RANGE}-days`,
      `To Date should not be more than ${process.env.NEXT_PUBLIC_DAYS_RANGE} days from From Date`,
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;

        if (!transferDateFrom || !value) return true;

        const fromDate = parseISO(transferDateFrom);
        const toDate = parseISO(value);

        if (!isValid(fromDate) || !isValid(toDate)) return true;

        return (
          differenceInDays(toDate, fromDate) <=
          Number(process.env.NEXT_PUBLIC_DAYS_RANGE)
        );
      },
    ),
  // transferDateTo: Yup.string()
  //   .required('To Date is required')
  //   .test(
  //     `max-${process.env.NEXT_PUBLIC_DAYS_RANGE}-days`,
  //     `To Date should not be more than ${process.env.NEXT_PUBLIC_DAYS_RANGE} days from From Datess`,
  //     // eslint-disable-next-line func-names
  //     function (value) {
  //       const { transferDateFrom } = this.parent;
  //       if (!transferDateFrom || !value) return true;

  //       const fromDate = parseISO(transferDateFrom);
  //       const toDate = parseISO(value);

  //       if (!isValid(fromDate) || !isValid(toDate)) return true;

  //       return (
  //         differenceInDays(toDate, fromDate) <=
  //         Number(process.env.NEXT_PUBLIC_DAYS_RANGE)
  //       );
  //     },
  //   ),
});
