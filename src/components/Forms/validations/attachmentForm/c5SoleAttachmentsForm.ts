import * as Yup from 'yup';

export const C5soleAttachmentFormInitialValues = {
  cnicFront: null,
  cnicBack: null,
  selfie: null,
  certificate: null,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword',
];

const C5soleAttachmentFormSchema = Yup.object().shape({
  cnicFront: Yup.mixed()
    .required('CNIC Front is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!Array.isArray(value)) return false;

        for (const file of value) {
          if (!(file instanceof File)) return false;
          if (!SUPPORTED_FORMATS.includes(file.type)) {
            console.log('Unsupported file type:', file.type);
            return false;
          }
        }

        return true;
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
      if (!Array.isArray(value)) return false;

      for (const file of value) {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) {
          console.log('File too large:', file.name, file.size);
          return false;
        }
      }

      return true;
    }),

  cnicBack: Yup.mixed()
    .required('CNIC Back is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!Array.isArray(value)) return false;

        for (const file of value) {
          if (!(file instanceof File)) return false;
          if (!SUPPORTED_FORMATS.includes(file.type)) {
            console.log('Unsupported file type:', file.type);
            return false;
          }
        }

        return true;
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
      if (!Array.isArray(value)) return false;

      for (const file of value) {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) {
          console.log('File too large:', file.name, file.size);
          return false;
        }
      }

      return true;
    }),

  selfie: Yup.mixed()
    .required('Selfie is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!Array.isArray(value)) return false;

        for (const file of value) {
          if (!(file instanceof File)) return false;
          if (!SUPPORTED_FORMATS.includes(file.type)) {
            console.log('Unsupported file type:', file.type);
            return false;
          }
        }

        return true;
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
      if (!Array.isArray(value)) return false;

      for (const file of value) {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) {
          console.log('File too large:', file.name, file.size);
          return false;
        }
      }

      return true;
    }),

  certificate: Yup.mixed()
    .required('Certificate is required')
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!Array.isArray(value)) return false;

        for (const file of value) {
          if (!(file instanceof File)) return false;
          if (!SUPPORTED_FORMATS.includes(file.type)) {
            console.log('Unsupported file type:', file.type);
            return false;
          }
        }

        return true;
      },
    )
    .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
      if (!Array.isArray(value)) return false;

      for (const file of value) {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) {
          console.log('File too large:', file.name, file.size);
          return false;
        }
      }

      return true;
    }),
});

export default C5soleAttachmentFormSchema;
