'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
// import H7 from '@/components/UI/Headings/H7';
// import CheckboxInput from '@/components/UI/Inputs/CheckboxRadioInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  // setApplicants,
  // setApplicationForm,
  setBusinessNature,
  setMerchantEntity,
} from '@/redux/features/formSlices/onBoardingForms';
import {
  businessNatureInitialValues,
  businessNatureSchema,
} from '@/validations/merchant/onBoarding/businessNatureSchema';

import SuccessModal from '../../../../components/UI/Modal/CustomModal';

const BusinessNature = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  // const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const corporateJourneyType = useAppSelector(
    (state: any) => state.corporateJourneyType,
  );
  console.log('business nature type', corporateJourneyType);
  const userData = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log('uploadsss', uploads);
  // }, [uploads]);

  // const corporateProducts = [
  //   {
  //     label: 'Current Account',
  //     value: 'currentAccount',
  //   },
  //   {
  //     label: 'Savings Account',
  //     value: 'savingAccount',
  //   },
  // ];
  // const selfServeProducts = [
  //   {
  //     label: 'Salary Disbursement',
  //     value: 'self_salaryDisbursement',
  //   },
  //   {
  //     label: 'Bulk Transactions',
  //     value: 'self_bulkTransactions',
  //   },
  // ];
  // const managedDisbursementProducts = [
  //   {
  //     label: 'Salary Disbursement',
  //     value: 'managed_salaryDisbursement',
  //   },
  //   {
  //     label: 'Bulk Transactions',
  //     value: 'managed_bulkTransactions',
  //   },
  // ];
  // const othersProducts = [
  //   {
  //     label: 'Payment Collection',
  //     value: 'Payment Collection',
  //   },
  //   {
  //     label: 'Disbursement API',
  //     value: 'Disbursement API',
  //   },
  //   {
  //     label: 'Online Payment Gateway',
  //     value: 'Payment Gateway',
  //   },
  //   {
  //     label: 'In-App Integration',
  //     value: 'In-App Integration',
  //   },
  //   {
  //     label: 'Easypaisa QR ',
  //     value: 'Easypaisa QR ',
  //   },
  //   {
  //     label: 'Easypaisa Till Payment',
  //     value: 'Easypaisa Till Payment',
  //   },
  // ];

  // const products = [
  //   {
  //     label: 'Current Account',
  //     value: 'currentAccount',
  //   },
  //   {
  //     label: 'Saving Account',
  //     value: 'savingAccount',
  //   },
  //   // {
  //   //   label: 'Self Account',
  //   //   value: 'selfAccount',
  //   // },
  //   // {
  //   //   label: 'Etc Account',
  //   //   value: 'etcAccount',
  //   // },
  // ];

  // const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(Array(5).fill(null))
  // const [selectedCheckValue, setSelectedCheckValue] = useState<
  //   string | undefined | string[]
  // >(undefined);
  // console.log(selectedCheckValue, 'MULTI SELECT OPTION');

  // const dispatch = useAppDispatch();
  // corporate Options business nature
  // const options = [
  //   {
  //     value: 'soleProprietor',
  //     label: 'Sole-Proprietorship',
  //     endpoint: 'soleBusinessDetails'
  //   },
  //   {
  //     value: 'publicAndPrivateLtd',
  //     label: 'Private Limited / Public Limited / SMC - Private Limited',
  //     endpoint: 'pnpBusinessDetails'

  //   },
  //   {
  //     value: 'partnership',
  //     label:
  //       'Partnership (Registered / Unregistered) / Limited Liability Partnerships',
  //     endpoint: 'partnershipBusinessDetails'
  //   },
  //   {
  //     value: 'g2p',
  //     label: 'Government Accounts / Autonomous Body',
  //     endpoint: 'otherBusinessDetails'
  //   },
  //   {
  //     value: 'ngoNpoCharities',
  //     label:
  //     'NGO / INGO / Trust / Club / Societies and Associations Limited by Guarantee',
  //     endpoint: 'nncBusinessDetails',
  //   },
  // ];

  const options = [
    {
      value: 'soleProprietor',
      label: 'Sole-Proprietorship',
      endpoint: 'soleBusinessDetails',
    },
    {
      value: 'publicAndPrivateLtd',
      label: 'Private Limited / Public Limited / SMC - Private Limited',
      endpoint: 'pnpBusinessDetails',
    },
    {
      value: 'partnership',
      label:
        'Partnership (Registered / Unregistered) / Limited Liability Partnerships',
      endpoint: 'partnershipBusinessDetails',
    },
    {
      value: 'g2p',
      label: 'Government Accounts / Autonomous Body',
      endpoint: 'otherBusinessDetails',
    },
    {
      value: 'ngoNpoCharities',
      label:
        'NGO / INGO / Trust / Club / Societies and Associations Limited by Guarantee',
      endpoint: 'nncBusinessDetails',
    },
  ];
  // const [windowSize, setWindowSize] = useState({
  //   width: 0,
  //   height: 0,
  // });

  // const fetchData = async () => {
  //   try {
  //     const response = await apiClient.get(`/corporate/corporateFormReview`, {
  //       params: { email: userData?.email },
  //     });
  //     const fetchedData = {
  //       ...response?.data?.mulipleApplicantsData?.applicants?.[0],
  //       accountTitle: response?.data?.mulipleApplicantsData?.accountTitle,
  //       businessNtnNumber:
  //         response?.data?.mulipleApplicantsData?.businessNtnNumber,
  //       requiredBusiness:
  //         response?.data?.mulipleApplicantsData?.requiredBusiness,
  //     };
  //     console.log('FETCH RES ', response, fetchedData);
  //     dispatch(setApplicationForm(fetchedData ?? ''));

  //     if (response?.data?.mulipleApplicantsData?.applicants?.length > 1) {
  //       const processedApplicants =
  //         response?.data?.mulipleApplicantsData?.applicants
  //           ?.slice(1)
  //           ?.map((applicant: any, index: any) => ({
  //             ...applicant,
  //             id: index, // Assign a unique id
  //             // id: nanoid(), // Assign a unique id
  //           }));

  //       console.log('processedApplicants ', processedApplicants);
  //       dispatch(setApplicants(processedApplicants ?? []));
  //     }
  //   } catch (e) {
  //     console.log(e, 'error fetching');
  //   }
  // };

  useEffect(() => {
    // fetchData();

    const handleResize = () => {
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onSubmit = async (values: any) => {
    console.log('BUSINESS NATURE LOGS', values);
    setIsSubmitting(true);
    const selectedOption = options.find(
      (option) => option.label === values.businessNature,
    );

    const businessType = selectedOption?.value;
    const businessEndpoint = selectedOption?.endpoint;

    values.businessTypeNature = businessType;
    values.businessEndpoint = businessEndpoint;

    // if (values.typeOfRequest) {
    dispatch(setBusinessNature(values));
    dispatch(setMerchantEntity(values?.businessTypeNature));
    try {
      console.log('<Merchant> USER ', userData);

      if (userData?.email && businessType) {
        const response = await apiClient.get(
          `/merchant/getPageInfo/${businessType}`,
        );
        console.log('FIELDS DATA Corporate: ', response);
        if (response?.data?.responseCode === '009') {
          dispatch(setPageData(response.data));
          router.push('/merchant/home/business-nature/activity-information');
        } else if (response?.data?.responseCode === '000') {
          setTitle('Error Occured');
          setDescription(response?.data?.responseDescription);
          setShowModal(true);
        } else {
          setTitle('Error Occured');
          setDescription(response?.data?.responseDescription);
          setShowModal(true);
        }
      }
    } catch (e: any) {
      setTitle('Network Error!');
      setDescription(e.errorMessage);
      setShowModal(true);
      console.log('Error fetching fields Data:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/merchant/home/business-nature/application-form"
      />
      <Formik
        initialValues={businessNatureInitialValues}
        validationSchema={businessNatureSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex w-full flex-col gap-6">
              <HeaderWrapper
                heading="What is the nature of your business?"
                // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
                show
              />

              <FormWrapper>
                <div className="flex w-full flex-col gap-4">
                  <>
                    <H6>Nature of your business</H6>
                    <DropdownInput
                      label="Select from menu"
                      name="businessNature"
                      formik={formik}
                      error={formik.errors.businessNature}
                      touched={formik.touched.businessNature}
                      options={options}
                    />
                  </>
                </div>
              </FormWrapper>
              <div className="flex flex-col justify-center gap-6 sm:items-center sm:px-5 sm:max-md:pt-[12px] md:items-end">
                <Button
                  label="Continue"
                  isDisabled={isSubmitting}
                  type="submit"
                  className="button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BusinessNature;
