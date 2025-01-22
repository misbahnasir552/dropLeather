'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// import { BarLoader } from 'react-spinners';
// import apiClient from '@/api/apiClient';
import LoginCard from '@/components/UI/Card/LoginCard/LoginCard';
// import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';
// import { clearCredentials } from '@/redux/features/corporateSlices/loginCredentials';
// import { setPageData } from '@/redux/features/formSlices/fieldSlice';
// import {
//   setApplicants,
//   setApplicationForm,
//   setBusinessNature,
//   setCorporateEntity,
//   // setLogoutOnboarding,
//   setSoleName,
// } from '@/redux/features/formSlices/onBoardingForms';

// import apiClient from '@/api/apiClient';

const LoginSucessHome = () => {
  const userData = useAppSelector((state: any) => state.auth);
  // const applicationData = useAppSelector(
  //   (state: any) => state.onBoardingForms.applicationForm,
  // );
  // const [showModal, setShowModal] = useState(false);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // const userEmail = userData.email
  // type TabStatus = 'Pending' | 'Completed';

  // interface Tab {
  //   id: number;
  //   name: string;
  //   status: TabStatus;
  // }

  const applicantsStore = useAppSelector(
    (state: any) => state.onBoardingForms.addApplicants,
  );

  console.log('APP STORE BUSINESS ', applicantsStore);

  console.log('user data is', userData);
  const router = useRouter();

  if (userData?.temp) {
    router.push('/merchant/home/reset-password');
  }

  const LoginCardData = [
    {
      title: 'Sandbox Integrations',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    {
      title: 'Production Onboarding',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    {
      title: 'Continue to My Dashboard',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    // {
    //   title: 'Continue to My Dashboard',
    //   description:
    //     'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
    //   routeName: 'xyz',
    // },
  ];

  return (
    <>
      {/* <CustomModal
            title={title}
            description={description}
            show={showModal}
            setShowModal={setShowModal}
          /> */}
      <div className="flex flex-col gap-9 px-[150px] py-[60px] sm:max-md:gap-6 sm:max-md:px-[24px] sm:max-md:py-[36px]">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-semibold leading-[60px] text-secondary-base sm:max-md:text-[32px] sm:max-md:leading-[40px]">
            Welcome to easypaisa{' '}
            {userData?.userType === 'Corporate' ? (
              <span className="text-primary-base">
                {' '}
                Corporate Onboarding Portal{' '}
              </span>
            ) : (
              <span className="text-primary-base"> Developer Portal </span>
            )}
          </p>
          <p className="text-base font-normal leading-5 text-secondary-600 sm:max-md:text-sm sm:max-md:leading-[18px] ">
            Create and modify your easypaisa account effortlessly through our
            user-friendly portal with real-time application status visibility.
          </p>
        </div>
        <div className="flex gap-5 sm:max-md:flex-col sm:max-md:gap-6">
          {LoginCardData.map((item, index) => (
            <LoginCard
              key={index}
              title={item.title}
              description={item.description}
              routeName={item.routeName}
              // type={item.type}
              // onClickHandler={handleNavigate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginSucessHome;
