// File: validations/admin/auth/resetPassword.ts
import * as Yup from 'yup';

// Initial values for the form
export const resetPasswordInitialValues = {
  newPassword: '',
  confirmNewPassword: '',
  oldPassword: '',
};

const resetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*#?&]/,
      'Password must contain at least one special character',
    )
    .required('Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default resetPasswordSchema;
