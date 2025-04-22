import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

import type { IManageFundsTransfer } from './interfaces';

export const manageFundsTransferInitialValues: IManageFundsTransfer = {
  accountType: '',
  msisdn: '',
  availableBalance: '',
  currentBalance: '',
  beneficiaryName: '',
  transferDateTo: '',
  transferDateFrom: '',
  status: '',
  transferAmount: '',
};

export const manageFundsTransferSchema = Yup.object().shape({
  accountType: Yup.string(),
  msisdn: Yup.string(),
  availableBalance: Yup.string(),
  currentBalance: Yup.string(),
  beneficiaryName: Yup.string(),
  transferDate: Yup.string(),
  status: Yup.string(),
  transferDateFrom: Yup.string(),
  transferDateTo: Yup.string()
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
      'transferDateTo-max-15-days',
      'To Date should not be more than 15 days from From Date',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;

        if (!transferDateFrom || !value) return true;

        const fromDate = parseISO(transferDateFrom);
        const toDate = parseISO(value);

        if (!isValid(fromDate) || !isValid(toDate)) return true;

        return differenceInDays(toDate, fromDate) <= 15;
      },
    ),
});
