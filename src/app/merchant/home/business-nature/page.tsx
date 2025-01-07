'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
// import MySelect from "@/components/Inputs/DropdownInput";
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch } from '@/hooks/redux';
import type { BusinessNatureForm } from '@/interfaces/interface';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
import {
  businessNatureInitialValues,
  businessNatureSchema,
} from '@/validations/merchant/onBoarding/businessNatureSchema';
// import axios from 'axios';
// import { useAppDispatch } from '@/hooks/redux';
// import { setLoading, setPageData, setSuccess } from '@/redux/features/formSlices/fieldSlice';
// import apiClient from '@/api/apiClient';

const BusinessNature = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const dispatch = useAppDispatch();
  const options = [
    { value: 'soleProprietor', label: 'Sole Propreitor' },
    { value: 'Clubs/Resorts', label: 'Clubs/Resorts' },
    { value: 'EducationalServices', label: 'Educational Services' },
  ];

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
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

  const onSubmit = async (values: BusinessNatureForm) => {
    console.log('BUSINESS NATURE LOGS', values);
    const selectedOption = options.find(
      (option) => option.label === values.businessNature,
    );

    const selectedValue = selectedOption?.value;
    if (values.businessNature) {
      console.log('window size is', windowSize);
      try {
        const response = await apiClient.get(
          `/merchant/getPageInfo/${selectedValue}`,
        );
        // const response = await apiClient.get(
        //   `/merchant/getPageInfo/${values.businessNature}`,
        // );
        console.log('FIELDS DATA', response);
        dispatch(setPageData(response.data));
        router.push('/merchant/home/business-nature/activity-information');
      } catch (e) {
        console.log('Error fetching fields Data:', e);
      }
    } else {
      router.push('/on-boarding/activity-info/');
    }

    // if (values.businessNature) {
    //   router.push("account-information/?activeTab=activity-information");
    // }
  };

  return (
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
                <H6>Nature of your business</H6>
                <DropdownInput
                  label="Select from menu"
                  name="businessNature"
                  formik={formik}
                  error={formik.errors.businessNature}
                  touched={formik.touched.businessNature}
                  options={options}
                />
              </div>
            </FormWrapper>
            <div className="flex flex-col justify-center gap-6 sm:items-center sm:px-5 sm:max-md:pt-[12px] md:items-end">
              <Button
                label="Continue"
                type="submit"
                className="button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BusinessNature;
