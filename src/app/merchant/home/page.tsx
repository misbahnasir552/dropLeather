'use client';

// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import LoginCard from '@/components/UI/Card/LoginCard/LoginCard';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import { generateMD5Hash } from '@/utils/helper';

interface MerchantData {
  activityInformation?: { status: string };
  businessDetails?: { status: string };
  settlementDetails?: { status: string };
  integration?: { status: string };
  documents?: { status: string };
  reviewForm?: { status: string };
}

const LoginSucessHome = () => {
  const userData = useAppSelector((state: any) => state.auth);
  console.log('userData', userData);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description] = useState('');
  const [apierror, setApierror] = useState('');
  const [reqRevisiondata, setReqRevisionData] = useState<MerchantData | null>(
    null,
  );

  console.log(setTitle);

  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [route, setRoute] = useState<any>();

  // const router = useRouter();
  // console.log(data);
  // if (userData?.temp) {
  //   router.push('/merchant/home/reset-password');
  // }

  // const determineNextRoute = (
  //   pages: { routeName: string; status: string }[],
  // ) => {
  //   console.log('determineNextRoute ', route);

  //   const routeOrder = [
  //     '/merchant/home/business-nature/activity-information',
  //     '/merchant/home/business-nature/business-details',
  //     '/merchant/home/business-nature/settlement-details',
  //     '/merchant/home/business-nature/integration/',
  //     '/merchant/home/business-nature/attachments',
  //     '/merchant/home/business-nature/review-form',
  //   ];

  //   for (let i = 0; i < routeOrder.length; i += 1) {
  //     console.log('111');

  //     const currentRoute = pages.find(
  //       (page) => page.routeName === routeOrder[i],
  //     );

  //     const nextRouteStatus = pages.find(
  //       (page) => page.routeName === routeOrder[i + 1],
  //     );

  //     const nextRoute = routeOrder[i + 1];

  //     if (currentRoute?.status === 'Pending') {
  //       setRoute(currentRoute.routeName);
  //       return;
  //     }
  //     console.log('1111111', currentRoute);

  //     if (currentRoute?.status === 'Completed' && nextRoute) {
  //       console.log('222', nextRoute);

  //       if (nextRoute && nextRouteStatus?.status !== 'Completed') {
  //         setRoute(nextRoute);
  //         return;
  //       }
  //     } else if (currentRoute?.status && currentRoute?.routeName) {
  //       console.log('3333');

  //       setRoute(currentRoute.routeName);
  //       return;
  //     } else {
  //       setRoute('business-nature');
  //     }
  //   }
  //   console.log('route to ', route);
  // };

  const fixedTabOrder = [
    'activity-information',
    'business-details',
    'store-details',
    'settlement-details',
    'integration',
  ];

  const currentTimestamp = new Date().toISOString();
  const { apiSecret } = userData;
  const username = userData?.email;

  const mdRequest = {
    currentTimestamp,
    apiSecret,
    username,
  };

  const md5Hash = generateMD5Hash(mdRequest);
  console.log('mdRequest', mdRequest);

  const handleRequestRevisionClick = async () => {
    try {
      console.log('hello');
      const response = await apiClient.get(
        `/merchant/fieldsForRevision?email=${userData.email}`,
        {
          params: {
            username,
            timestamp: currentTimestamp,
            signature: md5Hash,
          },
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            // Username: userData?.email,
          },
        },
      );

      console.log('responseeeee', response);
      if (response?.data?.responseCode === '009') {
        setReqRevisionData(response.data);
        console.log('Request revision data:', reqRevisiondata);
        dispatch(setPageData(response.data));

        console.log('Request revision response:', response.data);

        // Step 1: Check the structure of response.data.page
        const pages = response.data.page;
        console.log('Pages:', pages);

        if (!Array.isArray(pages)) {
          console.error('Expected pages to be an array, but got:', pages);
          return;
        }

        // Normalize fixedTabOrder for case-insensitive matching and removing spaces
        const normalizedFixedTabOrder = fixedTabOrder.map((page) =>
          page.toLowerCase().replace(/\s+/g, '-'),
        );

        // Step 2: Create a shallow copy of the page array and reorder it based on the fixedTabOrder
        const reorderedPages = [...pages].sort((a: any, b: any) => {
          const normalizedPageNameA = a.pageName
            .toLowerCase()
            .replace(/\s+/g, '-');
          const normalizedPageNameB = b.pageName
            .toLowerCase()
            .replace(/\s+/g, '-');

          // Get the index of the normalized page names in the fixedTabOrder
          const indexA = normalizedFixedTabOrder.indexOf(normalizedPageNameA);
          const indexB = normalizedFixedTabOrder.indexOf(normalizedPageNameB);

          // If not found in fixedTabOrder, push to the end of the list
          const safeIndexA = indexA === -1 ? fixedTabOrder.length : indexA;
          const safeIndexB = indexB === -1 ? fixedTabOrder.length : indexB;

          // Log index and pageName for debugging
          console.log(
            'Normalized Index of A:',
            safeIndexA,
            'PageName:',
            normalizedPageNameA,
          );
          console.log(
            'Normalized Index of B:',
            safeIndexB,
            'PageName:',
            normalizedPageNameB,
          );

          return safeIndexA - safeIndexB; // Ensures that pages are sorted according to fixedTabOrder
        });

        console.log('Reordered Pages:', reorderedPages);

        // Step 3: Get the first page after sorting
        const firstPage = reorderedPages[0]?.pageName;
        console.log('First page after reordering:', firstPage);
        console.log('check');

        if (firstPage) {
          // Step 4: Format the route
          const formattedRoute = `/merchant/home/request-revision/${firstPage
            .toLowerCase()
            .replace(/\s+/g, '-')}`; // Convert to kebab-case if needed
          console.log('Formatted route:', formattedRoute);

          // Step 5: Use router.push() to navigate
          router.push(formattedRoute); // Navigate to the first page in the ordered list
        } else {
          console.error('No valid pageName found in reorderedPages');
          // Fallback in case no pages are found
          router.push('/merchant/home');
        }
      } else {
        setApierror(response?.data?.responseMessage);
      }
    } catch (error: any) {
      console.error('Error requesting revision:', error);
      console.log('responseeeee', error);
      setApierror(error.message);
      // setDescription(error);
      // setShowModal(true);
    }
  };

  const LoginCardData = [
    {
      title: 'Merchant Onboarding',
      description:
        'Get your business online and start accepting digital payments securely and swiftly. Complete a simple sign-up process and get verified to enjoy full access to easypaisa merchant services.',
      routeName: 'business-nature',
      hide:
        (userData.onboardingCompleted === true &&
          userData.onboardingCompleted === false) ||
        (userData.onboardingCompleted === true &&
          userData.onboardingCompleted === true),
    },
    {
      title: 'Request Revision',
      description:
        'We’ve reviewed your onboarding details and need a few corrections or additional documents to proceed. Please revise the highlighted sections to complete your registration process.',
      // routeName: '/merchant/home/request-revision',
      hide:
        (userData.onboardingCompleted === false &&
          userData.isrequestRevision === false) ||
        (userData.onboardingCompleted === true &&
          userData.isrequestRevision === false),
      onClick: handleRequestRevisionClick,
    },
    {
      title: 'Merchant Dashboard',
      description:
        'Monitor transactions, track earnings, download reports, and manage your business profile with ease.',
      routeName: '/merchant/merchant-portal/home/',
      hide:
        (userData.onboardingCompleted === false &&
          userData.isrequestRevision === false) ||
        (userData.onboardingCompleted === true &&
          userData.isrequestRevision === true),
    },
    // PLease DO NOT REMOVE THE CODE BELOw
    // {
    //   title: 'Sandbox Integrations',
    //   description:
    //     'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
    //   routeName: 'business-nature',
    // },
  ].filter((card) => !card.hide);
  // ].filter((card) => !card.hide);

  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
      <div className="sm:max-md:ga-6 flex flex-col gap-9 px-[150px] py-[60px] sm:max-md:px-[24px] sm:max-md:py-[36px]">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-semibold leading-[60px] text-secondary-base sm:max-md:text-[32px] sm:max-md:leading-[40px]">
            Welcome to easypaisa{' '}
            <span className="text-primary-base"> Merchant Portal </span>
          </p>
          <p className="text-base font-normal leading-5 text-secondary-600 sm:max-md:text-sm sm:max-md:leading-[18px] ">
            Create and modify your easypaisa account effortlessly through our
            user-friendly portal with real-time application status visibility.
          </p>
        </div>
        <div className="flex gap-5 sm:max-md:flex-col sm:max-md:gap-6">
          {LoginCardData?.map((item, index) => (
            <LoginCard
              key={index}
              title={item.title}
              description={item.description}
              routeName={item.routeName}
              onClick={item.onClick}
            /> // type={item.type} // onClickHandler={handleNavigate} /> ))
          ))}
        </div>
        <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
          {apierror}
        </div>
      </div>
    </>
  );
};

export default LoginSucessHome;
