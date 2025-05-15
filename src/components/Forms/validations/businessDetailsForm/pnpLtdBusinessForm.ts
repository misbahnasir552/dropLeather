import * as Yup from 'yup';

export const pnpLtdBusinessDetailsFormInitialValues = {
  accountBusinessDocumentationType: '',
  limitCategory: '',
  natureofBusiness: '',
  raastEnabled: '',
  establishedSince: '',
  businessMode: [],
  paymentModes: [],
  signatoryName: '',
  signatoryDateOfBirth: '',
  signatoryCityAndCountry: '',
  beneficialOwnerName: '',
  beneficialOwnerIDCardNo: '',
  beneficialOwnerDateOfBirth: '',
  beneficialOwnerCityAndCountry: '',
  shareholdingEntities: '',
  relatedParties: '',
  directorName: '',
  directorIdCardNo: '',
  directorDateOfBirth: '',
  directorCityAndCountry: '',
  signatoryIdCardNo: '',
  // permanentAddress: '',
  // fatcaStatus: '',
  // crsStatus: '',
  // mandateName: '',
  // mandateIdCardNumber: '',
  // mandateRelationshipWithAccountHolder: '',
  // dateOfIssuanceOfApplicableIdentityDocument: '',
  // beneficialOwnerControllingRights: '',
  // mandateDateOfBirth: '',
  // mandatePlaceOfBirth: '',
  // cityAndCountry: '',
  // nextOfKinCnic: '',
  // nextOfKinRelationship: '',
  // nextOfKinName: '',
  // dateOfBirth: '',
  // registerUnRegister: '',
  specialCustomer: '',
  registrationIncorporationNo: '',
  placeOfIncorporationOrRegistration: '',
  geographiesInvolved: '',
  expectedTypeOfCounterParties: '',
  intendedNatureOfBusinessRelations: '',
  expectedModesOfTransactionsDeliveryChannels: '',
  industrySegment: '',
  product: '',
  nationality: '',
  natureOfActivity: [],
  incomeStatusSalaried: '',
  currentSalaryIncome: '',
  currentDailyTransactionPKR: '',
  anyOtherDetails: '',
  associationToHighRiskBusiness: '',
  highRiskType: '',
  mediumRiskType: '',
  lowRiskType: '',
  sourceOfFunds: '',
  currentMonthlyTransactionPKR: '',
  expectedMonthlyDebitTransactions: '',
  expectedMonthlyDebitAmount: '',
  expectedMonthlyCreditTransactions: '',
  expectedMonthlyCreditAmount: '',
  annualTurnoverCredit: '',
  annualTurnoverDebit: '',
};

