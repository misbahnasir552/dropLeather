'use client';

import { Form, Formik, useFormikContext } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import emailIcon from '@/assets/icons/emailIcon.svg';
import eye from '@/assets/icons/eye.svg';
import padlockIcon from '@/assets/icons/padlockIcon.svg';
import loginbg from '@/assets/images/loginBg222222.png';
import peopleImg from '@/assets/images/people.png';
import starImg from '@/assets/images/starsImg.png';
import GoogleButton from '@/components/UI/Button/GoogleButton';
import Button from '@/components/UI/Button/PrimaryButton';
import ApiError from '@/components/UI/Error/Error';
import H4 from '@/components/UI/Headings/H4';
import H5 from '@/components/UI/Headings/H5';
import H7 from '@/components/UI/Headings/H7';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { LoginForm } from '@/interfaces/interface';
import { loginSuccess } from '@/redux/features/authSlice';
import loginSchema, {
  loginInitialValues,
} from '@/validations/merchant/onBoarding/loginSchema';

const NewLogin = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const [loginResponse] = useState<Partial<TLogin>>();
  const [apierror, setApierror] = useState('');

  // const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, [values, errors, loginResponse, dispatch, userData.email]);

    return null;
  };

  const onSubmit = async () => {
    // setIsSubmitting(true); // Disable the button immediately after submission
  };

  return (
    <div className="flex">
      <div className="left div flex h-screen w-[26%] flex-col px-[38px] py-[60px]">
        <div>
          <div className="flex w-full justify-start text-[40px] font-semibold text-secondary-base sm:max-md:text-[32px]">
            Logo
          </div>
          <H7 className="flex w-full justify-start pb-[30px] text-[50px] text-primary-50 sm:max-md:text-[32px]">
            Welcome Back.
          </H7>
          {/* <H1>hi</H1> */}
          <div className="flex pb-[20px]">
            <GoogleButton
              label="Sign in with Google"
              type="submit"
              // isDisabled={!formik.isValid || isSubmitting} // Disable button when submitting or invalid form
              className={`button-primary flex w-full justify-center  px-3 py-[12px] text-sm leading-tight transition duration-300`}
            />
          </div>
          <div className="flex w-full items-center gap-4 py-1 ">
            <div className="h-[0.79px] grow bg-border-light " />
            <span className="text-sm text-neutral-grey-base">OR</span>
            <div className="h-[0.79px] grow bg-border-light" />
          </div>

          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col items-center">
                <div className="flex w-full flex-col gap-5">
                  {/* <ApiError/> */}
                  <Input
                    label="Email"
                    placeholder={'Enter your email'}
                    name="Username"
                    type="text"
                    required={true}
                    error={formik.errors.Username}
                    touched={formik.touched.Username}
                    icon={emailIcon}
                    hasImage={true}
                  />
                  <Input
                    name="Password"
                    placeholder={'Enter your password'}
                    label="Password"
                    type="password"
                    error={formik.errors.Password}
                    touched={formik.touched.Password}
                    required={true}
                    hasImage={true}
                    icon={padlockIcon}
                    image={eye}
                  />
                </div>

                {/* <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div> */}
                {/* <div> */}

                <ApiError apiError={apierror} />
                {/* </div> */}

                <AccessFormikValues />
                <div className="flex w-full justify-end py-[18px]">
                  <Link
                    href={'/forgot-password'}
                    className="relative inline-block text-neutral-blue-base"
                  >
                    Forget your Password?
                  </Link>
                </div>

                <Button
                  label="Login"
                  type="submit"
                  isDisabled={true}
                  // isDisabled={!formik.isValid || isSubmitting} // Disable button when submitting or invalid form
                  className={`button-primary w-full leading-tight transition duration-300`}
                />
              </Form>
            )}
          </Formik>

          <div className="flex justify-center pb-6 pt-5 text-sm font-normal leading-tight">
            Don't have a DropLeather account yet? &nbsp;
            <Link
              href={'/sign-up'}
              className="text-primary-base relative inline-block"
            >
              Sign Up
            </Link>
          </div>
          <H4>
            DropLeather, Inc., 11025 Westlake Dr Charlotte, North Carolina
            28273, support@dropleather.com.This site is protected by Cloudflare
            Turnstile. The Cloudflare Privacy Policy and Terms of Service apply.
          </H4>

          {/* <span className="flex justify-center pt-6 text-sm font-normal leading-tight">

        </span> */}
        </div>
      </div>
      <div className="Right div w-[74%]">
        <div className="bg-primary-900 relative flex h-screen w-full justify-start px-[192px] py-[207px] align-middle sm:max-md:px-[24px]">
          <div className="h-full">
            <Image
              src={loginbg}
              alt="bottomLeftElipse"
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0"
              priority
              quality={75}
            />
          </div>
          <div className="z-5 relative">
            <H7
              className="border-border-light  text-[66px]  sm:max-md:w-full sm:max-md:px-[20px] sm:max-md:py-8"
              textColor="text-neutral-white-base"
            >
              You Design the Brand
              <br />
              We Deliver the Goods.
            </H7>
            <H5 textColor="text-neutral-white-base">
              Join 500+ brands building premium leather lines without inventory.{' '}
              <br />
              With DropLeather, your brand launches fast — no middlemen, no
              stock, just sales.
            </H5>
            <div className="flex flex-row gap-4">
              <Image
                src={peopleImg}
                alt="bottomLeftElipse"
                // fill
                width={341}
                height={38}
                style={{ objectFit: 'cover' }}
                // className="absolute inset-0"
                priority
                quality={100}
              />
              <div className="flex flex-col items-start justify-center">
                <div className="flex flex-row">
                  <Image
                    src={starImg}
                    alt="bottomLeftElipse"
                    // fill
                    width={90}
                    height={18}
                    style={{ objectFit: 'cover' }}
                    // className="absolute inset-0"
                    priority
                    quality={100}
                  />
                  <H5 textColor="text-neutral-white-base">&nbsp;4.9 / 5</H5>
                </div>

                <H5 textColor="text-neutral-white-base">from 200+reviews</H5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
