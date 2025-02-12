import * as Yup from 'yup';

import type { BusinessNatureForm } from '@/interfaces/interface';

export const businessNatureInitialValues: BusinessNatureForm = {
  businessNature: '',
  // corporateProducts: 'N/A',
  // managedDisbursementProducts: 'N/A',
  // othersProducts: 'N/A',
  // selfServeProducts: 'N/A',
  // chequeBookRequired: '',
};

export const businessNatureSchema = Yup.object().shape({
  businessNature: Yup.string().required('Please select atleast one option'),
  // corporateProducts: Yup.string(),
  // managedDisbursementProducts: Yup.string(),
  // othersProducts: Yup.string(),
  // selfServeProducts: Yup.string(),
  // chequeBookRequired: Yup.string().required('Please select an option'),
});
