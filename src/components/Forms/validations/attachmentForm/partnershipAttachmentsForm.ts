import * as Yup from 'yup';

export const partnershipAttachmentsFormInitialValues = {
  cnicsOfAllPartnersAndBeneficialOwners: null,
  attestedCopyOfPartnershipDeedignedByAllPartners: null,
  accountMaintainanceCertificateFromYourExternalBank: null,
  attestedRegistrationCertificateWithRegistrarofFirms: null,
  other: null,
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

const partnershipAttachmentsFormSchema = Yup.object().shape({
  cnicsOfAllPartnersAndBeneficialOwners: Yup.mixed()
    .required('CNICs of all partners and beneficial owners are required')
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

  attestedCopyOfPartnershipDeedignedByAllPartners: Yup.mixed()
    .required(
      'Attested Copy of Partnership Deed signed by All Partners is required',
    )
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

  accountMaintainanceCertificateFromYourExternalBank: Yup.mixed()
    .required(
      'Account Maintenance Certificate from Your External Bank is required',
    )
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

  attestedRegistrationCertificateWithRegistrarofFirms: Yup.mixed()
    .required(
      'Attested Registration Certificate with Registrar of Firms is required',
    )
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

  other: Yup.mixed()
    .nullable()
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
});

export default partnershipAttachmentsFormSchema;
