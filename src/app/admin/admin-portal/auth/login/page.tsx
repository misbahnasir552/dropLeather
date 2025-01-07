'use client';

import { Form, Formik, useFormikContext } from 'formik';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import elipseBottomLeft from '@/assets/images/Ellipse Bottom Left.svg';
import elipseTopRight from '@/assets/images/Ellipse Top Right.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppDispatch } from '@/hooks/redux';
import type { LoginForm } from '@/interfaces/interface';
import { adminLoginSuccess } from '@/redux/features/adminSlices/adminLoginSlice';
import loginSchema, {
  loginInitialValues,
} from '@/validations/admin/auth/login';

const UserLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginResponse, setLoginResponse] = useState<Partial<TAdminLogin>>();
  const [apierror, setApierror] = useState('');

  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (loginResponse) {
  //     dispatch(adminLoginSuccess(loginResponse));
  //   }
  // }, [loginResponse, dispatch]);

  const AccessFormikValues = () => {
    const { values, errors } = useFormikContext<LoginForm>();

    useEffect(() => {
      if (Object.keys(errors).length !== 0) {
        setApierror('');
      }
      if (loginResponse) {
        dispatch(adminLoginSuccess(loginResponse));
      }
    }, [values, errors, loginResponse, dispatch]);

    return null;
  };

  const onSubmit = async (values: LoginForm, { setSubmitting }: any) => {
    try {
      const response: any = await apiClient.post(
        'adminPortal/login',
        {},
        {
          headers: {
            username: values.Username,
            password: values.Password,
          },
        },
      );

      console.log('response is', response);
      if (response?.data?.responseCode === '000') {
        setLoginResponse(response?.data);
        console.log('yayy i am logged in');

        Cookies.set('adminRole', response?.data?.adminRole, {
          expires: 1, // 1 day
          secure: process.env.NODE_ENV === 'production',
          path: '/admin',
        });
        Cookies.set('jwt', response?.data?.jwt, {
          expires: 1, // 1 day
          secure: process.env.NODE_ENV === 'production',
          path: '/admin',
        });
        // Cookies.set('pages', JSON.stringify(response?.data?.pages), {
        //   expires: 1, // 1 day
        //   secure: process.env.NODE_ENV === 'production',
        //   path: '/',
        // });
        router.push('/admin/admin-portal/manage-users/search-user/');
      } else {
        console.log('Failure');
        // setTitle(response?.data?.responseMessage);
        // setShowModal(true);
        setApierror(response?.data?.responseMessage);
        throw new Error('Error fetching');
      }
    } catch (error: any) {
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

      <div className="relative flex h-screen w-full  items-center justify-center bg-primary-900 px-[380px] align-middle sm:max-md:px-[24px]">
        <div className="h-full">
          <Image
            src={elipseBottomLeft}
            alt="bottomLeftElipse"
            // layout="fill"
            fill={true}
            // objectFit="cover"
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
          />

          <Image
            src={elipseTopRight}
            alt="topRightElipse"
            // layout="fill"
            fill={true}
            // objectFit="cover"
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
          />
        </div>
        <div className="z-5 relative h-max w-[680px] rounded-lg border-[1px] border-border-light bg-neutral-white-base px-[60px] py-9 sm:max-md:w-full sm:max-md:px-[20px] sm:max-md:py-8">
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
                  // eyeinput={true}
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

          <span className="flex justify-center pt-6 text-sm font-normal leading-tight">
            If you are unable to login to your account please click &nbsp;
            <Link
              href={'/admin/admin-portal/auth/check-email'}
              className="after:-content-[''] relative inline-block text-primary-base after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-bottom after:translate-y-1 after:bg-primary-base after:transition-transform"
            >
              Forgot Password
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
