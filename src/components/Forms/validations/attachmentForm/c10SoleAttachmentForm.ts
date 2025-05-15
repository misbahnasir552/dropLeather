import * as Yup from 'yup';

export const C10soleAttachmentFormInitialValues = {
  validIdentityDocument: null,
  ntnCertificate: null,
  soleProprietorshipDeclaration: null,
  accountOpeningRequisition: null,
  proofOfSourceOfIncome: null,
  crsForm: null,
  w8Benform: null,
  accountMaintainanceCertificateFromYourExternalBank: null,
  optional1: null,
  optional2: null,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

const fileValidation = Yup.mixed()
  .test('required', 'This file is required', (value: any) => {
    return Array.isArray(value) && value.length > 0;
  })
  .test(
    'fileType',
    'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
    (value: any) => {
      if (!Array.isArray(value) || value.length === 0) return true; // Skip if required check fails
      return value.every(
        (file: any) =>
          file instanceof File && SUPPORTED_FORMATS.includes(file.type),
      );
    },
  )
  .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
    if (!Array.isArray(value) || value.length === 0) return true; // Skip if required check fails
    return value.every(
      (file: any) => file instanceof File && file.size <= MAX_FILE_SIZE,
    );
  });

const C10soleAttachmentFormSchema = Yup.object().shape({
  validIdentityDocument: fileValidation.required(
    'Valid Identity Document is required',
  ),
  ntnCertificate: fileValidation.required('NTN certificate is required'),
  soleProprietorshipDeclaration: fileValidation.required(
    'Sole Proprietorship Declaration is required',
  ),
  accountOpeningRequisition: fileValidation.required(
    'Account Opening Requisition is required',
  ),
  proofOfSourceOfIncome: fileValidation.required(
    'Proof of Source of Income is required',
  ),
  crsForm: fileValidation.required('CRS form is required'),
  w8Benform: fileValidation.required('FATCA W8 Ben form is required'),
  accountMaintainanceCertificateFromYourExternalBank: fileValidation.required(
    'Account Maintainance Certificate is required',
  ),

  optional1: Yup.mixed()
    .nullable()
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!value || !Array.isArray(value) || value.length === 0) return true; // Let required() handle this

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
      if (!value || !Array.isArray(value) || value.length === 0) return true; // Let required() handle this

      for (const file of value) {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) {
          console.log('File too large:', file.name, file.size);
          return false;
        }
      }

      return true;
    }),

  optional2: Yup.mixed()
    .nullable()
    .test(
      'fileType',
      'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
      (value: any) => {
        if (!value || !Array.isArray(value) || value.length === 0) return true; // Let required() handle this

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
      if (!value || !Array.isArray(value) || value.length === 0) return true; // Let required() handle this

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

export default C10soleAttachmentFormSchema;
