import * as Yup from 'yup';

export const businessDetailsFormInitialValues = {
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
  currentDailyTransactionPKR: '',
  anyOtherDetails: '',
  associationToHighRiskBusiness: '',
  highRiskType: '',
  mediumRiskType: '',
  lowRiskType: '',
  sourceOfFunds: '',
  currentMonthlyTransactionPKR: '',
};

export const businessDetailsFormSchema = Yup.object().shape({
  accountBusinessDocumentationType: Yup.string().required(
    'Account/Business Documentation Type is required',
  ),
  limitCategory: Yup.string().required('Limit Category is required'),
  natureofBusiness: Yup.string().required('Nature of Business is required'),
  raastEnabled: Yup.string().required('Raast Enabled is required'),
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
  cityAndCountry: Yup.string(),
  nextOfKinCnic: Yup.string().required('Next of Kin CNIC is required'),
  nextOfKinRelationship: Yup.string().required(
    'Next of Kin Relationship is required',
  ),
  nextOfKinName: Yup.string().required('Next of Kin Name is required'),
  dateOfBirth: Yup.string(),
  registerUnRegister: Yup.string().required('Register/Unregister is required'),
  specialCustomer: Yup.string().required('Special Customer is required'),
  registrationIncorporationNo: Yup.string(),
  placeOfIncorporationOrRegistration: Yup.string(),
  geographiesInvolved: Yup.string(),
  expectedTypeOfCounterParties: Yup.string(),
  intendedNatureOfBusinessRelations: Yup.string(),
  expectedModesOfTransactionsDeliveryChannels: Yup.string(),
  industrySegment: Yup.string(),
  product: Yup.string().required('Product is required'),
  nationality: Yup.string().required('Nationality is required'),
  natureOfActivity: Yup.array()
    .min(1, 'Please select at least one Nature of Activity')
    .required('Nature of Activity is required'),
  incomeStatusSalaried: Yup.string().required(
    'Income Status (Salaried) is required',
  ),
  currentDailyTransactionPKR: Yup.string().required(
    'Current Daily Transaction (PKR) is required',
  ),
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
  sourceOfFunds: Yup.string().required('Source of Funds is required'),
  currentMonthlyTransactionPKR: Yup.string().required(
    'Current Monthly Transaction (PKR) is required',
  ),
});

//
