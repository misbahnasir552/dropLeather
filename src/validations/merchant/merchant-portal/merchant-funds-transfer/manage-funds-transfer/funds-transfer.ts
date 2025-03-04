import * as Yup from 'yup';

import type { IFundsTransfer } from './interfaces';

export const fundsTransferInitialValues: IFundsTransfer = {
  // transferFrom: '',
  // beneficiaryName: '',
  beneficiaryAccountNumber: '',
  beneficiaryBank: '',
  transferAmount: 0,
  transferPurpose: '',
  // transferTo: '',
};

export const fundsTransferSchema = Yup.object().shape({
  // transferFrom: Yup.string().required('Please fill this field.'),
  // transferTo: Yup.string().required('Please fill this field.'),
  // beneficiaryName: Yup.string().required('Please fill this field.'),
  beneficiaryAccountNumber: Yup.string().required('Please fill this field.'),
  // beneficiaryBank: Yup.string().required('Please fill this field.'),
  // transferAmount: Yup.number().required('Please fill this field.'),
  transferAmount: Yup.number()
    .required('Please fill this field.')
    .positive('Amount must be positive.') // Ensures the value is positive
    .min(1, 'Minimum amount is 1.') // Ensures minimum value
    .max(1000000, 'Maximum amount is 10000.'), // Ensures maximum value
  transferPurpose: Yup.string(),
});
