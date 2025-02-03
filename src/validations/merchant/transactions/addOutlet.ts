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
  storeType: [],
};

export const addOutletsSchema = Yup.object().shape({
  outletName: Yup.string().required('Please fill this field'),
  // storeType: Yup.string().required('Please fill this field'),
  storeType: Yup.array()
    .of(Yup.string().required('Each item must be a string'))
    .min(1, 'Please select at least one store type')
    .required('Please fill this field'),
  region: Yup.string().required('Please fill this field'),
  city: Yup.string().required('Please fill this field'),
  address: Yup.string().required('Please fill this field'),
  managerName: Yup.string().required('Please fill this field'),
  managerMobile: Yup.string()
    .required('Please fill this field')
    .matches(/^03\d{9}$/, 'Invalid number.'),
  outletPocName: Yup.string().required('Please fill this field'),
  outletPocContactNumber: Yup.string()
    .required('Please fill this field')
    .matches(/^03\d{9}$/, 'Invalid number.'),
  outletPocEmail: Yup.string()
    .email('Not a valid email')
    .required('Please fill this field'),
  outletLongitude: Yup.number(),
  outletLatitude: Yup.number(),
  outletImage: Yup.mixed()
    .required('Please fill this field')
    .test(
      'fileType',
      'Only JPEG, JPG, or PDF files are allowed',
      (value: any) => {
        if (!value) return true; // Allow empty value (optional)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
        return value && allowedTypes.includes(value.type);
      },
    ),
  categoryCode: Yup.string().required('Please fill this field'),
  // numberOfTillsRequired: Yup.string().required('Please fill this field'),
});
