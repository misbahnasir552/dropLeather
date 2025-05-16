// Sole Documents
export const C5soleProprietorAttachmentsFormData = {
  pageName: 'Attachments',
  categories: [
    {
      categoryName: 'Upload Documents(What would you like to integrate)',
      fields: [
        {
          label: 'CNIC Front',
          name: 'cnicFront',
          type: 'file',
          required: true,
        },
        {
          label: 'CNIC Back',
          name: 'cnicBack',
          type: 'file',
          required: true,
        },
        {
          label: 'Selfie',
          name: 'selfie',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Account maintenance certificate from  your external bank',
          name: 'certificate',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional1',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional2',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
};

export const C10soleProprietorAttachmentsFormData = {
  pageName: 'Attachments',
  categories: [
    {
      categoryName: 'Upload Documents(What would you like to integrate)',
      fields: [
        {
          label:
            'Copy of the applicable valid identity document of sole proprietor/beneficial owner and signatory',
          name: 'validIdentityDocument',
          type: 'file',
          required: true,
        },
        {
          label: 'NTN certificate',
          name: 'ntnCertificate',
          type: 'file',
          required: true,
        },
        {
          label: 'Declaration of sole proprietorship on business letterhead',
          name: 'soleProprietorshipDeclaration',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Account opening requisition on business letterhead',
          name: 'accountOpeningRequisition',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Proof of source of income',
          name: 'proofOfSourceOfIncome',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'CRS form',
          name: 'crsForm',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'FATCA W8 Ben form',
          name: 'w8Benform',
          type: 'file',
          required: true,
        },
        {
          label: 'Account Maintainance Certificate From Your External Bank',
          name: 'accountMaintainanceCertificateFromYourExternalBank',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional1',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional2',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
};

// Partnership Documents

export const partnershipAttachmentsFormData = {
  pageName: 'Attachments',
  categories: [
    {
      categoryName: 'Upload Documents(What would you like to integrate)',
      fields: [
        {
          label:
            'Copy of the applicable valid identity document of all partners,beneficial owner and authorized signatory',
          name: 'validIdentityDocument',
          type: 'file',
          required: true,
        },
        // {
        //   label: 'CNICs of all partners and beneficial owners',
        //   name: 'cnicsOfAllPartnersAndBeneficialOwners',
        //   type: 'file',
        //   required: true,
        // },
        {
          label: 'Attested Copy of Partnership Deed signed by All Partners',
          name: 'attestedCopyOfPartnershipDeedignedByAllPartners',
          type: 'file',
          required: true,
        },
        {
          label:
            'Attested Registration Certificate (Form C) With Registrar of Firms',
          name: 'attestedRegistrationCertificateWithRegistrarofFirms',
          type: 'file',
          required: true,
        },
        {
          label:
            'Authority letter, in original, signed by all partners for opening and operating the account',
          name: 'authorityLetter',
          type: 'file',
          required: true,
        },
        {
          label: 'CRS Entity Form',
          name: 'crsEntityForm',
          type: 'file',
          required: true,
        },
        {
          label: 'W8 BEN E',
          name: 'w8BenE',
          type: 'file',
          required: true,
        },
        {
          label: 'Account Maintainance Certificate From Your External Bank',
          name: 'accountMaintainanceCertificateFromYourExternalBank',
          type: 'file',
          required: true,
        },
        {
          label: 'Other',
          name: 'other',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional1',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional2',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
};

// Public and Private Documents

export const pnpAttachmentsFormData = {
  pageName: 'Attachments',
  categories: [
    {
      categoryName: 'Upload Documents(What would you like to integrate)',
      fields: [
        // {
        //   label: 'Certified copy of Latest Form A form B or Form II',
        //   name: 'certifiedCopyOfLatestFormAformBOrFormII',
        //   type: 'file',
        //   required: true,
        // },
        // {
        //   label: 'Commencement of business certificate for Public LTD',
        //   name: 'commencementOfBusinessCertificateForPublicLTD',
        //   type: 'file',
        //   required: true,
        // },
        {
          label: 'FATCA Form',
          name: 'fatcaForm',
          type: 'file',
          required: true,
        },
        // {
        //   label: 'Memorandum of Association All Pages Scan',
        //   name: 'memorandumOfAssociationAllPagesScan',
        //   type: 'file',
        //   required: true,
        // },

        // {
        //   label: 'Certificate of Incorporation',
        //   name: 'certificateOfIncorporation',
        //   type: 'file',
        //   required: false,
        // },
        {
          label: 'Board Resolution authorizing an individual director manager',
          name: 'boardResolutionAuthorizingAnIndividualDirectorManager',
          type: 'file',
          required: false,
        },
        // {
        //   label: 'Certified Copy of Form 2 9 All pages scans',
        //   name: 'certifiedCopyOfForm29AllPagesScans',
        //   type: 'file',
        //   required: false,
        // },
        {
          label: 'Account Maintainance Cerificate From Your External Bank',
          name: 'accountMaintainanceCerificateFromYourExternalBank',
          type: 'file',
          required: false,
        },
        {
          label: 'CRS Entity Form',
          name: 'crsEntityForm',
          type: 'file',
          required: false,
        },
        {
          label: 'CNICs of all Directors Authorized Signatories',
          name: 'cnicsOfAllDirectorsAuthorizedSignatories',
          type: 'file',
          required: false,
        },
        {
          label: 'W8 BEN E',
          name: 'w8BenE',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional1',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional2',
          type: 'file',
          required: false,
        },
        {
          label: 'Optional',
          name: 'optional3',
          type: 'file',
          required: false,
        },
        {
          label: 'Optional',
          name: 'optional4',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
};

// NGO Documents

export const ngoAttachmentsFormData = {
  pageName: 'Attachments',
  categories: [
    {
      categoryName: 'Upload Documents(What would you like to integrate)',
      fields: [
        {
          label: 'CRS',
          name: 'crs',
          type: 'file',
          required: true,
        },
        {
          label: 'W8 BEN E',
          name: 'w8BenE',
          type: 'file',
          required: true,
        },
        {
          label: 'W9',
          name: 'w9',
          type: 'file',
          required: true,
        },
        {
          label: 'Registration documents',
          name: 'registrationDocuments',
          type: 'file',
          required: true,
        },

        {
          label: 'Annual Accounts',
          name: 'annualAccounts',
          type: 'file',
          required: true,
        },
        {
          label: 'Declaration from Governing Body',
          name: 'declarationFromGoverningBody',
          type: 'file',
          required: true,
        },
        {
          label: 'source of income',
          name: 'sourceOfIncome',
          type: 'file',
          required: true,
        },
        {
          label: 'List of major donors',
          name: 'listOfMajorDonors',
          type: 'file',
          required: true,
        },
        {
          label: 'Sample Doc',
          name: 'sampleDoc',
          type: 'file',
          required: true,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional1',
          type: 'file',
          required: false,
        },
        {
          // label: 'Certificate',
          label: 'Optional',
          name: 'optional2',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
};
