import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { IntegrationFormInfo } from '@/interfaces/interface';

export const IntegrationFormInfoInitialValues: IntegrationFormInfo = {
  fullName: '',
  emailAddress: '',
  mobileNumber: '',
  integrationPlatform: '',
  integrationMethod: '',
};

export const GetIntegrationDetails = () => {
  const integrationDetails = useAppSelector(
    (state: any) => state.onBoardingForms.integrationForm,
  );
  const updatedValues = {
    fullName: integrationDetails.fullName,
    emailAddress: integrationDetails.emailAddress,
    mobileNumber: integrationDetails.mobileNumber,
    integrationPlatform: integrationDetails.integrationPlatform,
    integrationMethod: integrationDetails.integrationMethod,
  };
  // console.log('integrationForm form indfo detr', integrationDetails);

  return updatedValues;
};

export const IntegrationFormInfoSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  emailAddress: Yup.string().required('Email Address is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  integrationPlatform: Yup.string().required('Please select an option'),
  integrationMethod: Yup.string().required('Please select an option'),
});
