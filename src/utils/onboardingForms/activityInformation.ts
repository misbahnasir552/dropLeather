import { cityList } from '@/utils/dropdown-list/cityList';
import { countryList } from '@/utils/dropdown-list/countryList';

export const ActivityInformationFormData = {
  pageName: 'Activity Information',
  categories: [
    {
      categoryName: "Merchant's Detail",
      fields: [
        {
          name: 'businessOwnerName',
          label: 'Signatory name as per CNIC',
          type: 'text',
          required: true,
        },
        {
          name: 'ownerOfCNIC',
          label: 'Signatory CNIC',
          type: 'text',
          required: true,
        },

        {
          name: 'fatherSpouseName',
          label: 'Father / Husband / Spouse Name',
          type: 'text',
          required: true,
          desclaimer: '( as per CNIC )',
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
            { label: 'Retail Payments', value: 'Retail Payments' },
            // DO NOT REMOVE COMMENTED CODE
            // { label: 'Online Payment', value: 'Online Payment' },
            // { label: 'Retail Payments', value: 'Retail Payments' },
            // { label: 'Mini App', value: 'Mini App' },
          ],
        },

        {
          name: 'citizenship',
          label: 'Citizenship',
          type: 'dropdown',
          required: true,
          options: countryList,
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
          desclaimer: '( as per Registration Certificate )',
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
          options: countryList,
        },
      ],
    },

    {
      categoryName: 'Contact Details',
      fields: [
        {
          name: 'email',
          label: 'Email Address',
          type: 'disabledInput',
          required: true,
        },
        {
          name: 'city',
          label: 'City',
          type: 'dropdown',
          required: true,
          options: cityList,
        },
        {
          name: 'businessAddress',
          label: 'Business Address',
          type: 'text',
          required: true,
        },
        {
          name: 'correspondenceAddress',
          label:
            'Click here if correspondence address is same as business address',
          type: 'checkItem',
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
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'primaryPhoneNo',
          label: 'Primary Phone No',
          type: 'disabledInput',
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
