import * as Yup from 'yup';

import type { IManageFundsTransfer } from './interfaces';

export const manageFundsTransferInitialValues: IManageFundsTransfer = {
  accountType: '',
  msisdn: '',
  availableBalance: '',
  currentBalance: '',
  beneficiaryName: '',
  dateBetween: '',
  paymentStatus: '',
  transferAmount: '',
};

export const manageFundsTransferSchema = Yup.object().shape({
  accountType: Yup.string(),
  msisdn: Yup.string(),
  availableBalance: Yup.string(),
  currentBalance: Yup.string(),
  beneficiaryName: Yup.string(),
  dateBetween: Yup.string(),
  paymentStatus: Yup.string(),
  transferAmount: Yup.string(),
});
