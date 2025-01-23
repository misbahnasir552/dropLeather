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
  outletLongitude: 0,
  outletLatitude: 0,
  outletImage: null,
  // numberOfTillsRequired: '',
  categoryCode: '',
};

export const addOutletsSchema = Yup.object().shape({
  outletName: Yup.string().required('Please fill this field'),
  region: Yup.string().required('Please fill this field'),
  city: Yup.string().required('Please fill this field'),
  address: Yup.string().required('Please fill this field'),
  managerName: Yup.string().required('Please fill this field'),
  managerMobile: Yup.string().required('Please fill this field'),
  outletPocName: Yup.string().required('Please fill this field'),
  outletPocContactNumber: Yup.string().required('Please fill this field'),
  outletPocEmail: Yup.string().required('Please fill this field'),
  outletLongitude: Yup.number(),
  outletLatitude: Yup.number(),
  outletImage: Yup.mixed().required('Please fill this field'),
  categoryCode: Yup.string().required('Please fill this field'),
  // numberOfTillsRequired: Yup.string().required('Please fill this field'),
});
