import * as Yup from 'yup';

export const pnpAttachmentsFormInitialValues = {
  certifiedCopyOfLatestFormAformBOrFormII: null,
  commencementOfBusinessCertificateForPublicLTD: null,
  fatcaForm: null,
  memorandumOfAssociationAllPagesScan: null,
  certificateOfIncorporation: null,
  boardResolutionAuthorizingAnIndividualDirectorManager: null,
  certifiedCopyOfForm29AllPagesScans: null,
  accountMaintainanceCerificateFromYourExternalBank: null,
  crsEntityForm: null,
  cnicsOfAllDirectorsAuthorizedSignatories: null,
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

const pnpAttachmentsFormSchema = Yup.object().shape({
  certifiedCopyOfLatestFormAformBOrFormII: Yup.mixed()
    .required('Certified copy of Latest Form A form B or Form II is required')
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

  commencementOfBusinessCertificateForPublicLTD: Yup.mixed()
    .required('Commencement of business certificate for Public LTD is required')
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

  fatcaForm: Yup.mixed()
    .required('FATCA Form is required')
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

  memorandumOfAssociationAllPagesScan: Yup.mixed()
    .required('Memorandum of Association All Pages Scan is required')
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

  certificateOfIncorporation: Yup.mixed()
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

  boardResolutionAuthorizingAnIndividualDirectorManager: Yup.mixed()
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

  certifiedCopyOfForm29AllPagesScans: Yup.mixed()
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

  accountMaintainanceCerificateFromYourExternalBank: Yup.mixed()
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

  crsEntityForm: Yup.mixed()
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

  cnicsOfAllDirectorsAuthorizedSignatories: Yup.mixed()
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

export default pnpAttachmentsFormSchema;
