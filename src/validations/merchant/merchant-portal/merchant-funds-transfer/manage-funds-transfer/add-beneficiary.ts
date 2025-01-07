import * as Yup from 'yup';

import type { IAddBeneficiary } from './interfaces';

export const addBeneficiaryInitialValues: IAddBeneficiary = {
  accountType: '',
  mobileNumber: '',
  bankName: '',
  accountTitle: '',
  beneficiaryName: '',
  beneficiaryEmail: '',
};

export const addBeneficiarySchema = Yup.object().shape({
  accountType: Yup.string().required('Field is required'),
  mobileNumber: Yup.string().required('Field is required'),
  bankName: Yup.string().required('Field is required'),
  accountTitle: Yup.string().required('Field is required'),
  beneficiaryName: Yup.string().required('Field is required'),
  beneficiaryEmail: Yup.string(),
});
