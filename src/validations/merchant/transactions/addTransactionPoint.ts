import * as Yup from 'yup';

import type { AddTransactionPointForm } from '@/interfaces/interface';

export const addTransactionPointInitialValues: AddTransactionPointForm = {
  outletName: '',
  // transactionPointNumber: '',
  smsNotificationNumber1: '',
  smsNotificationNumber2: '',
  smsNotificationNumber3: '',
  smsNotificationNumber4: '',
  smsNotificationNumber5: '',
  letterHeadImage: null,
};

export const addTransactionPointSchema = Yup.object().shape({
  outletName: Yup.string().required('Please add store'),
  // transactionPointNumber: Yup.string(),
  smsNotificationNumber1: Yup.string()
    .required('Please fill this field.')
    .matches(/^03\d{9}$/, 'Number must start with 0 and be exactly 11 digits.'),
  smsNotificationNumber2: Yup.string(),
  smsNotificationNumber3: Yup.string(),
  smsNotificationNumber4: Yup.string(),
  smsNotificationNumber5: Yup.string(),
  letterHeadImage: Yup.mixed(),
});
