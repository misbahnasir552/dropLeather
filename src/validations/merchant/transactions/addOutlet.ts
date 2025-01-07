import * as Yup from 'yup';

import type { AddOutletForm } from '@/interfaces/interface';

export const addOutletsInitialValues: AddOutletForm = {
  outletName: '',
  region: '',
  city: '',
  address: '',
  managerName: '',
  managerMobile: '',
  outletPocName: '',
  outletPocContactNumber: '',
  outletPocEmail: '',
  outletLongitude: '',
  outletLatitude: '',
  outletImage: null,
  numberOfTillsRequired: '',
};

export const addOutletsSchema = Yup.object().shape({
  outletName: Yup.string(),
  region: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  ManagerName: Yup.string(),
  MangaerMobileNumber: Yup.string(),
  outletPocName: Yup.string(),
  outletPocContactNumber: Yup.string(),
  outletPocEmail: Yup.string(),
  outletLongitude: Yup.string(),
  outletLatitude: Yup.string(),
  outletImage: Yup.mixed(),
  numberOfTillsRequired: Yup.string(),
});
