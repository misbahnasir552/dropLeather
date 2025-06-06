'use client';

// import { Form, Formik, useFormikContext } from 'formik';
import Image from 'next/image';

import companyIcon from '@/assets/icons/companyIcon.svg';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
import accountTypeImg from '@/assets/images/accountType.svg';
// import capteraIcon from '@/assets/icons/apps/capterra.svg';
// import g2Icon from '@/assets/icons/apps/G2.svg';
// import shopifyIcon from '@/assets/icons/apps/shopify.svg';
// import trustPilotIcon from '@/assets/icons/apps/trustpilot.svg';
// import emailIcon from '@/assets/icons/emailIcon.svg';
// import eye from '@/assets/icons/eye.svg';
// import padlockIcon from '@/assets/icons/padlockIcon.svg';
// import loginbg from '@/assets/images/loginBg222222.png';
// import peopleImg from '@/assets/images/people.svg';
// import starImg from '@/assets/images/starsImg.png';
// import GoogleButton from '@/components/UI/Button/GoogleButton';
// import Button from '@/components/UI/Button/PrimaryButton';
// import ApiError from '@/components/UI/Error/Error';
// import H4 from '@/components/UI/Headings/H4';
// import H5 from '@/components/UI/Headings/H5';
// import H6 from '@/components/UI/Headings/H6';
// import H7 from '@/components/UI/Headings/H7';
// import Input from '@/components/UI/Inputs/Input';
// import FormLayout from '@/components/UI/Wrappers/FormLayout';
import Card from '@/components/UI/Card/Card';
import H1 from '@/components/UI/Headings/H1';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type { LoginForm } from '@/interfaces/interface';
// import { loginSuccess } from '@/redux/features/authSlice';
// import loginSchema, {
//   loginInitialValues,
// } from '@/validations/merchant/onBoarding/loginSchema';
import H5 from '@/components/UI/Headings/H5';

const NewLogin = () => {
  // const userData = useAppSelector((state: any) => state.auth);
  // const dispatch = useAppDispatch();
  // const [loginResponse] = useState<Partial<TLogin>>();
  // const [apierror, setApierror] = useState('');

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const AccessFormikValues = () => {
  //   const { values, errors } = useFormikContext<LoginForm>();
  //   useEffect(() => {
  //     // dispatch(setApiError(''))
  //     // dispatch(setApiError("hiiiiiiiii"))
  //     if (Object.keys(errors).length !== 0) {
  //       setApierror('');
  //     }

  //     if (loginResponse) {
  //       dispatch(loginSuccess(loginResponse));
  //     }
  //   }, [values, errors, loginResponse, dispatch, userData.email]);

  //   return null;
  // };

  // const onSubmit = async () => {
  //   // setIsSubmitting(true); // Disable the button immediately after submission
  // };

  return (
    <div className=" flex">
      <>
        <div className="flex h-screen">
          {/* <div className="w-1/2 flex  bg-white"> */}
          <Image
            src={accountTypeImg}
            alt="bottomLeftElipse"
            style={{ width: '100%', height: 'auto' }}
            className="bg-info-400"
            priority
            quality={75}
          />
        </div>

        {/* </div> */}

        <div className="bg-primary-900 flex w-1/2 flex-1 flex-col items-center pt-[179px]">
          <div className="flex flex-col gap-[34px]">
            <div>
              <H5 className="text-[44px]">
                How do you plan to use DropLeather?
              </H5>
              <div className="flex justify-center">
                <H1 className="text-2xl">
                  One quick choice, and we’ll take care of the rest.
                </H1>
              </div>
            </div>
            <div className="flex flex-col items-center gap-7">
              <Card
                logo={companyIcon}
                label={'For Solo Sellers / Entrepreneurs'}
                description={
                  'anyone selling on their own without a registered company'
                }
              />
              <Card
                logo={companyIcon}
                label={'For Registered Businesses or Brands'}
                description={
                  'new or existing companies with formal business registration'
                }
              />
              <Card
                logo={companyIcon}
                label={'For Content Creators / Influencers'}
                description={
                  'Social influencers, video creators, streamers, public personalities'
                }
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewLogin;
