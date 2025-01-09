import * as Yup from 'yup';

import type { ChangeAccountRequest } from '@/interfaces/interface';

export const changeAccountRequestInitialValues: ChangeAccountRequest = {
  typeOfRequest: '',
  requestLabel: '',
  uploads: [null], // Initialize with one empty file field

  corporateProducts: 'N/A',
  managedDisbursementProducts: 'N/A',
  othersProducts: 'N/A',
  selfServeProducts: 'N/A',
  chequeBookRequired: '',
};

const SUPPORTED_FORMATS = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword',
];

export const changeAccountRequestSchema = Yup.object().shape({
  typeOfRequest: Yup.string().required('Request Type is required'),
  requestLabel: Yup.string().required('Document Name is required'),
  uploads: Yup.array()
    .of(
      Yup.mixed()
        .nullable()
        .required('File is required')
        .test(
          'fileType',
          'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
          (value) => {
            if (!value) return false; // Required validation
            return (
              value instanceof File && SUPPORTED_FORMATS.includes(value.type)
            );
          },
        ),
    )
    .min(1, 'At least one file must be uploaded'),
  corporateProducts: Yup.string(),
  managedDisbursementProducts: Yup.string(),
  othersProducts: Yup.string(),
  selfServeProducts: Yup.string(),
  chequeBookRequired: Yup.string().required('Please select an option'),
});
