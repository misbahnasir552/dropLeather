import * as Yup from 'yup';

import type { AddStoreInfo } from '@/interfaces/interface';

export const addStoreInitialValues: AddStoreInfo = {
  storeType: [],
  websiteName: '',
  websiteURL: '',
  category: '',
  city: '',
  streetAddress: '',
  countryCode: '',
  state: '',
  posCountryCode: '',
};

export const addStoreSchema = Yup.object().shape({
  // storeType: Yup.string().required('Store type is required'),
  storeType: Yup.array()
    .of(Yup.string().required('Each item must be a string'))
    .min(1, 'Please select at least one store type')
    .required('Please fill this field'),
  websiteName: Yup.string(),
  websiteURL: Yup.string(),
  category: Yup.string().required('Category is required'),
  city: Yup.string().required('Cityis required'),
  streetAddress: Yup.string().required('Street Address is required'),
  countryCode: Yup.string(),
  state: Yup.string(),
  posCountryCode: Yup.string(),
});
