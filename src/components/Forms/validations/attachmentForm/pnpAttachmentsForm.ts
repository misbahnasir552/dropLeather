import * as Yup from 'yup';

export const pnpAttachmentsFormInitialValues = {
  // certifiedCopyOfLatestFormAformBOrFormII: null,
  // commencementOfBusinessCertificateForPublicLTD: null,
  fatcaForm: null,
  // memorandumOfAssociationAllPagesScan: null,
  // certificateOfIncorporation: null,
  boardResolutionAuthorizingAnIndividualDirectorManager: null,
  // certifiedCopyOfForm29AllPagesScans: null,
  accountMaintainanceCerificateFromYourExternalBank: null,
  crsEntityForm: null,
  cnicsOfAllDirectorsAuthorizedSignatories: null,
  w8BenE: null,
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

const pnpAttachmentsFormSchema = Yup.object().shape({
  // certifiedCopyOfLatestFormAformBOrFormII: Yup.mixed()
  //   .required('Certified copy of Latest Form A form B or Form II is required')
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

  // commencementOfBusinessCertificateForPublicLTD: Yup.mixed()
  //   .required('Commencement of business certificate for Public LTD is required')
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

  fatcaForm: Yup.mixed()
    .required('FATCA Form is required')
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
  // memorandumOfAssociationAllPagesScan: Yup.mixed()
  //   .required('Memorandum of Association All Pages Scan is required')
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

  // certificateOfIncorporation: Yup.mixed()
  //   .nullable()
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

  boardResolutionAuthorizingAnIndividualDirectorManager: Yup.mixed()
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
  // certifiedCopyOfForm29AllPagesScans: Yup.mixed()
  //   .nullable()
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

  accountMaintainanceCerificateFromYourExternalBank: Yup.mixed()
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
  crsEntityForm: Yup.mixed()
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

  cnicsOfAllDirectorsAuthorizedSignatories: Yup.mixed()
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

  w8BenE: Yup.mixed()
    .required('W8 Ben E Form is required')
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

export default pnpAttachmentsFormSchema;
