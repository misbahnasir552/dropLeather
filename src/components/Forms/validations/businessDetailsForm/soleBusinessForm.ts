import * as Yup from 'yup';

export const soleBusinessDetailsFormInitialValues = {
  accountBusinessDocumentationType: '',
  limitCategory: '',
  natureofBusiness: '',
  raastEnabled: '',
  establishedSince: null,
  businessMode: [],
  paymentModes: [],
  permanentAddress: '',
  fatcaStatus: '',
  crsStatus: '',
  mandateName: '',
  mandateIdCardNumber: '',
  mandateRelationshipWithAccountHolder: '',
  dateOfIssuanceOfApplicableIdentityDocument: '',
  beneficialOwnerControllingRights: '',
  mandateDateOfBirth: '',
  mandatePlaceOfBirth: '',
  cityAndCountry: '',
  nextOfKinCnic: '',
  nextOfKinRelationship: '',
  nextOfKinName: '',
  dateOfBirth: '',
  registerUnRegister: '',
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

export const soleBusinessDetailsFormSchema = Yup.object().shape({
  accountBusinessDocumentationType: Yup.string().required(
    'Account/Business Documentation Type is required',
  ),
  limitCategory: Yup.string().required('Limit Category is required'),
  natureofBusiness: Yup.string().required('Nature of Business is required'),
  // raastEnabled: Yup.string().required('Raast Enabled is required'),
  establishedSince: Yup.date().nullable(),
  businessMode: Yup.array()
    .min(1, 'Please select at least one Business Mode')
    .required('Business Mode is required'),
  paymentModes: Yup.array()
    .min(1, 'Please select at least one Payment Mode')
    .required('Payment Mode is required'),
  permanentAddress: Yup.string(),
  fatcaStatus: Yup.string(),
  crsStatus: Yup.string(),
  mandateName: Yup.string(),
  mandateIdCardNumber: Yup.string(),
  mandateRelationshipWithAccountHolder: Yup.string(),
  dateOfIssuanceOfApplicableIdentityDocument: Yup.string(),
  beneficialOwnerControllingRights: Yup.string(),
  mandateDateOfBirth: Yup.string(),
  mandatePlaceOfBirth: Yup.string(),
  cityAndCountry: Yup.string().matches(
    /^[a-zA-ZÀ-ÿ\s,]+$/,
    'Only alphabets are allowed',
  ),
  nextOfKinCnic: Yup.string()
    .required('Next of Kin CNIC is required')
    .matches(/^\d+$/, 'Invalid CNIC')
    .length(13, 'CNIC must be exactly 13 digits'),
  nextOfKinRelationship: Yup.string()
    .required('Next of Kin Relationship is required')
    .min(4, 'Cannot be less than 4 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(13, 'Cannot be more than 13 letters'),
  nextOfKinName: Yup.string()
    .required('Next of Kin Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  registerUnRegister: Yup.string().required('Register/Unregister is required'),
  specialCustomer: Yup.string().required('Special Customer is required'),
  registrationIncorporationNo: Yup.string()
    .min(5, 'Cannot be less than 5 digits')
    .matches(/^\d+$/, 'Only numbers are allowed')
    .max(13, 'Cannot be more than 13 digits'),
  placeOfIncorporationOrRegistration: Yup.string()
    .min(4, 'Cannot be less than 4 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  geographiesInvolved: Yup.string()
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  expectedTypeOfCounterParties: Yup.string()
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  intendedNatureOfBusinessRelations: Yup.string()
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  expectedModesOfTransactionsDeliveryChannels: Yup.string().matches(
    /^\d+$/,
    'Only numbers are allowed',
  ),
  industrySegment: Yup.string()
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  product: Yup.string().required('Product is required'),
  nationality: Yup.string().required('Nationality is required'),
  natureOfActivity: Yup.array()
    .min(1, 'Please select at least one Nature of Activity')
    .required('Nature of Activity is required'),
  incomeStatusSalaried: Yup.string().required(
    'Income Status (Salaried) is required',
  ),
  // DO NOT Remove Commented Code
  // currentSalaryIncome: Yup.string().required(
  //   'Current Salary / Income is required',
  // ),
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
  anyOtherDetails: Yup.string(),
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
    .max(25, 'Cannot be more than 25 letters'),
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
