import * as Yup from 'yup';

import type { IIPNConfiguration } from './interfaces';

export const ipnConfigurationInitialValues: IIPNConfiguration = {
  url: '',
};

export const ipnConfigurationSchema = Yup.object().shape({
  url: Yup.string().required('Please enter URL'),
});
