// 'use client';

// import { Form, Formik, useFormikContext } from 'formik';
// // import Cookies from 'js-cookie';
// // import Cookies from 'js-cookie';
// // import Cookies from 'js-cookie';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// import apiClient from '@/api/apiClient';
// import eye from '@/assets/icons/eye.svg';
// import Button from '@/components/UI/Button/PrimaryButton';
// import Input from '@/components/UI/Inputs/Input';
// import CustomModal from '@/components/UI/Modal/CustomModal';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type { LoginForm } from '@/interfaces/interface';
// import { loginSuccess } from '@/redux/features/authSlice';
// import { setLoginCredentials } from '@/redux/features/corporateSlices/loginCredentials';
// // import { clearApplicants } from '@/redux/features/formSlices/onBoardingForms';
// // import axios from "axios";
// // import { setSessionExpiry } from '@/redux/features/sessionSlice/sessionSlice';
// import loginSchema, {
//   loginInitialValues,
// } from '@/validations/merchant/onBoarding/loginSchema';

// const NewLogin = () => {
//   const userData = useAppSelector((state: any) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [loginResponse, setLoginResponse] = useState<Partial<TLogin>>();
//   const [apierror, setApierror] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const session = null;

//   const fetchUserDetails = async (email: string) => {
//     console.log(setLoginResponse);
//     try {
//       if (userData?.userType !== 'Corporate') {
//         const getDetailResponse = await apiClient.get(
//           `merchant/getdetails/${email}`,
//         );
//         // Handle the response here
//         console.log('getDetailResponse', getDetailResponse);
//         router.push('/merchant/home');
//       }
//     } catch (error) {
//       console.error('Error fetching details:', error);
//       // throw new Error('Error fetching');
//       router.push('/login');
//     }
//   };
//   if (session) {
//     throw new Error('session error');
//   }

//   const AccessFormikValues = () => {
//     const { values, errors } = useFormikContext<LoginForm>();

//     useEffect(() => {
//       // const expiryTime = Date.now() + 60 * 1000;
//       // const expiryTime = Date.now() + 120 * 60 * 1000;
//       // dispatch(setSessionExpiry(expiryTime));
//       if (Object.keys(errors).length !== 0) {
//         setApierror('');
//       }

//       if (loginResponse) {
//         dispatch(loginSuccess(loginResponse));
//       }
//       if (userData.email && userData.userType !== 'Corporate') {
//         fetchUserDetails(userData.email);
//       }
//     }, [values, errors, loginResponse, dispatch, userData.email]);

//     return null;
//   };

//   const onSubmit = async (values: LoginForm, { setSubmitting }: any) => {
//     try {
//       const loginResponse: any = await apiClient.get('auth/sendLoginOtp', {
//         headers: {
//           username: values.Username,
//           password: values.Password,
//         },
//       });

//       if (loginResponse?.data?.responseCode === '000') {
//         const credentials = {
//           username: values.Username,
//           password: values.Password,
//           email: loginResponse?.data?.email,
//         };
//         dispatch(setLoginCredentials(credentials));

//         router.push(
//           `/loginOtp/?expiry=${'2'}&&option=loginCorporatePortal`,
//           //  & option=${ option }
//         );
//       } else if (loginResponse?.data?.responseCode === '009') {
//         setTitle(loginResponse?.data?.responseMessage);
//         setDescription(loginResponse?.data?.responseDescription);
//         setShowModal(true);
//       } else {
//         console.log('LOGIN OTP FAIL ');
//       }
//     } catch (error: any) {
//       console.error('Error in onSubmit:', error);
//       console.error('Error in onSubmit:', error);
//       setTitle('Network error');
//       setShowModal(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <CustomModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//         // image={displayIcon}
//       />
//       <span className="flex w-full  justify-center pb-8 text-[40px] font-semibold text-secondary-base sm:max-md:text-[32px]">
//         Login to your account
//       </span>
//       <Formik
//         initialValues={loginInitialValues}
//         validationSchema={loginSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form className="flex flex-col items-center">
//             <div className="mb-6 flex w-full flex-col">
//               <Input
//                 label="Username or Email"
//                 name="Username"
//                 type="text"
//                 error={formik.errors.Username}
//                 touched={formik.touched.Username}
//               />
//             </div>
//             <Input
//               name="Password"
//               label="Password"
//               type="password"
//               error={formik.errors.Password}
//               touched={formik.touched.Password}
//               hasImage={true}
//               image={eye}
//             />
//             <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
//               {apierror}
//             </div>
//             <AccessFormikValues />
//             <Button
//               label="Login"
//               // routeName="/merchant/home"
//               type="submit"
//               isDisabled={!formik.isValid}
//               className={`button-primary mt-8 w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
//             />
//           </Form>
//         )}
//       </Formik>

