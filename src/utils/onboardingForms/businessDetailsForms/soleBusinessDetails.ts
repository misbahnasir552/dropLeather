export const BusinessDetailsFormData = {
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
            { label: 'Other', value: 'Other' },
            { label: 'Trusts', value: 'Trusts' },
            { label: 'Clubs,Societies', value: 'Clubs,Societies' },
            { label: 'NGO,NPO,Charities', value: 'NGO,NPO,Charities' },
          ],
          required: true,
        },
        {
          name: 'limitCategory',
          label: 'Limit Category',
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
        {
          name: 'raastEnabled',
          label: 'Raast Enabled',
          type: 'dropdown',
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
          required: true,
        },
        {
          name: 'Established Since',
          label: 'establishedSince',
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
      categoryName: 'Payment Modes',
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
          name: 'permanentAddress',
          label: 'Permanent Address',
          type: 'text',
          required: false,
        },
        {
          name: 'fatcaStatus',
          label: 'FATCA Status',
          type: 'text',
          required: false,
        },
        {
          name: 'crsStatus',
          label: 'CRS status',
          type: 'text',
          required: false,
        },
        {
          name: 'mandateName',
          label: 'Mandate Name',
          type: 'text',
          required: false,
        },
        {
          name: 'mandateIdCardNumber',
          label: 'Mandate Id Card Number',
          type: 'text',
          required: false,
        },
        {
          name: 'mandateRelationshipWithAccountHolder',
          label: 'Mandate relationship with account holder',
          type: 'text',
          required: false,
        },
        {
          name: 'dateOfIssuanceOfApplicableIdentityDocument',
          label: 'Date of issuance of applicable identity document',
          type: 'text',
          required: false,
        },
        {
          name: 'beneficialOwnerControllingRights',
          label: 'Beneficial Owner/Controlling Rights',
          type: 'text',
          required: false,
        },
        {
          name: 'mandateDateOfBirth',
          label: 'Mandate Date of Birth',
          type: 'text',
          required: false,
        },
        {
          name: 'mandatePlaceOfBirth',
          label: 'Mandate Place of Birth',
          type: 'text',
          required: false,
        },
        {
          name: 'cityAndCountry',
          label: 'City and Country',
          type: 'text',
          required: false,
        },
        {
          name: 'nextOfKinCnic',
          label: 'Next of KIN CNIC',
          type: 'text',
          required: true,
        },
        {
          name: 'nextOfKinRelationship',
          label: 'Next of KIN Relationship',
          type: 'text',
          required: true,
        },
        {
          name: 'nextOfKinName',
          label: 'Next of Kin Name',
          type: 'text',
          required: true,
        },
        {
          name: 'dateOfBirth',
          label: 'Date Of Birth',
          type: 'text',
          required: false,
        },
        {
          name: 'registerUnRegister',
          label: 'Register/UnRegister',
          type: 'text',
          required: true,
        },
        {
          name: 'specialCustomer',
          label: 'Special Customer',
          type: 'text',
          required: true,
        },
        {
          name: 'registrationIncorporationNo',
          label: 'Registration/Incorporation No',
          type: 'text',
          required: false,
        },
        {
          name: 'placeOfIncorporationOrRegistration',
          label: 'Place of Incorporation or Registration',
          type: 'text',
          required: false,
        },
        {
          name: 'geographiesInvolved',
          label: 'Geographies Involved',
          type: 'text',
          required: false,
        },
        {
          name: 'expectedTypeOfCounterParties',
          label: 'Expected Type of Counter-Parties',
          type: 'text',
          required: false,
        },
        {
          name: 'intendedNatureOfBusinessRelations',
          label: 'Intended nature of business relations',
          type: 'text',
          required: false,
        },
        {
          name: 'expectedModesOfTransactionsDeliveryChannels',
          label: 'Expected modes of transactions/ delivery channels',
          type: 'text',
          required: false,
        },
        {
          name: 'industrySegment',
          label: 'Industry/Segment',
          type: 'text',
          required: false,
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
          required: false,
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
            {
              label: 'C5 (limit of max 500k)',
              value: 'C5 (limit of max 500k)',
            },
            {
              label: 'C10 (limit above than 500k)',
              value: 'C10 (limit above than 500k)',
            },
          ],
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
