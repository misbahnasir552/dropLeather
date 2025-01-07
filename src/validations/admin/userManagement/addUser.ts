import * as Yup from 'yup';

export const addUserInitialValues: any = {
  email: '',
  firstName: '',
  lastName: '',
  category: '',
  profileName: '',
  userRole: '',
  mobileNumber: '',
};

export const addUserSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  category: Yup.string().required('Category is required'),
  profileName: Yup.string().required('Profile Name is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  // userRole: Yup.string().required('Admin Role is required'),
  userRole: Yup.string(),
});