//       <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
//         Don't have an account? &nbsp;
//         <Link
//           href={'/sign-up'}
//           className="after:-content-[''] relative inline-block text-primary-base after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-bottom after:translate-y-1 after:bg-primary-base after:transition-transform"
//         >
//           Create an account
//         </Link>
//       </span>
//       <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
//         <Link
//           href={'/forgot-password'}
//           className="after:-content-[''] relative inline-block text-primary-base after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-bottom after:translate-y-1 after:bg-primary-base after:transition-transform"
//         >
//           Forgot Password
//         </Link>
//       </span>

//       {/* </div>
//       </div> */}
//     </>
//   );
// };

// export default NewLogin;

'use client';

import { Form, Formik, useFormikContext } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { LoginForm } from '@/interfaces/interface';
import { loginSuccess } from '@/redux/features/authSlice';
import { setLoginCredentials } from '@/redux/features/corporateSlices/loginCredentials';
import loginSchema, {
  loginInitialValues,
} from '@/validations/merchant/onBoarding/loginSchema';

const NewLogin = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginResponse, setLoginResponse] = useState<Partial<TLogin>>();
  const [apierror, setApierror] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state to track button state
  const session = null;

  const fetchUserDetails = async (email: string) => {
    console.log(setLoginResponse);
    try {
      if (userData?.userType !== 'Corporate') {
        const getDetailResponse = await apiClient.get(
          `merchant/getdetails/${email}`,
        );
        console.log('getDetailResponse', getDetailResponse);
        if (getDetailResponse?.data?.responseCode === '009') {
          router.push('/merchant/home');
        } else if (getDetailResponse?.data?.responseCode === '000') {
          setTitle('Failed to fetch records');
          setDescription('Unable to get positive response');
          setShowModal(true);
        } else {
          setTitle('Failed to fetch records');
          setDescription('Some Network Issue');
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setTitle('Network Error');
      setDescription('Error fetching merchant details. Please try again!');
      setShowModal(true);
      // router.push('/login');
    }
  };

  if (session) {
    throw new Error('session error');
  }

  const AccessFormikValues = () => {
    const { values, errors } = useFormikContext<LoginForm>();
    useEffect(() => {
      if (Object.keys(errors).length !== 0) {
        setApierror('');
      }
      console.log('USER DATA CHECK1: ', userData);

      if (loginResponse) {
        dispatch(loginSuccess(loginResponse));
      }
      if (userData.email && userData.userType !== 'Corporate') {
        console.log('GET DETAILS TEST 1');
        fetchUserDetails(userData.email);
      }
    }, [values, errors, loginResponse, dispatch, userData.email]);

    return null;
  };

  const onSubmit = async (values: LoginForm, { setSubmitting }: any) => {
    setIsSubmitting(true); // Disable the button immediately after submission
    try {
      const loginResponse: any = await apiClient.get('auth/sendLoginOtp', {
        params: {
          channel: 'merchant',
        },
        headers: {
          username: values.Username,
          password: values.Password,
        },
      });

      if (loginResponse?.data?.responseCode === '000') {
        const credentials = {
          username: values.Username,
          password: values.Password,
          email: loginResponse?.data?.email,
          mobileNumber: loginResponse?.data?.mobileNumber,
        };
        dispatch(setLoginCredentials(credentials));

        router.push(`/loginOtp?expiry=${loginResponse?.data?.expirationTime}`);
      } else if (loginResponse?.data?.responseCode === '009') {
        setTitle(loginResponse?.data?.responseMessage);
        setDescription(loginResponse?.data?.responseMessage);
        setShowModal(true);
      } else {
        console.log('LOGIN OTP FAIL ');
        setTitle(loginResponse?.data?.responseMessage);
        setDescription(loginResponse?.data?.responseMessage);
        setShowModal(true);
      }
    } catch (error: any) {
      console.error('Error in onSubmit:', error);
      setTitle('Network error');
      setShowModal(true);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false); // Re-enable the button after response
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
      <span className="flex w-full justify-center pb-8 text-[40px] font-semibold text-secondary-base sm:max-md:text-[32px]">
        Login to your account
      </span>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col items-center">
            <div className="mb-6 flex w-full flex-col">
              <Input
                label="Username or Email"
                name="Username"
                type="text"
                error={formik.errors.Username}
                touched={formik.touched.Username}
              />
            </div>
            <Input
              name="Password"
              label="Password"
              type="password"
              error={formik.errors.Password}
              touched={formik.touched.Password}
              hasImage={true}
              image={eye}
            />
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
            <AccessFormikValues />
            <Button
              label="Login"
              type="submit"
              isDisabled={!formik.isValid || isSubmitting} // Disable button when submitting or invalid form
              className={`button-primary mt-8 w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </Form>
        )}
      </Formik>

      <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
        Don't have an account? &nbsp;
        <Link
          href={'/sign-up'}
          className="relative inline-block text-primary-base"
        >
          Create an account
        </Link>
      </span>
      <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
        <Link
          href={'/forgot-password'}
          className="relative inline-block text-primary-base"
        >
          Forgot Password
        </Link>
      </span>
    </>
  );
};

export default NewLogin;
