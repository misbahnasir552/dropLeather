'use client';

import { Form, Formik, useFormikContext } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import ApiError from '@/components/UI/Error/Error';
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
  const [loginResponse] = useState<Partial<TLogin>>();
  const [apierror, setApierror] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = null;
  const jwt = Cookies.get('jwt');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async (email: string) => {
    try {
      if (userData?.email && jwt) {
        const getDetailResponse = await apiClient.get(
          `merchant/getdetails/${email}`,

          //   {
          //   params: {
          //     username: email
          //   }
          // }
        );
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
        console.log(isLoading);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setTitle('Network Error');
      setDescription('Error fetching merchant details. Please try again!');
      setShowModal(true);
    }
  };

  if (session) {
    throw new Error('session error');
  }

  const AccessFormikValues = () => {
    const { values, errors } = useFormikContext<LoginForm>();
    useEffect(() => {
      // dispatch(setApiError(''))
      // dispatch(setApiError("hiiiiiiiii"))
      if (Object.keys(errors).length !== 0) {
        setApierror('');
      }

      if (loginResponse) {
        dispatch(loginSuccess(loginResponse));
      }
      if (userData.email && userData.userType !== 'Corporate') {
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
          userType: 'merchant',
          actionType: 'login',
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

        // OTP CODE
        try {
          setIsLoading(true);
          const response: any = await apiClient.post(
            'auth/login',
            {},
            {
              params: {
                channel: 'merchant',
              },
              headers: {
                username: credentials.username,
                password: credentials.password,
                otp: '123123',
                messageOtp: '123123',
                // otp: emailOtp.join(''),
                // messageOtp: smsOtp.join(''),
              },
            },
          );

          console.log('LOGIN API response TESTTT:', response);

          if (response?.data?.responseCode === '000') {
            dispatch(loginSuccess(response?.data));
            Cookies.set('jwt', response?.data?.jwt, {
              expires: 1,
              path: '/',
            });
            Cookies.set('browser_number', response?.data?.apiSecret, {
              expires: 1,
              path: '/',
            });
            Cookies.set('username', response?.data?.email, {
              expires: 1,
              path: '/',
            });
            // dispatch(clearApplicants());
            router.push('/merchant/home');
          } else if (response?.data?.responseCode == '010') {
            router.push(`/reset-password?email=${credentials.username}`);
          } else {
            setApierror(response?.data?.responseMessage);
            throw new Error('Login failed');
          }
        } catch (e: any) {
          console.log(e);
          setTitle(e.code);
          setDescription(e.message);
        } finally {
          setIsLoading(false);
        }

        // router.push(`/loginOtp?expiry=${loginResponse?.data?.expirationTime}`);
        router.push('/merchant/home');

        // router.push(`/loginOtp?expiry=${loginResponse?.data?.expirationTime}`);
      } else if (loginResponse?.data?.responseCode === '009') {
        // dispatch(setApiError("mnjs"));
        setApierror(loginResponse?.data?.responseMessage);
      } else if (loginResponse?.data?.responseCode === '010') {
        setApierror(loginResponse?.data?.responseMessage);
      } else {
        setTitle(loginResponse?.data?.responseMessage);
        setDescription(loginResponse?.data?.responseMessage);
        setShowModal(true);
      }
    } catch (error: any) {
      setApierror(error?.message);
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
              {/* <ApiError/> */}
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
            {/* <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div> */}
            {/* <div> */}

            <ApiError apiError={apierror} />
            {/* </div> */}

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
