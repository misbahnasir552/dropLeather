'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import LoginCard from '@/components/UI/Card/LoginCard/LoginCard';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import { clearCredentials } from '@/redux/features/corporateSlices/loginCredentials';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  setApplicants,
  setApplicationForm,
  setBusinessNature,
  setCorporateEntity,
  // setLogoutOnboarding,
  setSoleName,
} from '@/redux/features/formSlices/onBoardingForms';

// import apiClient from '@/api/apiClient';

const LoginSucess = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const applicationData = useAppSelector(
    (state: any) => state.onBoardingForms.applicationForm,
  );
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const userEmail = userData.email
  type TabStatus = 'Pending' | 'Completed';

  interface Tab {
    id: number;
    name: string;
    status: TabStatus;
  }

  const applicantsStore = useAppSelector(
    (state: any) => state.onBoardingForms.addApplicants,
  );

  console.log('APP STORE BUSINESS ', applicantsStore);

  console.log('user data is', userData);
  const router = useRouter();
  // const [allowNavigation, setAllowNavigation] = useState(false);

  const options = [
    {
      value: 'soleProprietor',
      label: 'Sole-Proprietorship',
    },
    {
      value: 'publicAndPrivateLtd',
      label: 'Private Limited / Public Limited / SMC - Private Limited',
    },
    {
      value: 'partnership',
      label:
        'Partnership (Registered / Unregistered) / Limited Liability Partnerships',
    },
    {
      value: 'g2p',
      label: 'Government Accounts / Autonomous Body',
    },
    {
      value: 'ngoNpoCharities',
      label:
        'NGO / INGO / Trust / Club / Societies and Associations Limited by Guarantee',
    },
  ];

  if (userData.temp) {
    router.push('/merchant/home/reset-password');
  }

  const [route, setRoute] = useState<any>();
  const [data, setData] = useState<any>();

  const dispatch = useAppDispatch();

  const determineNextRoute = (
    pages: { routeName: string; status: string }[],
  ) => {
    const routeOrder = [
      '/merchant/home/business-nature/application-form',
      '/merchant/home/business-nature/live-picture',
      '/merchant/home/business-nature/attachments',
      '/merchant/home/business-nature/review-form',
    ];

    for (let i = 0; i < routeOrder.length; i += 1) {
      const currentRoute = pages.find(
        (page) => page.routeName === routeOrder[i],
      );

      const nextRouteStatus = pages.find(
        (page) => page.routeName === routeOrder[i + 1],
      );

      const nextRoute = routeOrder[i + 1];

      if (currentRoute?.status === 'Pending') {
        setRoute(currentRoute.routeName);
        return;
      }
      if (currentRoute?.status === 'Completed' && nextRoute) {
        if (nextRoute && nextRouteStatus?.status !== 'Completed') {
          setRoute(nextRoute);
          return;
        }
      } else if (currentRoute?.status && currentRoute?.routeName) {
        setRoute(currentRoute.routeName);
        return;
      } else {
        setRoute('business-nature');
      }
    }
  };

  const tabs: Tab[] = [
    { id: 1, name: 'Step 1', status: data?.mulipleApplicantsData?.status },
    {
      id: 2,
      name: 'Step 2',
      status: data?.livePictures?.[0]?.livePictureStatus,
    },
    {
      id: 3,
      name: 'Step 3',
      status: data?.livePictures?.[0]?.livePictureStatus,
    },
    {
      id: 4,
      name: 'Step 4',
      status: data?.corporateDocuments?.[0]?.documentStatus,
    },
    {
      id: 5,
      name: 'Step 5',
      status: data?.corporateDocuments?.[0]?.documentStatus,
    },
  ];

  const calculateProgress = (tabs: Tab[]): number => {
    console.log('prog tab ', tabs);

    const totalTabs = tabs.length;
    console.log('total tab length ', totalTabs);

    const completedTabs = tabs.filter(
      (tab) => tab.status === 'Completed',
    ).length;
    console.log('complete tabs ', completedTabs);

    return Math.round((completedTabs / totalTabs) * 100);
  };
  const fetchData = async () => {
    try {
      dispatch(setApplicants([]));
      dispatch(setApplicationForm({}));
      // dispatch(clearCredentials());
      // dispatch(setLogoutOnboarding());

      // const response = await apiClient.get(`/corporate/corporateFormReview`, {
      //   params: { email: userData?.email },
      // });
      setIsLoading(true);

      const response = await apiClient.get('/corporate/corporateFormReview', {
        params: {
          email: userData?.email,
        },
      });
      setData(response.data);
      if (response?.data.responseCode !== '009') {
        setShowModal(true);
        setTitle('Network Issue');
        setDescription(response.data.responseDescription);
      }

      const fetchedData = {
        ...response?.data?.mulipleApplicantsData?.applicants?.[0],
        accountTitle: response?.data?.mulipleApplicantsData?.accountTitle,
        businessNtnNumber:
          response?.data?.mulipleApplicantsData?.businessNtnNumber,
        requiredBusiness:
          response?.data?.mulipleApplicantsData?.requiredBusiness,
        corporateStatus: response?.data?.corporateStatus,
        // corporateStatus: true
      };
      // dispatch(setApplicationForm({}));

      console.log('FETCH RES ', response.data);
      dispatch(setApplicationForm(fetchedData ?? ''));
      dispatch(
        setSoleName(
          response?.data?.mulipleApplicantsData?.applicants?.[0]
            ?.applicantFullName,
        ),
      );

      dispatch(
        setBusinessNature(
          response?.data?.mulipleApplicantsData?.corporateProducts ?? [],
        ),
      );
      dispatch(
        setCorporateEntity(
          response?.data?.mulipleApplicantsData?.corporateEntity ?? '',
        ),
      );

      if (response?.data?.mulipleApplicantsData?.applicants?.length > 1) {
        const processedApplicants =
          response?.data?.mulipleApplicantsData?.applicants
            ?.slice(1)
            ?.map((applicant: any, index: any) => ({
              ...applicant,
              id: index,
            }));
        // dispatch(setApplicants([]));

        console.log('processedApplicants ', processedApplicants);
        dispatch(setApplicants(processedApplicants ?? []));
      }

      const pageStatuses = [
        {
          routeName: '/merchant/home/business-nature/application-form',
          status: response?.data?.mulipleApplicantsData?.status,
        },
        {
          routeName: '/merchant/home/business-nature/live-picture',
          status: response?.data?.livePictures?.[0]?.livePictureStatus,
        },
        {
          routeName: '/merchant/home/business-nature/attachments',
          status: response?.data?.corporateDocuments?.[0]?.documentStatus,
        },
        {
          routeName: '/merchant/home/business-nature/review-form',
          status: response?.data?.corporateDocuments?.[0]?.documentStatus,
        },
      ];
      determineNextRoute(pageStatuses);

      if (response) {
        try {
          const selectedOption = options.find(
            (option) =>
              option.label ===
              response?.data?.mulipleApplicantsData?.corporateEntity,
          );

          const businessType = selectedOption?.value;

          const fieldsResponse = await apiClient.get(
            `/corporate/getPageInfo/${businessType}`,
          );
          console.log('FIELDS DATA fieldsResponse Corporate: ', fieldsResponse);
          dispatch(setPageData(fieldsResponse.data));

          const progress = calculateProgress(tabs);
          console.log('progresss ', progress);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // useLayoutEffect(() => {
  //   fetchData();
  // }, []);
  //   const getCorporateEmailStatus=async()=>{
  //     try {
  //       const getCorporateEmailStatus = await apiClient.get(`corporate/inquirependingtickets?email=${userEmail}`,
  //       );
  //       console.log("getCorporateEmailStatus", getCorporateEmailStatus.data.responseCode)
  //       if (getCorporateEmailStatus.data.responseCode==='009'){
  //            setAllowNavigation(false)
  //       }
  //       else{
  //         setAllowNavigation(true)
  //       }

  //     }
  //     catch {
  // console.log("here")
  //     }
  //   }

  //   useEffect(()=>{
  //     getCorporateEmailStatus();
  //   },[])

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

  const CorporateLoginCardData = [
    {
      title: 'Create a new easypaisa Corporate Account ',
      description:
        'Create a Corporate Account with easypaisa in a few easy steps which will be used for the easypaisa Corporate Products you have selected.',
      routeName: route,
      // routeName: 'business-nature',
      type: 'onboarding',
      // isDiabled: false
    },
    {
      title: 'Modify an existing easypaisa Corporate Account',
      description:
        'Submit a request to modify details of an existing easypaisa Corporate Account.',
      // isDiabled: allowNavigation,
      routeName: '/merchant/home/change-account-request',
      type: 'changeAccountRequest',
    },
    {
      title: 'Application Status Tracking',
      description:
        'As you wait for feedback on your easypaisa Corporate Account opening application, here’s a summary of application progress.',
      isDiabled: false,
      routeName: 'application-status',
      type: 'viewApplicationStatus',
    },
  ];

  const CorporateIncompleteLoginCardData = [
    {
      title: 'Create a new easypaisa Corporate Account ',
      description:
        'Create a Corporate Account with easypaisa in a few easy steps which will be used for the easypaisa Corporate Products you have selected.',
      routeName: route,
      type: 'onboarding',
    },
    {
      title: 'Modify an existing easypaisa Corporate Account',
      description:
        'Submit a request to modify details of an existing easypaisa Corporate Account.',
      routeName: '/merchant/home/change-account-request',
      type: 'changeAccountRequest',
    },
  ];

  const CorporateRequestLoginCardData = [
    {
      title: 'Request Revision',
      description:
        'Create a Corporate Account with easypaisa in a few easy steps which will be used for the easypaisa Corporate Products you have selected.',
      routeName: '',
      // routeName: 'business-nature/application-form',
      type: 'onboarding',
      // isDiabled: false
    },
    {
      title: 'View Application Status',
      description:
        'Check the latest updates and status of your corporate application here.',
      isDiabled: false,
      routeName: 'application-status',
      type: 'viewApplicationStatus',
    },
  ];

  const CorporateSubmittedLoginCardData = [
    {
      title: 'Modify an existing easypaisa Corporate Account',
      description:
        'Submit a request to modify details of an existing easypaisa Corporate Account.',
      // isDiabled: allowNavigation,
      routeName: '/merchant/home/change-account-request',
      type: 'changeAccountRequest',
    },
    {
      title: 'View Application Status',
      description:
        'Check the latest updates and status of your corporate application here.',
      isDiabled: false,
      routeName: 'application-status',
      type: 'viewApplicationStatus',
    },
  ];

  return (
    <>
      {isLoading ? (
        <BarLoader color="#21B25F" />
      ) : (
        <>
          <CustomModal
            title={title}
            description={description}
            show={showModal}
            setShowModal={setShowModal}
          />
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
                Create and modify your easypaisa Corporate Account effortlessly
                through our user-friendly portal with real-time application
                status visibility.
              </p>
            </div>
            <div className="flex gap-5 sm:max-md:flex-col sm:max-md:gap-6">
              {userData.userType === 'Corporate' ? (
                <>
                  {userData?.isrequestRevision ? (
                    <>
                      {CorporateRequestLoginCardData.map((item, index) => (
                        <LoginCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          isDisabled={item.isDiabled}
                          routeName={item.routeName}
                          type={item.type}
                          // onClickHandler={handleNavigate}
                        />
                      ))}
                    </>
                  ) : applicationData?.corporateStatus === 'Incomplete' ? (
                    <>
                      {CorporateIncompleteLoginCardData.map((item, index) => (
                        <LoginCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          // isDisabled={item.isDiabled}
                          routeName={item.routeName}
                          type={item.type}
                          // onClickHandler={handleNavigate}
                        />
                      ))}
                    </>
                  ) : applicationData?.corporateStatus !== 'Incomplete' ? (
                    <>
                      {CorporateSubmittedLoginCardData.map((item, index) => (
                        <LoginCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          isDisabled={item.isDiabled}
                          routeName={item.routeName}
                          type={item.type}
                          // onClickHandler={handleNavigate}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {CorporateLoginCardData.map((item, index) => (
                        <LoginCard
                          key={index}
                          title={item.title}
                          description={item.description}
                          isDisabled={item.isDiabled}
                          routeName={item.routeName}
                          type={item.type}
                          // onClickHandler={handleNavigate}
                        />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSucess;
