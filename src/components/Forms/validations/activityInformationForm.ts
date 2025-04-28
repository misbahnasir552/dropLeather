import * as Yup from 'yup';

export const activityInformationFormInitialValues = {
  businessOwnerName: '',
  ownerOfCNIC: '',
  fatherSpouseName: '',
  gender: '',
  purposeOfAccount: '',
  citizenship: '',
  businessName: '',
  legalName: '',
  ntnNO: '',
  dateOfCorporation: '',
  terrorFinancing: '',
  politicallyExposed: '',
  residency: '',
  email: '',
  city: '',
  businessAddress: '',
  correspondenceAddress: '',
  accountHandlerIsdifferentfromOwnerAccountHolder: '',
  primaryPhoneNo: '',
  secondaryPhoneNo: '',
};

const activityInformationFormSchema = Yup.object().shape({
  businessOwnerName: Yup.string()
    .required('Business Owner Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  ownerOfCNIC: Yup.string()
    .required('Owner of CNIC is required')
    .matches(/^\d+$/, 'Invalid CNIC')
    .length(13, 'CNIC must be exactly 13 digits'),
  fatherSpouseName: Yup.string()
    .required('Father/Spouse Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(25, 'Cannot be more than 25 letters'),
  gender: Yup.string().required('Gender is required'),
  purposeOfAccount: Yup.string().required('Purpose Of Account is required'),
  citizenship: Yup.string().required('Citizenship is required'),
  businessName: Yup.string()
    .required('Business Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Business Name must be alphanumeric only')
    .max(25, 'Cannot be more than 25 letters'),
  legalName: Yup.string()
    .required('Legal Name is required')
    .min(3, 'Cannot be less than 3 letters')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Legal Name must be alphanumeric only')
    .max(25, 'Cannot be more than 25 letters'),
  ntnNO: Yup.string()
    .required('NTN No is required')
    .min(5, 'Cannot be less than 5 digits')
    .matches(/^\d+$/, 'NTN No must contain only numbers')
    .max(13, 'Cannot be more than 13 digits'),
  dateOfCorporation: Yup.date().required('Date of Corporation is required'),
  terrorFinancing: Yup.string().required(
    'Terror Financing selection is required',
  ),
  politicallyExposed: Yup.string().required(
    'Politically Exposed selection is required',
  ),
  residency: Yup.string().required('Residency selection is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  city: Yup.string()
    .required('City is required')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed'),
  businessAddress: Yup.string()
    .required('Business Address is required')
    .min(5, 'Cannot be less than 5 letters')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Business Address must be alphanumeric only')
    .max(25, 'Cannot be more than 25 letters'),
  correspondenceAddress: Yup.string()
    .required('Correspondence Address is required')
    .min(5, 'Cannot be less than 5 letters')
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Correspondence Address must be alphanumeric only',
    )
    .max(25, 'Cannot be more than 25 letters'),
  accountHandlerIsdifferentfromOwnerAccountHolder: Yup.string().required(
    'Account Handler selection is required',
  ),
  primaryPhoneNo: Yup.string()
    .required('Primary Phone No is required')
    .matches(/^\d+$/, 'Invalid primary phone number')
    .length(11, 'Primary Phone Number must be exactly 11 digits'),
  secondaryPhoneNo: Yup.string()
    .matches(/^\d+$/, 'Invalid Secondary phone number')
    .length(11, 'Secondary Phone Number must be exactly 11 digits'),
});

export default activityInformationFormSchema;
