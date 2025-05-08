import * as Yup from 'yup';

export const soleAttachmentFormInitialValues = {
  cnicFront: null,
  cnicBack: null,
  selfie: null,
  certificate: null,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

const soleAttachmentFormSchema = Yup.object().shape({
  cnicFront: Yup.mixed()
    .required('CNIC Front is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false; // Field is required
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type); // Check type exists
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  cnicBack: Yup.mixed()
    .required('CNIC Back is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false; // Field is required
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type); // Check type exists
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  selfie: Yup.mixed()
    .required('Selfie is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value) => {
        if (!value) return false; // Field is required
        return value instanceof File && SUPPORTED_FORMATS.includes(value.type); // Check type exists
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value) => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  certificate: Yup.mixed()
    .required('Certificate is required')
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
});

export default soleAttachmentFormSchema;
