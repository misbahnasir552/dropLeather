// import TermsAndConditions from '@/app/(auth)/sign-up/personal-information/termsAndConditions';
import * as Yup from 'yup';

export const signUpInitialValues: SignupForm = {
  firstName: '',
  lastName: '',
  merchantName: '',
  email: '',
  managerMobile: '',
  // website: '',
  password: '',
  confirmPassword: '',
  merchantType: '',
  termsAndConditions: false,
};

// const phoneRegExp = /^(?:\92)?[3456789]\d{9}$/;
const phoneRegExp = /^(?:92)?[3456789]\d{9}$/;
// const phoneRegExp = /^0[3456789]\d{9}$/;

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    // .transform((value) => value.trim())
    .required('First name is required')
    .min(2, 'Must be more than 2 letters')
    // .matches(/^\S+$/, 'Spaces are not allowed')
    // .matches(/^\S.*$/, 'First name cannot consist of only spaces')
    // .matches(/^(?![-'’.\s]+$)[a-zA-ZÀ-ÿ'’\-.\s]+$/, 'Only alphabets are allowed')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')

    .max(20, 'Max limit exceed'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Must be more than 2 letters')
    // .matches(/^\S+$/, 'Spaces are not allowed')
    // .matches(/^[a-zA-ZÀ-ÿ]+$/, 'Last name cannot consist of only spaces')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .max(20, 'Max limit exceed'),
  merchantName: Yup.string()
    .required('Merchant name is required')
    .min(3, 'Must be more than 3 letters')
    // .matches(/^\S.*$/, 'Merchant name cannot consist of only spaces')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only alphabets are allowed')
    .matches(
      /^(?!\s)[a-zA-ZÀ-ÿ\s]+(?<!\s)$/,
      'No spaces at the start or end are allowed',
    )
    // .matches(/^$/, 'No spaces before or after allowed')
    .max(120, 'Max limit exceed'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  managerMobile: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
  // website: Yup.string().url('Invalid URL format include http://'),
  // .required('Website URL is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*#?&_]/,
      'Password must contain at least one special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    'You must agree to the terms and conditions to proceed. Please check the box to continue',
  ),
});
