import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { SettlementFormInfo } from '@/interfaces/interface';

export const SettlementFormInfoInitialValues: SettlementFormInfo = {
  accounts: '',
  // hasBankAccount: false,
  bankName: '',
  accountNumber: '',
  accountTitle: '',
};

export const GetSettlementDetails = () => {
  const SettlementForm = useAppSelector(
    (state: any) => state.onBoardingForms.settlementForm,
  );
  const updatedValues = {
    accounts: SettlementForm.accounts,
  };
  // console.log('activity form indfo detr', SettlementForm);

  return updatedValues;
};

export const SettlementFormInfoSchema = Yup.object().shape({
  account: Yup.string().required('Please select an option'),
  bankName: Yup.string().when(
    'account',
    (accounts, schema) => {
      if (accounts[0] === 'bankAccount') {
        return schema.required('Bank Name is required');
      }
      return schema;
    },
    // {
    //   is: () => "bankAccount", // When 'accounts' equals 'bankAccount'
    //   then: Yup.string().required("Bank name is required"),
    //   otherwise: Yup.string(), // Otherwise, no validation
    // }
  ),
  accountNumber: Yup.string().required('Account number is required'),
  // .when('accounts', (accounts, schema) => {
  //   if (accounts[0] === 'bankAccount') {
  //     return schema.required('Bank Name is required');
  //   }
  //   return schema;
  // }),
  accountTitle: Yup.string(),
  // .when('accounts', (accounts, schema) => {
  //   if (accounts[0] === 'bankAccount') {
  //     return schema.required('Bank Name is required');
  //   }
  //   return schema;
  // }),
  // bankName: Yup.string().required("Please enter a bank name"),
  // accountNumber: Yup.string().required("Please enter a valid Account Number"),
  // accountTitle: Yup.string().required("Please fetch the title"),
});
