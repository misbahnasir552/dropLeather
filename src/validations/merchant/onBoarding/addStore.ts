// import * as Yup from 'yup';

// import type { AddStoreInfo } from '@/interfaces/interface';

// export const addStoreInitialValues: AddStoreInfo = {
//   storeType: [],
//   storeName: '',
//   websiteName: '',
//   websiteURL: '',
//   category: '',
//   city: '',
//   streetAddress: '',
//   countryCode: '',
//   state: '',
//   posCountryCode: '',
// };

// export const addStoreSchema = Yup.object().shape({
//   // storeType: Yup.string().required('Store type is required'),
//   storeType: Yup.array()
//     .of(Yup.string().required('Each item must be a string'))
//     .min(1, 'Please select at least one store type')
//     .required('Please fill this field'),
//   storeName: Yup.string().when(
//     'storeType',
//     (storeType, schema) => {
//       if (storeType.includes('Retail')) {
//         return schema.required('Website name is required');
//       }
//       return schema;
//     },
//   ),
//   websiteName: Yup.string().when(
//     'storeType',
//     (storeType, schema) => {
//       if (storeType.includes('Online Payments')) {
//         return schema.required('Website name is required');
//       }
//       return schema;
//     },
//   ),
//   websiteURL: Yup.string().when(
//     'storeType',
//     (storeType, schema) => {
//       if (storeType.includes('Online Payments')) {
//         return schema.required('Website URL is required');
//       }
//       return schema;
//     },
//   ),
//   category: Yup.string().required('Category is required'),
//   city: Yup.string().required('Cityis required'),
//   streetAddress: Yup.string().required('Street Address is required'),
//   countryCode: Yup.number().required('Country is required'),
//   state: Yup.string().required('State is required'),
//   posCountryCode: Yup.string().required('POS code is required'),
// });

import * as Yup from 'yup';

import type { AddStoreInfo } from '@/interfaces/interface';

export const addStoreInitialValues: AddStoreInfo = {
  storeType: [],
  storeName: '',
  websiteName: '',
  websiteURL: '',
  category: '',
  city: '',
  streetAddress: '',
  // countryCode: '',
  state: '',
  posCountryCode: '',
};

export const addStoreSchema = Yup.object().shape({
  storeType: Yup.array()
    .of(Yup.string().required('Each item must be a string'))
    .min(1, 'Please select at least one store type')
    .required('Please fill this field'),

  storeName: Yup.string().when('storeType', {
    is: (storeType: string[]) => storeType?.includes('Retail'),
    then: (schema) => schema.required('Store name is required'),
    otherwise: (schema) => schema,
  }),

  websiteName: Yup.string().when('storeType', {
    is: (storeType: string[]) => storeType?.includes('Online Payments'),
    then: (schema) => schema.required('Website name is required'),
    otherwise: (schema) => schema,
  }),

  websiteURL: Yup.string().when('storeType', {
    is: (storeType: string[]) => storeType?.includes('Online Payments'),
    then: (schema) =>
      schema.required('Website URL is required').url('Invalid URL format'),
    otherwise: (schema) => schema,
  }),

  category: Yup.string().required('Category is required'),
  city: Yup.string().required('City is required'),
  streetAddress: Yup.string().required('Street Address is required'),

  // countryCode: Yup.string().required('Country is required'), // Changed to string

  state: Yup.string().required('State is required'),
  posCountryCode: Yup.string().required('POS code is required'),
});
