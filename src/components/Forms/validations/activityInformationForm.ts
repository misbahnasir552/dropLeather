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
  businessOwnerName: Yup.string().required('Business Owner Name is required'),
  ownerOfCNIC: Yup.string().required('Owner of CNIC is required'),
  fatherSpouseName: Yup.string().required('Father/Spouse Name is required'),
  gender: Yup.string().required('Gender is required'),
  purposeOfAccount: Yup.string().required('Purpose Of Account is required'),
  citizenship: Yup.string().required('Citizenship is required'),
  businessName: Yup.string().required('Business Name is required'),
  legalName: Yup.string().required('Legal Name is required'),
  ntnNO: Yup.string().required('NTN No is required'),
  dateOfCorporation: Yup.date().required('Date of Corporation is required'),
  terrorFinancing: Yup.string().required(
    'Terror Financing selection is required',
  ),
  politicallyExposed: Yup.string().required(
    'Politically Exposed selection is required',
  ),
  residency: Yup.string().required('Residency selection is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  city: Yup.string().required('City is required'),
  businessAddress: Yup.string().required('Business Address is required'),
  correspondenceAddress: Yup.string().required(
    'Correspondence Address is required',
  ),
  accountHandlerIsdifferentfromOwnerAccountHolder: Yup.string().required(
    'Account Handler selection is required',
  ),
  primaryPhoneNo: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Invalid primary phone number')
    .required('Primary Phone No is required'),
  secondaryPhoneNo: Yup.string().matches(
    /^[0-9]{10,15}$/,
    'Invalid secondary phone number',
  ),
});

export default activityInformationFormSchema;
