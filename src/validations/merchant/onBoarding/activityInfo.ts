import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { ActivityFormInfo } from '@/interfaces/interface';

export const ActivityFormInfoInitialValues: ActivityFormInfo = {
  fatherName: '',
  businessOwner: '',
  businessName: '',
  legalName: '',
  incorporationDate: '',
  ntnNumber: '',
  emailAddress: '',
  city: '',
  businessAddress: '',
  correspondenceAddress: '',
  primaryPhoneNumber: '',
  otherPhoneNumber: '',
  status: '',
  gender: '',
  purposeOfAccount: '',
  citizenship: '',
  residency: '',
  terrorFinancing: '',
  politicallyExposed: '',
  accountHolder: '',
};
export const GetActivityInfoDetails = () => {
  const activityInfoDetails = useAppSelector(
    (state: any) => state.onBoardingForms.activityForm,
  );
  const updatedValues = {
    fatherName: activityInfoDetails.fatherName,
    businessOwner: activityInfoDetails.businessOwner,
    businessName: activityInfoDetails.businessName,
    legalName: activityInfoDetails.legalName,
    incorporationDate: activityInfoDetails.incorporationDate,
    ntnNumber: activityInfoDetails.ntnNumber,
    emailAddress: activityInfoDetails.emailAddress,
    city: activityInfoDetails.city,
    businessAddress: activityInfoDetails.businessAddress,
    correspondenceAddress: activityInfoDetails.correspondenceAddress,
    primaryPhoneNumber: activityInfoDetails.primaryPhoneNumber,
    otherPhoneNumber: activityInfoDetails.otherPhoneNumber,
    status: activityInfoDetails.status,
    gender: activityInfoDetails.gender,
    purposeOfAccount: activityInfoDetails.purposeOfAccount,
    citizenship: activityInfoDetails.citizenship,
    residency: activityInfoDetails.residency,
    terrorFinancing: activityInfoDetails.terrorFinancing,
    politicallyExposed: activityInfoDetails.politicallyExposed,
    accountHolder: activityInfoDetails.accountHolder,
  };
  // console.log('activity form indfo detr', activityInfoDetails);

  return updatedValues;
};

export const ActivityFormInfoSchema = Yup.object().shape({
  fatherName: Yup.string().required('Father name is required'),
  businessOwner: Yup.string().required('Business Owner Name is required'),
  businessName: Yup.string()
    .min(6, 'Business Name must be at least 6 characters')
    .required('Business Name is required'),
  legalName: Yup.string().required('Legal Name is required'),
  incorporationDate: Yup.date().required('Please select a valid date'),
  emailAddress: Yup.string().required('Email Address is required'),
  city: Yup.string().required('City is required'),
  businessAddress: Yup.string().required('Business Address is required'),
  correspondenceAddress: Yup.string().required(
    'Correspondence Address is required',
  ),
  primaryPhoneNumber: Yup.string().required('Primary Phone Number is required'),
  otherPhoneNumber: Yup.string(),
  // .required("Other Phone Number is required"),
  terrorFinancing: Yup.string().required('Terror Financing  name is required'),
  politicallyExposed: Yup.string().required('Politically Exposed is required'),
  gender: Yup.string().required('Gender is required'),
  purposeOfAccount: Yup.string().required('Purpose is required'),
  citizenship: Yup.string().required('Citizenship is required'),
  ntnNumber: Yup.string().required('Please enter a valid number'),
  residency: Yup.string().required('Residency is required'),
  accountHolder: Yup.string().required('Account Holder is required'),
});
