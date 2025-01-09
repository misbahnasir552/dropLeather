import * as Yup from 'yup';

import type { CorporateDocumentsInfo } from '@/interfaces/interface';

export const CorporateDocumentsInfoInitialValues: CorporateDocumentsInfo = {
  boForm: null,
  cddForm: null,
  eddForm: null,
};

const SUPPORTED_FORMATS = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword',
];
const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const CorporateDocumentsInfoInfoSchema = Yup.object().shape({
  boForm: Yup.mixed()
    .nullable() // Ensure the field can be null before validation
    .required('BO Form is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false; // Field is required
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type); // Check type exists
      },
    )
    .test('fileSize', 'File size must not exceed 2MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  cddForm: Yup.mixed()
    .nullable()
    .required('CDD Form is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false;
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
      },
    )
    .test('fileSize', 'File size must not exceed 2MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  eddForm: Yup.mixed()
    .nullable()
    .required('EDD Form is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false;
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
      },
    )
    .test('fileSize', 'File size must not exceed 2MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),
});
