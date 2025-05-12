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
  'application/msword',
];

const fileValidation = Yup.mixed()
  .required('This file is required')
  .test(
    'fileType',
    'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
    (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.every(
        (file: any) =>
          file instanceof File && SUPPORTED_FORMATS.includes(file.type),
      );
    },
  )
  .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
    if (!Array.isArray(value)) return false;
    return value.every(
      (file: any) => file instanceof File && file.size <= MAX_FILE_SIZE,
    );
  });

const C10soleAttachmentFormSchema = Yup.object().shape({
  validIdentityDocument: fileValidation.required(
    'Valid Identity Document is required',
  ),
  NTNcertificate: fileValidation.required('NTN certificate is required'),
  soleProprietorshipDeclaration: fileValidation.required(
    'Sole Proprietorship Declaration is required',
  ),
  accountOpeningRequisition: fileValidation.required(
    'Account Opening Requisition is required',
  ),
  ProofOfSourceOfIncome: fileValidation.required(
    'Proof of Source of Income is required',
  ),
  CRSform: fileValidation.required('CRS form is required'),
  W8Benform: fileValidation.required('FATCA W8 Ben form is required'),
  accountMaintainanceCertificateFromYourExternalBank: fileValidation.required(
    'Account Maintainance Certificate is required',
  ),

  optional1: Yup.mixed()
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

  optional2: Yup.mixed()

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

export default C10soleAttachmentFormSchema;
