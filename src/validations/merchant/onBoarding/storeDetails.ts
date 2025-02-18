import * as Yup from 'yup';

// import type { AddStoreInfo } from '@/interfaces/interface';

export const addMerchantAccountInitialValues: any = {
  email: '',
  merchantName: '',
  // merchantCategory: '',
  mobileNumberMsidn: '',
  enableStubTesting: '',
  enableRedirection: '',
  sendSMSNotification: '',
  isShopifyMerchant: '',
  sendEmailNotification: '',
  paymentType: '',
  paymentMethodMA: '',
  paymentMethodQR: '',
  paymentMethodTill: '',
  urlEncryptionMethod: '',
  escrowEnabled: '',
  transactionRetryEnabled: '',
  allowTransactionReversal: '',
  enableFraudAlerts: '',
  merchantType: '',
  iPNRetryEnabled: '',
  iPNReadTimeout: '',
  iPNConnectionTimeout: '',
  pinlessMAPayments: '',
  // enableRedirection: '',
  minIBFTAmount: '',
  minIBFTAmountPKR: '',
  maxIBFTAmount: '',
  maxIBFTAmountPKR: '',
  minMATransferAmount: '',
  minMATransferAmountPKR: '',
  maxMATransferAmount: '',
  maxMATransferAmountPKR: '',
  raastEnabled: '',
};

export const addMerchantAccountSchema = Yup.object().shape({
  // accountNumber: Yup.string().required('Account Number is required'),
  // cnicNumber: Yup.string().required('CNIC Number is required'),
  // sellerCode: Yup.string().required('Seller Code is required'),
  // eWPAccountNumber: Yup.string().required('EWP Account Number is required'),
  // email: Yup.string().required('Email is required'),
  // merchantName: Yup.string().required('Merchant Name is required'),
  // // merchantCategory: Yup.string().required('Merchant Category is required'),
  // mobileNumberMsidn: Yup.string().required(
  //   'Mobile Number (MSISDN) is required',
  // ),
  // // expiryDurationUnit: Yup.string().required('Expiry Duration Unit is required'),
  // // tokenExpiryDuration: Yup.string().required(
  // //   'Token Expiry Duration is required',
  // // ),
  // enableStubTesting: Yup.string().required('required'),
  // enableRedirection: Yup.string().required('required'),
  // paymentMethodMA: Yup.string().required('required'),
  // // paymentMethodOTC: Yup.string().required('required'),
  // // paymentMethodCC: Yup.string().required('required'),
  // sendSMSNotification: Yup.string().required('required'),
  // isShopifyMerchant: Yup.string().required('required'),
  // sendEmailNotification: Yup.string().required('required'),
  // paymentType: Yup.string().required('required'),
  // // paymentMethodDD: Yup.string().required('required'),
  // // paymentMethodIB: Yup.string().required('required'),
  // // paymentMethodOMW: Yup.string().required('required'),
  // paymentMethodQR: Yup.string().required('required'),
  // paymentMethodTill: Yup.string().required('required'),
  // urlEncryptionMethod: Yup.string().required('required'),
  // escrowEnabled: Yup.string().required('required'),
  // // standaloneOrdersSupported: Yup.string().required('required'),
  // transactionRetryEnabled: Yup.string().required('required'),
  // allowTransactionReversal: Yup.string().required('required'),
  // enableFraudAlerts: Yup.string().required('required'),
  // merchantType: Yup.string().required('Merchant Type is required'),
  // iPNRetryEnabled: Yup.string().required('required'),
  // iPNReadTimeout: Yup.string().required('IPN Read Timeout (ms) is required'),
  // iPNConnectionTimeout: Yup.string().required(
  //   'IPN Connection Timeout (ms) is required',
  // ),
  // // rsaEncryptionEnabled: Yup.string().required('required'),
  // pinlessMAPayments: Yup.string().required('required'),
  // // enableRedirection: Yup.string().required('required'),
  // minIBFTAmount: Yup.string().required(
  //   'Min IBFT Amount is required',
  // ),
  // minIBFTAmountPKR: Yup.string().required(
  //   'Min IBFT Amount in PKR is required',
  // ),
  // maxIBFTAmount: Yup.string().required(
  //   'Max IBFT Amount is required',
  // ),
  // maxIBFTAmountPKR: Yup.string().required(
  //   'Max IBFT Amount in PKR is required',
  // ),
  // minMATransferAmount: Yup.string().required(
  //   'Min MA Transfer Amount is required',
  // ),
  // minMATransferAmountPKR: Yup.string().required(
  //   'Max MA Transfer Amount in PKR is required',
  // ),
  // // minMATransferAmountPKR: Yup.string().required(
  // //   'Min MA Transfer Amount is required',
  // // ),
  // maxMATransferAmount: Yup.string().required(
  //   'Max MA Transfer Amount is required',
  // ),
  // maxMATransferAmountPKR: Yup.string().required(
  //   'Max MA Transfer Amount in PKR is required',
  // ),
  // // sendIPNWithAccountID: Yup.string().required('required'),
  // raastEnabled: Yup.string().required('required'),
});

// export const addStoreInitialValues: AddStoreInfo = {
export const storeDetailsInitialValues: any = {
  storeType: '',
  webstoreName: '',
  webstoreURL: '',
  // paymentEnable: '',
  // merchantAddendumID: '',

  // merchantAddendumName: '',
  streetAddress: '',
  city: '',
  category: '',
  // subMerchantState: '',
  countryCode: '',
  state: '',
  posCountryCode: '',
};

export const storeDetailsSchema = Yup.object().shape({
  storeType: Yup.array()
    .required('Store type is required')
    .min(1, 'Store type is required'),
  webstoreName: Yup.string().required('Website Name is required'),

  webstoreURL: Yup.string().required('Website URL is required'),
  // paymentEnable: Yup.string(),
  // merchantAddendumID: Yup.string().required('Merchant Addendum Id is required'),
  // merchantAddendumName: Yup.string().required(
  //   'Merchant Addendum Name is required',
  // ),
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('Cityis required'),
  category: Yup.string().required('Category is required'),
  // subMerchantState: Yup.string().required('Sub Merchant State is required'),
  countryCode: Yup.string().required('Country Code is required'),
  state: Yup.string().required('State is required'),
  posCountryCode: Yup.string().required('POS Country Code is required'),
});
