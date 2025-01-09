import * as Yup from 'yup';

export interface CorporateSignupForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
  merchantType: string | null;
}

export const signUpInitialValues: SignupForm = {
  firstName: '',
  lastName: '',
  merchantName: '',
  email: '',
  managerMobile: '',
  website: '',
  password: '',
  confirmPassword: '',
  merchantType: '',
};

// const phoneRegExp = /^(?:\92)?[3456789]\d{9}$/;
const phoneRegExp = /^(?:92)?[3456789]\d{9}$/;
// const phoneRegExp = /^0[3456789]\d{9}$/;

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .transform((value) => value.trim())
    .required('First name is required')
    .min(2, 'Must be more than 2 letters')
    .matches(/^\S.*$/, 'First name cannot consist of only spaces')
    .max(20, 'Max limit exceed'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Must be more than 2 letters')
    .matches(/^\S.*$/, 'Last name cannot consist of only spaces')
    .max(20, 'Max limit exceed'),
  merchantName: Yup.string()
    .required('Merchant name is required')
    .min(3, 'Must be more than 3 letters')
    .matches(/^\S.*$/, 'Merchant name cannot consist of only spaces')
    .max(120, 'Max limit exceed'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  managerMobile: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
  website: Yup.string().url('Invalid URL format include http://'),
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
});

export const corporateSignUpInitialValues: CorporateSignupForm = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  merchantType: '',
};

export const corporateSignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .transform((value) => value.trim())
    .required('First name is required')
    .min(4, 'Must be more than 4 letters')
    .matches(/^\S.*$/, 'First name cannot consist of only spaces')
    .max(20, 'Max limit exceed'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Must be more than 3 letters')
    .matches(/^\S.*$/, 'Last name cannot consist of only spaces')
    .max(20, 'Max limit exceed'),

  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9](?!.*__)(?!.*\.\.)(?!.*\._)(?!.*\._)(?!.*_$)(?!.*\.$)[a-zA-Z0-9._]*[a-zA-Z0-9]$/,
      'Username must be alphanumeric and can contain underscores (_) or dots (.), but cannot have spaces, special characters, or start/end with a special character.',
    )
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot exceed 20 characters'),
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
});

// .min(6, 'Password must be at least 6 characters')
// .required('Password is required'),
