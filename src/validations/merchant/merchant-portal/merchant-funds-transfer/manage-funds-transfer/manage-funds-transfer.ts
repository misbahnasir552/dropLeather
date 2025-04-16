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
  transferDateTo: Yup.string().test(
    'transferDateTo-required',
    'To Date is required',
    // eslint-disable-next-line func-names
    function (value) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { transferDateFrom } = this?.parent;
      return !transferDateFrom || (transferDateFrom && value); // If transferDateFrom exists, transferDateTo must also exist
    },
  ),
});
