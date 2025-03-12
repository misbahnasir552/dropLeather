import * as Yup from 'yup';

export const integrationFormInitialValues = {
  integrationMethods: [],
  integrationModes: [],
  email: '',
  mobileNo: '',
};

const integrationFormSchema = Yup.object().shape({
  integrationMethods: Yup.array()
    .min(1, 'Please select at least one option')
    .required('Email is required'),
  integrationModes: Yup.array()
    .min(1, 'Please select at least one option')
    .required('Email is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Invalid mobile number') // Adjust regex as per requirement
    .required('Mobile number is required'),
});

export default integrationFormSchema;
