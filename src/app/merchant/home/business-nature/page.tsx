'use client';

import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import H7 from '@/components/UI/Headings/H7';
import CheckboxInput from '@/components/UI/Inputs/CheckboxRadioInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  // setApplicants,
  // setApplicationForm,
  setBusinessNature,
  setCorporateEntity,
} from '@/redux/features/formSlices/onBoardingForms';
import {
  businessNatureInitialValues,
  businessNatureSchema,
} from '@/validations/merchant/onBoarding/businessNatureSchema';

import SuccessModal from '../../../../components/UI/Modal/CustomModal';

const BusinessNature = () => {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  // const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const corporateJourneyType = useAppSelector(
    (state: any) => state.corporateJourneyType,
  );
  // const { journeyType } = corporateJourneyType;
  // const [uploads, setUploads] = useState<Array<File | null>>([null]);
  console.log('business nature type', corporateJourneyType);
  const userData = useAppSelector((state) => state.auth);
  // const formData = new FormData();

  // useEffect(() => {
  //   console.log('uploadsss', uploads);
  // }, [uploads]);

  const corporateProducts = [
    {
      label: 'Current Account',
      value: 'currentAccount',
    },
    {
      label: 'Savings Account',
      value: 'savingAccount',
    },
  ];
  const selfServeProducts = [
    {
      label: 'Salary Disbursement',
      value: 'self_salaryDisbursement',
    },
    {
      label: 'Bulk Transactions',
      value: 'self_bulkTransactions',
    },
  ];
  const managedDisbursementProducts = [
    {
      label: 'Salary Disbursement',
      value: 'managed_salaryDisbursement',
    },
    {
      label: 'Bulk Transactions',
      value: 'managed_bulkTransactions',
    },
  ];
  const othersProducts = [
    {
      label: 'Payment Collection',
      value: 'Payment Collection',
    },
    {
      label: 'Disbursement API',
      value: 'Disbursement API',
    },
    {
      label: 'Online Payment Gateway',
      value: 'Payment Gateway',
    },
    {
      label: 'In-App Integration',
      value: 'In-App Integration',
    },
    {
      label: 'Easypaisa QR ',
      value: 'Easypaisa QR ',
    },
    {
      label: 'Easypaisa Till Payment',
      value: 'Easypaisa Till Payment',
    },
  ];

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
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  console.log(selectedCheckValue, 'MULTI SELECT OPTION');

  // const dispatch = useAppDispatch();
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
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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

    values.businessTypeNature = businessType;

    // if (values.typeOfRequest) {
    dispatch(setBusinessNature(values));
    dispatch(setCorporateEntity(values?.businessNature));
    console.log('window size is', windowSize);
    try {
      console.log('CORPORATE USER ', userData);

      if (userData?.userType) {
        const response = await apiClient.get(
          `/corporate/getPageInfo/${businessType}`,
        );
        console.log('FIELDS DATA Corporate: ', response);
        dispatch(setPageData(response.data));

        if (
          values?.selfServeProducts.includes('self_salaryDisbursement') ||
          values?.selfServeProducts.includes('self_bulkTransactions') ||
          values?.othersProducts.includes('Disbursement API')
        ) {
          setTitle('Account Type Confirmation');
          setDescription(
            'Based on your product(s) selection, Easypaisa Branchless Banking and Telenor Bank Account will be created.',
          );
          // setDescription('T24 account & EWP high contention account creation.');
          setShowModal(true);
        } else if (
          values?.corporateProducts.includes('currentAccount') ||
          values?.corporateProducts.includes('savingAccount') ||
          values?.managedDisbursementProducts.includes(
            'managed_salaryDisbursement',
          ) ||
          values?.managedDisbursementProducts.includes(
            'managed_bulkTransactions',
          ) ||
          values?.othersProducts.includes('Payment Collection')
        ) {
          setTitle('Account Type Confirmation');
          setDescription(
            'Based on your product(s) selection, Telenor Bank Account will be created.',
          );
          setShowModal(true);
        } else {
          setTitle('Account Type Confirmation');
          setDescription(
            'Based on your product(s) selection, Easypaisa Branchless Banking Account will be created.',
          );
          setShowModal(true);
        }
        // router.push('/merchant/home/business-nature/application-form');
      }
      //  else {
      //   const response = await apiClient.get(
      //     `/merchant/getPageInfo/${businessType}`,
      //   );
      //   console.log('FIELDS DATA Merchant: ', response);
      //   dispatch(setPageData(response.data));
      //   router.push('/merchant/home/business-nature/activity-information');
      // }
      else {
        console.log('ELSE CORPORATE USER ', userData);

        // if (userData?.userType) {
        const response = await apiClient.get(
          `/corporate/getPageInfo/${businessType}`,
        );
        console.log('FIELDS DATA Corporate: ', response);
        dispatch(setPageData(response.data));

        if (
          values?.corporateProducts.includes('currentAccount') ||
          values?.corporateProducts.includes('savingAccount') ||
          values?.managedDisbursementProducts.includes(
            'managed_salaryDisbursement',
          ) ||
          values?.managedDisbursementProducts.includes(
            'managed_bulkTransactions',
          ) ||
          values?.othersProducts.includes('Payment Collection')
        ) {
          setTitle('Account Type');
          setDescription('Only T24 account creation.');
          setShowModal(true);
        } else if (
          values?.selfServeProducts.includes('self_salaryDisbursement') ||
          values?.selfServeProducts.includes('self_bulkTransactions') ||
          values?.othersProducts.includes('Disbursement API')
        ) {
          setTitle('Account Type');
          setDescription('T24 account & EWP high contention account creation.');
          setShowModal(true);
        } else {
          setTitle('Account Type');
          setDescription('Only Merchant account creation.');
          setShowModal(true);
        }
        // router.push('/merchant/home/business-nature/application-form');
        // router.push('/merchant/home/business-nature/application-form');
        // }
      }
    } catch (e) {
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
        routeName="/merchant/home/business-nature/application-form"
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
                    <H6>Type of corporate entities</H6>
                    <DropdownInput
                      label="Select from menu"
                      name="businessNature"
                      formik={formik}
                      error={formik.errors.businessNature}
                      touched={formik.touched.businessNature}
                      options={options}
                    />
                  </>
                  <>
                    <H6>Products (Select All that are required)</H6>
                    <H6>Corporate Account</H6>
                    <div className="grid w-full grid-cols-1 gap-4">
                      <CheckboxInput
                        isMulti={true}
                        name={'corporateProducts'}
                        options={corporateProducts?.map((option: any) => ({
                          label: option.label,
                          value: option.value,
                          // value: option.label.toLowerCase().replace(/\s+/g, ''),
                        }))}
                        form={formik}
                        error={formik.errors.corporateProducts}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    </div>

                    <H7>Self Serve Portal</H7>
                    <div className="grid w-full grid-cols-1 gap-4">
                      <CheckboxInput
                        isMulti={true}
                        name={'selfServeProducts'}
                        options={selfServeProducts?.map((option: any) => ({
                          label: option.label,
                          value: option.value,
                        }))}
                        form={formik}
                        error={formik.errors.selfServeProducts}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    </div>

                    <H7>Managed Disbursement</H7>
                    <div className="grid w-full grid-cols-1 gap-4">
                      <CheckboxInput
                        isMulti={true}
                        name={'managedDisbursementProducts'}
                        options={managedDisbursementProducts?.map(
                          (option: any) => ({
                            label: option.label,
                            value: option.value,
                          }),
                        )}
                        form={formik}
                        error={formik.errors.managedDisbursementProducts}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    </div>
                    <H7>Others</H7>
                    <div className="grid w-full grid-cols-1 gap-4">
                      <CheckboxInput
                        isMulti={true}
                        name={'othersProducts'}
                        options={othersProducts?.map((option: any) => ({
                          label: option.label,
                          value: option.value,
                          // value: option.label.toLowerCase().replace(/\s+/g, ''),
                        }))}
                        form={formik}
                        error={formik.errors.othersProducts}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    </div>
                    <H7>Do you require Cheque Book or RTGS services?</H7>
                    <div className="grid w-full grid-cols-1 gap-4">
                      <CheckboxInput
                        isMulti={false}
                        name={'chequeBookRequired'}
                        options={[
                          { label: 'Yes', value: 'Yes' },
                          { label: 'No', value: 'No' },
                        ]}
                        form={formik}
                        error={formik.errors.chequeBookRequired}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    </div>
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
