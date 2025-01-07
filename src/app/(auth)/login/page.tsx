'use client';

import { Form, Formik, useFormikContext } from 'formik';
import Cookies from 'js-cookie';
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
import loginSchema, {
  loginInitialValues,
} from '@/validations/merchant/onBoarding/loginSchema';
// import axios from "axios";

const NewLogin = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginResponse, setLoginResponse] = useState<Partial<TLogin>>();
  const [apierror, setApierror] = useState('');
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const session = null;

  const fetchUserDetails = async (email: string) => {
    try {
      const getDetailResponse = await apiClient.get(
        `merchant/getdetails/${email}`,
      );
      // Handle the response here
      router.push('/merchant/home');

      console.log('getDetailResponse', getDetailResponse);
    } catch (error) {
      console.error('Error fetching details:', error);
      // throw new Error('Error fetching');
      router.push('/login');
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

      if (loginResponse) {
        dispatch(loginSuccess(loginResponse));
      }
      if (userData.email) {
        fetchUserDetails(userData.email);
      }
    }, [values, errors, loginResponse, dispatch, userData.email]);

    return null;
  };

  const onSubmit = async (values: LoginForm, { setSubmitting }: any) => {
    try {
      const response: any = await apiClient.post(
        'auth/login',
        {},
        {
          headers: {
            username: values.Username,
            password: values.Password,
          },
        },
      );
      // dispatch(loginSuccess({}));

      console.log('response is', response);
      if (response?.data?.responseCode === '000') {
        setLoginResponse(response?.data);
        Cookies.set('jwt', response?.data?.jwt, {
          expires: 1, // 1 day
          secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
          path: '/',
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        });
        console.log('JWT set in cookie:', response?.data?.jwt);
      } else {
        console.log('Failure');

        setApierror(response?.data?.responseMessage);
        console.log(apierror);
        throw new Error('Error fetching');
      }
      // setApierror("");
    } catch (error: any) {
      // setApierror(error.response.headers.responseMessage);
      setTitle(error.response.headers.responseMessage);
      setShowModal(true);
      if (error.response.headers.responseMessage) {
        throw new Error(error.response.headers.responseMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        // description={description}
        show={showModal}
        setShowModal={setShowModal}
        // image={displayIcon}
      />
      <span className="flex w-full  justify-center pb-8 text-[40px] font-semibold text-secondary-base sm:max-md:text-[32px]">
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
              // routeName="/merchant/home"
              type="submit"
              isDisabled={!formik.isValid}
              className={`button-primary mt-8 w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </Form>
        )}
      </Formik>

      {/* <div className="h-full">
          <Image
            src={elipseBottomLeft}
            alt="bottomLeftElipse"
            // layout="fill"
            fill={true}
            // objectFit="cover"
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
            priority
          />

          <Image
            src={elipseTopRight}
            alt="topRightElipse"
            // layout="fill"
            fill={true}
            // objectFit="cover"
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
            priority
          />
        </div> */}
      {/* <div className="z-5 relative h-max w-[680px] rounded-lg border-[1px] border-border-light bg-neutral-white-base px-[60px] py-9 sm:max-md:w-full sm:max-md:px-[20px] sm:max-md:py-8">
      <span className="flex w-full  justify-center pb-8 text-[40px] font-semibold text-secondary-base sm:max-md:text-[32px]">
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
                label="Username"
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
              // routeName="/merchant/home"
              type="submit"
              isDisabled={!formik.isValid}
              className={`button-primary mt-8 w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </Form>
        )}
      </Formik> */}

      <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
        Don't have an account? &nbsp;
        <Link
          href={'/sign-up'}
          className="after:-content-[''] relative inline-block text-primary-base after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-bottom after:translate-y-1 after:bg-primary-base after:transition-transform"
        >
          Create an account
        </Link>
      </span>
      {/* </div>
      </div> */}
    </>
  );
};

export default NewLogin;
