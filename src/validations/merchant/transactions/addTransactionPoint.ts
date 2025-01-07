import * as Yup from 'yup';

import type { AddTransactionPointForm } from '@/interfaces/interface';

export const addTransactionPointInitialValues: AddTransactionPointForm = {
  outletName: '',
  transactionPointNumber: '',
  smsNotificationNumber1: '',
  smsNotificationNumber2: '',
  smsNotificationNumber3: '',
  smsNotificationNumber4: '',
  smsNotificationNumber5: '',
  letterHeadImage: null,
};

export const addTransactionPointSchema = Yup.object().shape({
  OutletName: Yup.string(),
  transactionPointNumber: Yup.string(),
  SMSNotificationNumber1: Yup.string(),
  SMSNotificationNumber2: Yup.string(),
  SMSNotificationNumber3: Yup.string(),
  SMSNotificationNumber4: Yup.string(),
  SMSNotificationNumber5: Yup.string(),
  letterHeadImage: Yup.mixed(),
});
