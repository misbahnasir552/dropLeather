'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  setBusinessEndpoint,
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

  const options = [
    {
      value: 'soleProprietor',
      label: 'Sole Proprietorship',
      endpoint: 'soleBusinessDetails',
    },
    {
      value: 'publicAndPrivateLtd',
      label: 'Public and Private Ltd.',
      endpoint: 'pnpBusinessDetails',
    },
    {
      value: 'partnership',
      label: 'Partnership',
      endpoint: 'partnershipBusinessDetails',
    },
    {
      value: 'other',
      label: 'Other',
      endpoint: 'otherBusinessDetails',
    },
    {
      value: 'trusts',
      label: 'Trusts',
      endpoint: 'nncBusinessDetails',
    },
    {
      value: 'clubSocietiesAssociations',
      label: 'Clubs, Societies, Associations',
      endpoint: 'nncBusinessDetails',
    },
    {
      value: 'ngoNpoCharities',
      label: 'NGO, NPO, Charities',
      endpoint: 'nncBusinessDetails',
    },
  ];

  useEffect(() => {
    const handleResize = () => {};

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
    const businessEndpoint = selectedOption?.endpoint || '';

    values.businessTypeNature = businessType;
    // values.businessEndpoint = businessEndpoint;

    // if (values.typeOfRequest) {
    dispatch(setBusinessNature(values));
    dispatch(setBusinessEndpoint(businessEndpoint));
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
