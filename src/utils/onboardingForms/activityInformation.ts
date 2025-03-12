export const ActivityInformationFormData = {
  pageName: 'Activity Information',
  categories: [
    {
      categoryName: "Merchant's Detail",
      fields: [
        {
          name: 'businessOwnerName',
          label: 'Business Owner Name (Signatory name as per CNIC)',
          type: 'text',
          required: true,
        },
        {
          name: 'ownerOfCNIC',
          label: 'Owner of CNIC/Signatory CNIC',
          type: 'text',
          required: true,
        },

        {
          name: 'fatherSpouseName',
          label: 'Father / Spouse Name',
          type: 'text',
          required: true,
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ],
        },

        {
          name: 'purposeOfAccount',
          label: 'Purpose of Account',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Online Payment', value: 'Online Payment' },
            { label: 'Retail Payments', value: 'Retail Payments' },
            { label: 'Mini App', value: 'Mini App' },
          ],
        },

        {
          name: 'citizenship',
          label: 'Citizenship',
          type: 'dropdown',
          required: true,
          options: [{ label: 'Pakistan', value: 'Pakistan' }],
        },

        {
          name: 'businessName',
          label: 'Business Name',
          type: 'text',
          required: true,
        },
        {
          name: 'legalName',
          label: 'Legal Name',
          type: 'text',
          required: true,
        },
        {
          name: 'ntnNO',
          label: 'NTN No',
          type: 'text',
          required: true,
        },
        {
          name: 'dateOfCorporation',
          label: 'Date of Corporation',
          type: 'date',
          required: true,
        },
        {
          name: 'terrorFinancing',
          label: 'Terror Financing',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'politicallyExposed',
          label: 'Politically Exposed',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },

        {
          name: 'residency',
          label: 'Residency',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
      ],
    },

    {
      categoryName: 'Contact Details',
      fields: [
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
        },
        {
          name: 'businessAddress',
          label: 'Business Address',
          type: 'text',
          required: true,
        },
        {
          name: 'correspondenceAddress',
          label: 'Correspondence Address',
          type: 'text',
          required: true,
        },
        {
          name: 'accountHandlerIsdifferentfromOwnerAccountHolder',
          label: 'Account Handler is different from Owner/Account Holder',
          type: 'dropdown',
          required: true,
          options: [{ label: 'API', value: 'API' }],
        },
        {
          name: 'primaryPhoneNo',
          label: 'Primary Phone No',
          type: 'text',
          required: true,
        },
        {
          name: 'secondaryPhoneNo',
          label: 'Secondary Phone No',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
};