export const pnpLtdBusinessDetailsFormSchema = Yup.object().shape({
  accountBusinessDocumentationType: Yup.string().required(
    'Account/Business Documentation Type is required',
  ),
  // limitCategory: Yup.string().required('Limit Category is required'),
  natureofBusiness: Yup.string().required('Nature of Business is required'),
  // raastEnabled: Yup.string().required('Raast Enabled is required'),

  // BET Requirement
  // establishedSince: Yup.string(),
  // .nullable()
  // .required('Established Since is required'),
  businessMode: Yup.array()
    .min(1, 'Please select at least one Business Mode')
    .required('Business Mode is required'),
  paymentModes: Yup.array()
    .min(1, 'Please select at least one Payment Mode')
    .required('Payment Mode is required'),
  signatoryName: Yup.string()
    .required('Signatory Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  signatoryDateOfBirth: Yup.date().required(
    'Signatory Date Of Birth is required',
  ),
  signatoryCityAndCountry: Yup.string()
    .required('Signatory City & Country is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s,]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  beneficialOwnerName: Yup.string()
    .required('Beneficial Owner Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  beneficialOwnerIDCardNo: Yup.string()
    .required('Beneficial Owner ID Card No is required')
    .matches(/^\d+$/, 'Invalid CNIC')
    .length(13, 'CNIC must be exactly 13 digits'),
  beneficialOwnerDateOfBirth: Yup.date().required(
    'Beneficial Owner Date Of Birth is required',
  ),
  beneficialOwnerCityAndCountry: Yup.string()
    .required('Beneficial Owner City & Country is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s,]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  shareholdingEntities: Yup.string()
    .required('Shareholding Entities is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  relatedParties: Yup.string()
    .required('Related Parties is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  directorName: Yup.string()
    .required('Director Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  directorIdCardNo: Yup.string()
    .required('Director Id Card No is required')
    .matches(/^\d+$/, 'Invalid CNIC')
    .length(13, 'CNIC must be exactly 13 digits'),
  directorDateOfBirth: Yup.date().required(
    'Director Date Of Birth is required',
  ),
  directorCityAndCountry: Yup.string()
    .required('Director City & Country is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s,]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  signatoryIdCardNo: Yup.string()
    .required('Signatory Id Card No is required')
    .matches(/^\d+$/, 'Invalid CNIC')
    .length(13, 'CNIC must be exactly 13 digits'),
  // permanentAddress: Yup.string(),
  // fatcaStatus: Yup.string(),
  // crsStatus: Yup.string(),
  // mandateName: Yup.string(),
  // mandateIdCardNumber: Yup.string(),
  // mandateRelationshipWithAccountHolder: Yup.string(),
  // dateOfIssuanceOfApplicableIdentityDocument: Yup.string(),
  // beneficialOwnerControllingRights: Yup.string(),
  // mandateDateOfBirth: Yup.string(),
  // mandatePlaceOfBirth: Yup.string(),
  // cityAndCountry: Yup.string(),
  // nextOfKinCnic: Yup.string().required('Next of Kin CNIC is required'),
  // nextOfKinRelationship: Yup.string().required(
  //   'Next of Kin Relationship is required',
  // ),
  // nextOfKinName: Yup.string().required('Next of Kin Name is required'),
  // dateOfBirth: Yup.string(),
  // registerUnRegister: Yup.string().required('Register/Unregister is required'),
  specialCustomer: Yup.string().required('Special Customer is required'),
  registrationIncorporationNo: Yup.string()
    .required('Registration/Incorporation No is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  placeOfIncorporationOrRegistration: Yup.string().required(
    'Place of Incorporation or Registration is required',
  ),
  geographiesInvolved: Yup.string()
    .required('Geographies Involved is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  expectedTypeOfCounterParties: Yup.string()
    .required('Expected Type of Counter-Parties is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  intendedNatureOfBusinessRelations: Yup.string()
    .required('Intended nature of business relations is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    // .matches(/^\d+$/, 'Only numbers are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  // BET Requirement
  // expectedModesOfTransactionsDeliveryChannels: Yup.string()
  //   .required('Expected modes of transactions/ delivery channels is required')
  //   .matches(/^\d+$/, 'Only Numeric values are allowed'),
  // BET Requirement
  // industrySegment: Yup.string()
  //   .required('Industry/Segment is required')
  //   .min(3, 'Cannot be less than 3 letters')
  //   .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
  //   .max(60, 'Cannot be more than 60 letters'),
  product: Yup.string().required('Product is required'),
  nationality: Yup.string().required('Nationality is required'),
  natureOfActivity: Yup.array()
    .min(1, 'Please select at least one Nature of Activity')
    .required('Nature of Activity is required'),
  incomeStatusSalaried: Yup.string().required(
    'Income Status (Salaried) is required',
  ),

  currentSalaryIncome: Yup.string().when(
    'incomeStatusSalaried',
    (incomeStatusSalaried, schema) => {
      if (incomeStatusSalaried[0] === 'Yes') {
        return schema
          .required('Current Salary / Income is required is required')
          .matches(/^\d+$/, 'Current Salary / Income Must be numeric value');
      }
      return schema;
    },
  ),
  currentDailyTransactionPKR: Yup.string()
    .required('Current Daily Transaction (PKR) is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  anyOtherDetails: Yup.string().required('Other Details are required'),
  associationToHighRiskBusiness: Yup.string().required(
    'Association to High Risk Business is required',
  ),
  // highRiskType: Yup.string().required('High Risk Type is required'),

  highRiskType: Yup.string().when(
    'associationToHighRiskBusiness',
    (associationToHighRiskBusiness, schema) => {
      if (associationToHighRiskBusiness[0] === 'High Risk Business / Person') {
        return schema.required('High Risk Type is required');
      }
      return schema;
    },
  ),

  lowRiskType: Yup.string().when(
    'associationToHighRiskBusiness',
    (associationToHighRiskBusiness, schema) => {
      if (associationToHighRiskBusiness[0] === 'Low Risk Business / Person') {
        return schema.required('Low Risk Type is required');
      }
      return schema;
    },
  ),

  mediumRiskType: Yup.string().when(
    'associationToHighRiskBusiness',
    (associationToHighRiskBusiness, schema) => {
      if (
        associationToHighRiskBusiness[0] === 'Medium Risk Business / Person'
      ) {
        return schema.required('Medium Risk Type is required');
      }
      return schema;
    },
  ),

  // lowRiskType: Yup.string().required('Low Risk Type is required'),
  // mediumRiskType: Yup.string().required(' Risk Type is required'),
  // riskType: Yup.string().required('Risk Type is required'),
  sourceOfFunds: Yup.string()
    .required('Source of Funds is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(60, 'Cannot be more than 60 letters'),
  currentMonthlyTransactionPKR: Yup.string().required(
    'Current Monthly Transaction (PKR) is required',
  ),
  expectedMonthlyDebitTransactions: Yup.string()
    .required(
      'Expected monthly Debit turnover (No. of transactions) is required',
    )
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  expectedMonthlyDebitAmount: Yup.string()
    .required('Expected monthly Debit turnover (amount) is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  expectedMonthlyCreditTransactions: Yup.string()
    .required(
      'Expected monthly credit turnover (No. of transactions) is required',
    )
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  expectedMonthlyCreditAmount: Yup.string()
    .required('Expected monthly credit turnover (amount) is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  annualTurnoverCredit: Yup.string()
    .required('Annual Turnover (Credit) is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
  annualTurnoverDebit: Yup.string()
    .required('Annual Turnover (Debit) is required')
    .matches(/^\d+$/, 'Only Numeric values are allowed'),
});

//
