import * as Yup from 'yup';

import type { IManageFundsTransfer } from './interfaces';

export const manageFundsTransferInitialValues: IManageFundsTransfer = {
  accountType: '',
  msisdn: '',
  availableBalance: '',
  currentBalance: '',
  beneficiaryName: '',
  toDate: '',
  fromDate: '',
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
  fromDate: Yup.string(),
  toDate: Yup.string(),
});
