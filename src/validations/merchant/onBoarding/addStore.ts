import * as Yup from 'yup';

import type { AddStoreInfo } from '@/interfaces/interface';

export const addStoreInitialValues: AddStoreInfo = {
  storeType: '',
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
  storeType: Yup.string().required('Store type is required'),
  websiteName: Yup.string(),
  websiteURL: Yup.string(),
  category: Yup.string().required('Category is required'),
  city: Yup.string().required('Cityis required'),
  streetAddress: Yup.string().required('Street Address is required'),
  countryCode: Yup.string(),
  state: Yup.string(),
  posCountryCode: Yup.string(),
});
