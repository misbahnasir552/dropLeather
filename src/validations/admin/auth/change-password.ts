import * as Yup from 'yup';
// import { useAppSelector } from '@/hooks/redux';

export const changePasswordInitialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const changePasswordSchema = (jwt: string) => {
  //  const adminData = useAppSelector((state: any) => state.adminAuth);
  //   const jwt=adminData.jwt
  return Yup.object().shape({
    currentPassword:
      jwt !== ''
        ? Yup.string().required('Current Password is required')
        : Yup.string(), // Not required if jwt is an empty string
    newPassword: Yup.string().required('New Password is required'),
    confirmNewPassword: Yup.string().required(
      'Confirm New Password is required',
    ),
  });
};

export default changePasswordSchema;

// export const changePasswordInitialValues = {
//   currentPassword: '',
//   newPassword: '',
//   confirmNewPassword: '',
// };

// const changePasswordSchema = Yup.object().shape({
//   currentPassword: Yup.string().required('Current Password is required'),
//   newPassword: Yup.string().required('New Password is required'),
//   confirmNewPassword: Yup.string().required('confirm New Password is required'),
// });

// export default changePasswordSchema;
