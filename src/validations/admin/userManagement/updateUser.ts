import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';

export const updateUserInitialValues: any = {
  // email: '',
  firstName: '',
  lastName: '',
  category: '',
  profileName: '',
  role: '',
};

export const GetUserInfoDetails = () => {
  const userInfoDetails = useAppSelector((state: any) => state.updateUser);
  console.log('userinfodetails', userInfoDetails);
  //  const userData = useAppSelector((state: any) => state.auth);
  const updatedValues = {
    // email: userInfoDetails.email,
    firstName: userInfoDetails.firstName,
    lastName: userInfoDetails.lastName,
    category: userInfoDetails.category,
    profileName: userInfoDetails.profileName,
    role: userInfoDetails.role,
  };

  return updatedValues;
};

export const updateUserSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  category: Yup.string().required('Category is required'),
  profileName: Yup.string().required('Profile Name is required'),
  role: Yup.string().required('Admin Role is required'),
});
