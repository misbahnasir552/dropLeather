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

export const manageFundsTransferSchema = Yup.object()
  .shape({
    accountType: Yup.string(),
    beneficiaryName: Yup.string(),
    transferDate: Yup.string(),
    status: Yup.string(),
    transferDateFrom: Yup.string().required('From Date is required'),
    transferDateTo: Yup.string()
      .required('To Date is required')
      .test(
        'max-30-days',
        'To Date should not be more than 30 days from From Date',
        // eslint-disable-next-line func-names
        function (value) {
          const { transferDateFrom } = this.parent;
          if (!transferDateFrom || !value) return true;

          const fromDate = parseISO(transferDateFrom);
          const toDate = parseISO(value);

          if (!isValid(fromDate) || !isValid(toDate)) return true;

          return differenceInDays(toDate, fromDate) <= 30;
        },
      ),
  })
  .test(
    'at-least-one-additional-filter',
    'Select at least one filter with dates (Account Type, Beneficiary Name, Status, etc.)',
    // eslint-disable-next-line func-names
    function (values) {
      const {
        transferDateFrom,
        transferDateTo,
        accountType,
        beneficiaryName,
        status,
      } = values;

      // Only apply this rule if both dates are filled
      if (transferDateFrom && transferDateTo) {
        return !!(accountType || beneficiaryName || status);
      }

      // Don't fail the test if dates are missing (handled in their own validations)
      return true;
    },
  );
