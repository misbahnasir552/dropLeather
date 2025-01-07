import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { BusinessFormInfo } from '@/interfaces/interface';

export const BusinessInfoInitialValues: BusinessFormInfo = {
  businessDocumentationType: '',
  merchantCategory: '',
  businessMode: '',
  establishedSince: '',
  paymentModesRequired: [],
  businessType: '',
  isBusinessRegistered: '',
  isSpecialCustomer: '',
  natureOfActivity: '',
  isIncomeFromSalary: '',
  currentDailyTransactionsInPkr: '',
  associationToHighRiskBusiness: '',
  status: '',
  sourceOfFunds: '',
  currentMonthlyTransactionsInPkr: '',
  expectedNumberOfTransactions: '',
  expectedSalesVolume: '',
};

export const GetBusinessDetails = () => {
  const businessDetails = useAppSelector(
    (state: any) => state.onBoardingForms.businessForm,
  );
  const updatedValues = {
    businessDocumentationType: businessDetails.businessDocumentationType,
    merchantCategory: businessDetails.merchantCategory,
    businessMode: businessDetails.businessMode,
    establishedSince: businessDetails.establishedSince,
    paymentModesRequired: businessDetails.paymentModesRequired,
    businessType: businessDetails.businessType,
    isBusinessRegistered: businessDetails.isBusinessRegistered,
    isSpecialCustomer: businessDetails.isSpecialCustomer,
    natureOfActivity: businessDetails.natureOfActivity,
    isIncomeFromSalary: businessDetails.isIncomeFromSalary,
    currentDailyTransactionsInPkr:
      businessDetails.currentDailyTransactionsInPkr,
    associationToHighRiskBusiness:
      businessDetails.associationToHighRiskBusiness,
    status: businessDetails.status,
    sourceOfFunds: businessDetails.sourceOfFunds,
    currentMonthlyTransactionsInPkr:
      businessDetails.currentMonthlyTransactionsInPkr,
    expectedNumberOfTransactions: businessDetails.expectedNumberOfTransactions,
    expectedSalesVolume: businessDetails.expectedSalesVolume,
  };
  // console.log('activity form indfo detr', businessDetails);

  return updatedValues;
};

export const businessInfoSchema = Yup.object().shape({
  establishedSince: Yup.string().required('Established Since is required'),
  natureOfActivity: Yup.string().required('Nature Of Activity is required'),
  currentDailyTransactionsInPkr: Yup.string().required(
    'Current Daily Transactions In Pkr is required',
  ),
  currentMonthlyTransactionsInPkr: Yup.string().required(
    'Current Monthly Transactions In Pkr is required',
  ),
  expectedNumberOfTransactions: Yup.string().required(
    'Expected Number Of Transactions is required',
  ),
  expectedSalesVolume: Yup.string().required(
    'Expected Sales Volume is required',
  ),
  isIncomeFromSalary: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  businessDocumentationType: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  merchantCategory: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  businessMode: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  businessType: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  isBusinessRegistered: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  isSpecialCustomer: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  associationToHighRiskBusiness: Yup.string().required(
    'Please select an option',
  ),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  sourceOfFunds: Yup.string().required('Please select an option'),
  // .oneOf(['Male', 'Female'], 'Invalid option'),
  paymentModesRequired: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one option'),
});
