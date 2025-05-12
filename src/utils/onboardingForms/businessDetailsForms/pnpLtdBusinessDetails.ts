export const pnpLtdBusinessDetailsFormData = {
  pageName: 'Business Details',
  categories: [
    {
      categoryName: 'Business Particulars',
      fields: [
        {
          name: 'accountBusinessDocumentationType',
          label: 'Account/Business Documentation Type',
          type: 'dropdown',
          options: [
            { label: 'Sole Proprietor', value: 'Sole Proprietor' },
            {
              label: 'Public and Private Ltd.',
              value: 'Public and Private Ltd.',
            },
            { label: 'Partnership', value: 'Partnership' },
            // { label: 'Other', value: 'Other' },
            // { label: 'Trusts', value: 'Trusts' },
            // { label: 'Clubs,Societies', value: 'Clubs,Societies' },
            // { label: 'NGO,NPO,Charities', value: 'NGO,NPO,Charities' },
          ],
          required: true,
        },
        // BET Requirement
        // {
        //   name: 'limitCategory',
        //   label: 'Limit Category',
        //   type: 'dropdown',
        //   options: [
        //     {
        //       label: 'C5 (limit of max 500k)',
        //       value: 'C5 (limit of max 500k)',
        //     },
        //     {
        //       label: 'C10 (limit above than 500k)',
        //       value: 'C10 (limit above than 500k)',
        //     },
        //   ],
        //   required: true,
        // },
        {
          name: 'natureofBusiness',
          label: 'Nature of Business',
          type: 'dropdown',
          options: [
            {
              label: 'C5 (limit of max 500k)',
              value: 'C5 (limit of max 500k)',
            },
            {
              label: 'C10 (limit above than 500k)',
              value: 'C10 (limit above than 500k)',
            },
          ],
          required: true,
        },
        // BET Requirement
        // {
        //   name: 'raastEnabled',
        //   label: 'Raast Enabled',
        //   type: 'dropdown',
        //   options: [
        //     { label: 'Yes', value: 'Yes' },
        //     { label: 'No', value: 'No' },
        //   ],
        //   required: true,
        // },
        {
          name: 'establishedSince',
          label: 'Established Since',
          type: 'date',
          required: false,
        },
      ],
    },
    {
      categoryName: 'Business Mode',
      fields: [
        {
          name: 'businessMode',
          label: 'Business Mode',
          type: 'checkBoxInputMulti',
          required: true,
          options: [
            { label: 'Retail Payment', value: 'Retail Payment' },
            { label: 'Online Payment', value: 'Online Payment' },
          ],
        },
      ],
    },
    {
      categoryName: 'Payment Modes  (Select all that required)',
      fields: [
        {
          name: 'paymentModes',
          label: 'Payment Modes',
          type: 'checkBoxInputMulti',
          required: true,
          options: [
            { label: 'Mobile Account', value: 'Mobile Account' },
            { label: 'Easypaisa shop', value: 'Easypaisa shop' },
            { label: 'QR', value: 'QR' },
            { label: 'TILL', value: 'TILL' },
            { label: 'Direct Debit', value: 'Direct Debit' },
            { label: 'Debit/Credit Card', value: 'Debit/Credit Card' },
          ],
        },
      ],
    },
    {
      categoryName: 'Business Type Details',
      fields: [
        {
          name: 'signatoryName',
          label: 'Signatory Name',
          type: 'text',
          required: true,
        },
        {
          name: 'signatoryDateOfBirth',
          label: 'Signatory Date Of Birth',
          type: 'date',
          required: true,
        },
        {
          name: 'signatoryCityAndCountry',
          label: 'Signatory City & Country',
          type: 'text',
          required: true,
        },
        {
          name: 'beneficialOwnerName',
          label: 'Beneficial Owner Name',
          type: 'text',
          required: true,
        },
        {
          name: 'beneficialOwnerIDCardNo',
          label: 'Beneficial Owner ID Card No',
          type: 'text',
          required: true,
        },
        {
          name: 'beneficialOwnerDateOfBirth',
          label: 'Beneficial Owner Date Of Birth',
          type: 'date',
          required: true,
        },
        {
          name: 'beneficialOwnerCityAndCountry',
          label: 'Beneficial Owner City & Country',
          type: 'text',
          required: true,
        },
        {
          name: 'shareholdingEntities',
          label: 'Shareholding Entities',
          type: 'text',
          required: true,
        },
        {
          name: 'relatedParties',
          label: 'Related Parties',
          type: 'text',
          required: true,
        },
        {
          name: 'directorName',
          label: 'Director Name',
          type: 'text',
          required: true,
        },
        {
          name: 'directorIdCardNo',
          label: 'Director Id Card No',
          type: 'text',
          required: true,
        },
        {
          name: 'directorDateOfBirth',
          label: 'Director Date Of Birth',
          type: 'date',
          required: true,
        },
        {
          name: 'directorCityAndCountry',
          label: 'Director City & Country',
          type: 'text',
          required: true,
        },
        {
          name: 'signatoryIdCardNo',
          label: 'Signatory Id Card No',
          type: 'text',
          required: true,
        },

        // {
        //   name: 'registerUnRegister',
        //   label: 'Register/UnRegister',
        //   type: 'dropdown',
        //   options: [
        //     { label: 'Yes', value: 'Yes' },
        //     { label: 'No', value: 'No' },
        //   ],
        //   required: true,
        // },
        {
          name: 'specialCustomer',
          label: 'Special Customer',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'registrationIncorporationNo',
          label: 'Registration/Incorporation No',
          type: 'text',
          required: true,
        },
        {
          name: 'placeOfIncorporationOrRegistration',
          label: 'Place of Incorporation or Registration',
          type: 'text',
          required: true,
        },
        {
          name: 'geographiesInvolved',
          label: 'Geographies Involved',
          type: 'text',
          required: true,
        },
        {
          name: 'expectedTypeOfCounterParties',
          label: 'Expected Type of Counter-Parties',
          type: 'text',
          required: true,
        },
        {
          name: 'intendedNatureOfBusinessRelations',
          label: 'Intended nature of business relations',
          type: 'text',
          required: true,
        },
        {
          name: 'expectedModesOfTransactionsDeliveryChannels',
          label: 'Expected modes of transactions/ delivery channels',
          type: 'text',
          required: true,
        },
        {
          name: 'industrySegment',
          label: 'Industry/Segment',
          type: 'text',
          required: true,
        },
        {
          name: 'product',
          label: 'Product',
          type: 'dropdown',
          options: [
            { label: 'Cash', value: 'Cash' },
            { label: 'Loan', value: 'Loan' },
            { label: 'Deposit', value: 'Deposit' },
            { label: 'Bills Payment', value: 'Bills Payment' },
            {
              label: 'Foreign Inward Remittance',
              value: 'Foreign Inward Remittance',
            },
            { label: ' Branchless', value: ' Branchless' },
            { label: ' IBFT', value: ' IBFT' },
            { label: ' Online Transfer', value: ' Online Transfer' },
            { label: ' Other', value: ' Other' },
          ],
          required: true,
        },
        {
          name: 'nationality',
          label: 'Nationality',
          type: 'dropdown',
          options: [
            { label: 'Resident', value: 'Resident' },
            { label: 'Non-Resident', value: 'Non-Resident' },
          ],
          required: true,
        },
      ],
    },
    {
      categoryName: 'Nature of Activity',
      fields: [
        {
          name: 'natureOfActivity',
          label: 'Nature of Activity',
          type: 'checkBoxInputMulti',
          required: true,
          options: [
            {
              label: 'Payment to Suppliers/Vendors',
              value: 'Payment to Suppliers/Vendors',
            },
            {
              label: 'Receiving & Payments From / To Customers',
              value: 'Receiving & Payments From / To Customers',
            },
          ],
        },
      ],
    },
    {
      categoryName: 'Customer Details',
      fields: [
        {
          name: 'incomeStatusSalaried',
          label: 'Income Status (Salaried)',
          type: 'dropdown',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'currentSalaryIncome',
          label: 'Current Salary / Income',
          type: 'text',
          required: true,
        },
        {
          name: 'currentDailyTransactionPKR',
          label: 'Current Daily Transaction (PKR)',
          type: 'text',
          required: true,
        },
        {
          name: 'anyOtherDetails',
          label: 'Any Other Details',
          type: 'text',
          required: true,
        },
        {
          name: 'associationToHighRiskBusiness',
          label: 'Association to High Risk Business',
          type: 'dropdown',
          options: [
            {
              label: 'High Risk Business / Person',
              value: 'High Risk Business / Person',
            },
            {
              label: 'Medium Risk Business / Person',
              value: 'Medium Risk Business / Person',
            },
            {
              label: 'Low Risk Business / Person',
              value: '   Low Risk Business / Person',
            },
          ],
          required: true,
        },
        {
          name: 'highRiskType',
          label: 'High Risk Type',
          type: 'dropdown',
          options: [{ label: 'High Risk Type', value: 'High Risk Type' }],
          required: true,
        },
        {
          name: 'mediumRiskType',
          label: 'Medium Risk Type',
          type: 'dropdown',
          options: [{ label: 'Medium Risk Type', value: 'Medium Risk Type' }],
          required: true,
        },
        {
          name: 'lowRiskType',
          label: 'Low Risk Type',
          type: 'dropdown',
          options: [{ label: 'Low Risk Type', value: 'Low Risk Type' }],
          required: true,
        },

        {
          name: 'sourceOfFunds',
          label: 'Source of Funds',
          type: 'text',
          required: true,
        },
        {
          name: 'currentMonthlyTransactionPKR',
          label: 'Current Monthly Transaction (PKR)',
          type: 'dropdown',
          required: true,
          options: [
            { label: '1000 - 24999', value: '1000 - 24999' },
            { label: '25000 - 49999', value: '25000 - 49999' },
            { label: '50000 - 74999', value: '50000 - 74999' },
            { label: '75000 - 99999', value: '75000 - 99999' },
            { label: '100000 and Above', value: '100000 and Above' },
          ],
          // DO NOT REMOVE CODE BELOW
          // options: [
          //   {
          //     label: 'C5 (limit of max 500k)',
          //     value: 'C5 (limit of max 500k)',
          //   },
          //   {
          //     label: 'C10 (limit above than 500k)',
          //     value: 'C10 (limit above than 500k)',
          //   },
          // ],
        },

        // Sole Above
        // { label: 'Current Salar/Income', value: 'abc' },
      ],
    },
    {
      categoryName: 'Account Profile / Transaction Activity',
      fields: [
        {
          name: 'expectedMonthlyDebitTransactions',
          label: 'Expected monthly Debit turnover (No. of transactions)',
          type: 'text',
          required: true,
        },
        {
          name: 'expectedMonthlyDebitAmount',
          label: 'Expected monthly Debit turnover (amount)',
          type: 'text',
          required: true,
        },
        {
          name: 'expectedMonthlyCreditTransactions',
          label: 'Expected monthly credit turnover (No. of transactions)',
          type: 'text',
          required: true,
        },
        {
          name: 'expectedMonthlyCreditAmount',
          label: 'Expected monthly credit turnover (amount)',
          type: 'text',
          required: true,
        },
        {
          name: 'annualTurnoverCredit',
          label: 'Annual Turnover (Credit)',
          type: 'text',
          required: true,
        },
        {
          name: 'annualTurnoverDebit',
          label: 'Annual Turnover (Debit)',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
