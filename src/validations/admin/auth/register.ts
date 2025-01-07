import * as Yup from 'yup';

export const registerInitialValues = {
  firstName: '',
  lastName: '',
  username: '',
  managerMobile: '',
  password: '',
  adminRole: '',
};

// const phoneRegExp = /^(?:\92)?[3456789]\d{9}$/;

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),

  username: Yup.string().email('Invalid email').required('Email is required'),
  managerMobile: Yup.string()
    // .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string().required('Phone number is required'),
  adminRole: Yup.string().required('Phone number is required'),
});
