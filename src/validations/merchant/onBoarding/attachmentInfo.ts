import * as Yup from 'yup';

import type { AttachmentFormInfo } from '@/interfaces/interface';

export const AttachmentFormInfoInitialValues: AttachmentFormInfo = {
  // accountMaintananceCertificate: null,
  accountMaintainanceCertificate: null,
  externalBank: null,
  livePicture: null,
  cnicFront: null,
  cnicBack: null,
};

export const AttachmentFormInfoSchema = Yup.object().shape({
  accountMaintainanceCertificate: Yup.mixed().required(
    'Account Maintainance Certificate is required',
  ),
  externalBank: Yup.mixed().required('Your External Bank is required'),
  livePicture: Yup.mixed().required(
    'Live Picture or Digital Photo is required',
  ),
  cnicFront: Yup.mixed().required('CNIC Front is required'),
  cnicBack: Yup.mixed().required('CNIC Back is required'),
});

// accountMaintananceCertificate: Yup.mixed()
//   .required('Please select a file') // Required validation
//   .test('fileType', 'Unsupported file format', (value) => {
//     if (!value) return true; // Allow null (no file selected)

//     const supportedFormats = ['image/jpeg', 'image/png', 'application/pdf']; // Add more supported formats as needed
//     return supportedFormats.includes(value.type);
//   }),
