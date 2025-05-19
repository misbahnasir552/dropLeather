'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import OvalLoading from '@/components/Loader/OvalLoading';
// import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import ApiError from '@/components/UI/Error/Error';
import H6 from '@/components/UI/Headings/H6';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  // setBusinessEndpoint,
  setBusinessNature,
  // setMerchantEntity,
} from '@/redux/features/formSlices/onBoardingForms';
import { generateMD5Hash } from '@/utils/helper';
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

  console.log('business nature type', setTitle, setDescription);
  const userData = useAppSelector((state) => state.auth);
  const [apierror, setApierror] = useState('');

  const options = [
    {
      value: 'soleProprietor',
      label: 'Sole Proprietorship',
    },
    {
      value: 'publicAndPrivateLtd',
      label: 'Public or Private Ltd.',
    },
    {
      value: 'partnership',
      label: 'Partnership',
    },
  ];

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
    console.log('business nature', values.businessNature);
    const selectedOption = options.find(
      (option) => option.value === values.businessNature,
    );

    console.log(selectedOption, 'selectedOptionnnn');
    const transformedData = {
      managerMobile: userData.managerMobile,

      page: {
        pageName: 'Business Nature',
        categories: [
          {
            // categoryName: 'Nature of your business',
            // data: [{
            //   label: selectedOption?.label,
            //   value: selectedOption?.value,
            //   options: null
            // }]
            categoryName: '',
            data: [
              {
                label: 'Nature of your business',
                value: selectedOption?.label,
                // options: []
              },
            ],
          },
        ],
      },
    };

    const mdRequest = {
      ...transformedData,
      apisecret: userData.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);

    const requestBody = {
      // managerMobile: userData.managerMobile,
      request: transformedData,
      signature: md5Hash,
    };

    try {
      const response = await apiClient.post(
        `merchant/saveNatureOfBusinesses`,
        requestBody,
        {
          params: {
            username: userData.email,
          },
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            Username: userData?.email,
          },
        },
      );
      console.log('here i am');
      if (response?.data?.responseCode === '009') {
        router.push('/merchant/home/business-nature/activity-information');
        // values.businessTypeNature = businessType;

        dispatch(setBusinessNature(values));
      } else if (response?.data?.responseCode === '000') {
        setApierror(response?.data?.responseMessage);
        setIsSubmitting(false);
      }
    } catch (error: any) {
      setApierror(error?.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <OvalLoading />}
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
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
                    <ApiError apiError={apierror} />
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
