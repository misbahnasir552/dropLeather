import * as Yup from 'yup';

export const addStoreInitialValues: any = {
  storeType: '',
  webstoreName: '',
  webstoreURL: '',
  paymentEnable: '',
  // merchantAddendumID: '',
  storeName: '',
  // merchantAddendumName: '',
  streetAddress: '',
  city: '',
  category: '',
  // subMerchantState: '',
  countryCode: '',
  posCountryCode: '',
  postalCode: '',
  // managerName: '',
  // managerMobilePhoneNumber: '',
  // commercialName: '',
  // noOfTransactionPoints: '',
  region: '',
  pocName: '',
  pocContactNumber: '',
  pocEmail: '',
  // longLat: '',
  // cashInAllowed: '',
  // cashOutAllowed: '',
};

export const addStoreSchema = Yup.object().shape({
  storeType: Yup.array()
    .required('Store type is required')
    .min(1, 'Store type is required'),

  // webstoreName: Yup.string().required('Website Name is required'),
  // storeName: Yup.string().required('Website Name is required'),

  webstoreName: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Online') || storeType[0] == undefined) {
      return schema.required('Web Store Name is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),

  storeName: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
      return schema.required('Store Name is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),

  // webstoreURL: Yup.string().required('Website URL is required'),
  webstoreURL: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Online') || storeType[0] == undefined) {
      return schema.required('Website URL is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),

  paymentEnable: Yup.string(),
  // merchantAddendumID: Yup.string().required('Merchant Addendum Id is required'),
  // merchantAddendumName: Yup.string().required(
  //   'Merchant Addendum Name is required',
  // ),
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  category: Yup.string().required('Category is required'),
  // subMerchantState: Yup.string().required('Sub Merchant State is required'),
  countryCode: Yup.string().required('Country Code is required'),
  posCountryCode: Yup.string().required('POS Country Code is required'),
  postalCode: Yup.string().required('Postal Code is required'),

  // managerName: Yup.string(),
  // managerMobilePhoneNumber: Yup.string(),
  // commercialName: Yup.string().when('storeType', (storeType, schema) => {
  //   if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
  //     return schema.required('Commercial Name is required');
  //   }
  //   return schema.nullable(); // Make it optional if not Retailer
  // }),
  // noOfTransactionPoints: Yup.string().required('Number of Transaction Points is required'),
  // noOfTransactionPoints: Yup.string().when('storeType', (storeType, schema) => {
  //   if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
  //     return schema.required('Number of Transaction Points is required');
  //   }
  //   return schema.nullable(); // Make it optional if not Retailer
  // }),

  region: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
      return schema.required('Region is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),

  // pocName: Yup.string().required('POC Name is required'),
  pocName: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
      return schema.required('POC Name is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),
  // pocContactNumber: Yup.string().required('POC Contact Number is required'),
  pocContactNumber: Yup.string().when('storeType', (storeType, schema) => {
    if (storeType?.flat()?.includes('Retail') || storeType[0] == undefined) {
      return schema.required('POC Contact Number is required');
    }
    return schema.nullable(); // Make it optional if not Retailer
  }),
  pocEmail: Yup.string(),
  // longLat: Yup.string(),
  // cashInAllowed: Yup.string(),
  // cashOutAllowed: Yup.string(),
});
