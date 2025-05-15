import * as Yup from 'yup';

export const partnershipAttachmentsFormInitialValues = {
  validIdentityDocument: null,
  // cnicsOfAllPartnersAndBeneficialOwners: null,
  attestedCopyOfPartnershipDeedignedByAllPartners: null,
  authorityLetter: null,
  crsEntityForm: null,
  accountMaintainanceCertificateFromYourExternalBank: null,
  w8BenE: null,
  attestedRegistrationCertificateWithRegistrarofFirms: null,
  other: null,
  optional1: null,
  optional2: null,
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
  // cnicsOfAllPartnersAndBeneficialOwners: Yup.mixed()
  //   .required('CNICs of all partners and beneficial owners are required')
  //   .test(
  //     'fileType',
  //     'Unsupported file format. Allowed formats are: pdf, png, jpeg, doc.',
  //     (value: any) => {
  //       if (!Array.isArray(value)) return false;

  //       for (const file of value) {
  //         if (!(file instanceof File)) return false;
  //         if (!SUPPORTED_FORMATS.includes(file.type)) {
  //           console.log('Unsupported file type:', file.type);
  //           return false;
  //         }
  //       }

  //       return true;
  //     },
  //   )
  //   .test('fileSize', 'File size must not exceed 10MB.', (value: any) => {
  //     if (!Array.isArray(value)) return false;

  //     for (const file of value) {
  //       if (!(file instanceof File)) return false;
  //       if (file.size > MAX_FILE_SIZE) {
  //         console.log('File too large:', file.name, file.size);
  //         return false;
  //       }
  //     }

  //     return true;
  //   }),

  validIdentityDocument: Yup.mixed()
    .required(
      'Copy of the applicable valid identity document of all partners is required',
    )
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

  attestedCopyOfPartnershipDeedignedByAllPartners: Yup.mixed()
    .required(
      'Attested Copy of Partnership Deed signed by All Partners is required',
    )
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

  authorityLetter: Yup.mixed()
    .required(
      'Authority letter, in original, signed by all partners is required',
    )
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

  crsEntityForm: Yup.mixed()
    .required('CRS entity form is required')
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

  w8BenE: Yup.mixed()
    .required('W8 BEN E form is required')
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

  accountMaintainanceCertificateFromYourExternalBank: Yup.mixed()
    .required(
      'Account Maintenance Certificate from Your External Bank is required',
    )
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

  attestedRegistrationCertificateWithRegistrarofFirms: Yup.mixed()
    .required(
      'Attested Registration Certificate with Registrar of Firms is required',
    )
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

  other: Yup.mixed()
    .nullable()
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

export default partnershipAttachmentsFormSchema;
