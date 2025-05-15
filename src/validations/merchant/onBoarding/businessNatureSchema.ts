import * as Yup from 'yup';

import type { BusinessNatureForm } from '@/interfaces/interface';

export const businessNatureInitialValues: BusinessNatureForm = {
  businessNature: '',
};

export const businessNatureSchema = Yup.object().shape({
  businessNature: Yup.string().required('Please select atleast one option'),
});
