'use client';

// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import LoginCard from '@/components/UI/Card/LoginCard/LoginCard';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';

const LoginSucessHome = () => {
  const userData = useAppSelector((state: any) => state.auth);
  console.log('userData', userData);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // const [route, setRoute] = useState<any>();
  const [data, setData] = useState<any>();
  // const router = useRouter();
  console.log(data);
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

  const fetchData = async () => {
    console.log('fetch data');

    try {
      const response = await apiClient.get(
        `merchant/getdetails/${userData?.email}`,
        // {
        //   params: {
        //     username:
        //   }
        // }
      );

      setData(response.data);
      // if (response?.data.responseCode !== '009') {
      //   setShowModal(true);
      //   setTitle('Network Issue');
      //   setDescription(response.data.responseDescription);
      // }

      // const pageStatuses = [
      //   {
      //     routeName: '/merchant/home/business-nature/activity-information',
      //     status: response?.data?.activityInformation?.status,
      //   },
      //   {
      //     routeName: '/merchant/home/business-nature/business-details',
      //     status: response?.data?.businessDetails?.status,
      //   },
      //   {
      //     routeName: '/merchant/home/business-nature/settlement-details',
      //     status: response?.data?.settlementDetails?.status,
      //   },
      //   {
      //     routeName: '/merchant/home/business-nature/integration/',
      //     status: response?.data?.integration?.status,
      //   },
      //   {
      //     routeName: '/merchant/home/business-nature/attachments',
      //     status: response?.data?.merchantDocuments?.documentStatus,
      //   },
      //   {
      //     routeName: '/merchant/home/business-nature/review-form',
      //     status: response?.data?.applicationForm?.documentStatus,
      //   },
      // ];
      // console.log('pageStatuses ', pageStatuses);

      // determineNextRoute(pageStatuses);

      if (response) {
        try {
          const businessType =
            response?.data?.activityInformation?.businessNature;

          const fieldsResponse = await apiClient.get(
            `/merchant/getPageInfo`,

            {
              params: {
                natureOfBusiness: businessType,
              },
            },
          );
          console.log('FIELDS DATA fieldsResponse Corporate: ', fieldsResponse);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e: any) {
      console.log(e, 'error fetching');
      setTitle(e.code);
      setDescription(e.message);
      setShowModal(true);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const LoginCardData = [
    {
      title: 'Merchant Onboarding',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
      hide: userData.onboardingCompleted,
    },
    {
      title: 'Continue to My Dashboard',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: '/merchant/merchant-portal/home/',
      hide: !userData.onboardingCompleted,
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
          {// data?.applicationFormStatus === 'PENDING'
          //   ? PendingMerchantCardData.map((item, index) => (
          //       <LoginCard
          //         key={index}
          //         title={item.title}
          //         description={item.description}
          //         routeName={item.routeName}
          //       />
          //     ))
          //   :
          LoginCardData?.map((item, index) => (
            <LoginCard
              key={index}
              title={item.title}
              description={item.description}
              routeName={item.routeName}
            /> // type={item.type} // onClickHandler={handleNavigate} /> ))
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginSucessHome;
