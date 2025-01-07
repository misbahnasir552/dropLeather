'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from "@/components/UI/Headings/H6";
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from "@/components/UI/Wrappers/FormLayout";
import { useAppSelector } from '@/hooks/redux';
// import {
//   // ActivityFormInfoSchema,
//   GetActivityInfoDetails,
// } from "@/validations/merchant/onBoarding/activityInfo";
import useCurrentTab from '@/hooks/useCurrentTab';
import type { ActivityFormInfo } from '@/interfaces/interface';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { setActivityForm } from "@/redux/features/formSlices/onBoardingForms";
import { generateMD5Hash } from '@/utils/helper';

import CheckboxInput from '../UI/Inputs/CheckboxInput';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/helper';
import type { FieldsData } from './validations/types';

const ActivityInformation = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);

  const [isChecked, setChecked] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>();
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  //  const [selectedCheckValue, setSelectedCheckValue] = useState();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);

  const { apiSecret } = userData;
  const router = useRouter();
  // const dispatch = useAppDispatch();
  console.log('selected value checkbox input: ', selectedCheckValue);

  // const ActivityFormInfoInitialValues = GetActivityInfoDetails();
  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
      const fData = fieldData.pages?.page?.filter((item) => {
        console.log(item.name, 'ITEM NAME');
        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);

      fData?.forEach((item) => {
        // if (item.name === "Activity Information") {
        item.categories.forEach((category) => {
          category.fields.forEach((field) => {
            if (field?.type !== 'checkItem') {
              initialValues[field.name] = '';
            }
          });
        });
        setInitialValuesState(initialValues);
        // }
      });
      const validationSchema = buildValidationSchema(fData);
      console.log('Vaidation schema result', validationSchema);

      setValidationSchemaState(validationSchema);
    }
  }, [currentTab]);

  console.log('INITAIL VALUES STATE', initialValuesState);
  if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" height={25} />
      </div>
    );
  }
  const saveAndContinue = async (
    values: ActivityFormInfo,
    { setSubmitting }: any,
  ) => {
    try {
      const response: any = await apiClient.post(
        `merchant/activity/${userData.email}`,
        {
          businessNature: 'option1',
          managerMobile: userData.managerMobile,
          fatherName: values.fatherName,
          businessName: values.businessName,
          nameOfBusinessOwner: values.businessOwner,
          legalNameOfBusiness: values.legalName,
          dateOfIncorporation: values.incorporationDate,
          ntnNumber: values.ntnNumber,
          purposeOfAccount: values.purposeOfAccount,
          emailAddress: values.emailAddress,
          city: values.city,
          businessAddress: values.businessAddress,
          correspondenceAddress: values.correspondenceAddress,
          primaryPhoneNumber: values.primaryPhoneNumber,
          otherPhoneNumber: values.otherPhoneNumber,
          status: 'partial',
          terrorFinancing: values.terrorFinancing,
          politicallyExposed: values.politicallyExposed,
          accountHolder: values.accountHolder,
          gender: values.gender,
          citizenship: values.citizenship,
          countryOfResidency: values.residency,
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );

      if (response.data.responseCode === '000') {
        console.log(response, 'Activity Information');
        router.push('/business-details');
      } else {
        router.push('/login');
        console.log('Data submission failure');
      }
    } catch (e) {
      console.log(e, 'Error');
    }

    setSubmitting(false);
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('activity valuesssssssssssss', values);
    // router.push('?activeTab=additional-information');
    const endpointArray = [
      {
        tab: 'activity-information',
        endpoint: `/merchant/activity/${userData.email}`,
      },
      {
        tab: 'business-details',
        endpoint: `/merchant/businessdetails/${userData.email}`,
      },
      {
        tab: 'settlement-details',
        endpoint: `/merchant/settlementdetails/${userData.email}`,
      },
      {
        tab: 'integration',
        endpoint: `/merchant/integration/${userData.email}`,
      },
      { tab: 'attachments', endpoint: `/merchant/upload/${userData.email}` },
    ];

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');

      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const additionalValues = {
        ...values,
        managerMobile: userData?.managerMobile,
        businessNature: 'soleProprietor',
        status: 'Completed',
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(currentEndpoint, requestBody, {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          });
          console.log(response);
        }

        // Navigate to the next tab after successful submission
        const nextTab = endpointArray[currentIndex + 1]?.tab;
        if (nextTab) {
          router.push(`/merchant/home/business-nature/${nextTab}`);
        } else {
          console.log('Form submission completed, no more tabs to navigate.');
        }
      } catch (e) {
        console.log('Error in submitting dynamic form', e);
      } finally {
        setSubmitting(false);
      }
    }
    // const req = {
    //   businessNature: 'option1',
    //   managerMobile: userData.managerMobile,
    //   fatherName: values.fatherName,
    //   businessName: values.businessName,
    //   nameOfBusinessOwner: values.businessOwner,
    //   legalNameOfBusiness: values.legalName,
    //   dateOfIncorporation: values.incorporationDate,
    //   ntnNumber: values.ntnNumber,
    //   purposeOfAccount: values.purposeOfAccount,
    //   emailAddress: values.emailAddress,
    //   city: values.city,
    //   businessAddress: values.businessAddress,
    //   correspondenceAddress: values.correspondenceAddress,
    //   primaryPhoneNumber: values.primaryPhoneNumber,
    //   otherPhoneNumber: values.otherPhoneNumber,
    //   status: 'Completed',
    //   terrorFinancing: values.terrorFinancing,
    //   politicallyExposed: values.politicallyExposed,
    //   accountHolder: values.accountHolder,
    //   gender: values.gender,
    //   citizenship: values.citizenship,
    //   countryOfResidency: values.residency,
    // };
    // const mdRequest = {
    //   ...req,
    //   apisecret: apiSecret,
    // };

    // const md5Hash = generateMD5Hash(mdRequest);

    // try {
    //   dispatch(setActivityForm(values));
    //   const response: any = await apiClient.post(
    //     `merchant/activity/${userData.email}`,
    //     {
    //       request: req,
    //       signature: md5Hash,
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${userData.jwt}` },
    //     },
    //   );
    //   console.log('response activity info', response);
    //   if (response.data.responseCode === '009') {
    //     console.log(response, 'Activity Information');
    //     router.push('/on-boarding/business-details');
    //   } else {
    //     console.log('Data submission failure');
    //   }
    // } catch (e) {
    //   console.log(e, 'Error');
    // }

    // setSubmitting(false);
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <Formik
        initialValues={initialValuesState}
        validationSchema={validationSchemaState}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
              {pageTitle}
            </div>

            <div className="flex flex-col justify-end gap-9">
              {filteredData?.map(
                (pageItem) => (
                  // pageItem.name === "Business Details" && (
                  <React.Fragment key={pageItem.name}>
                    {pageItem?.categories.map(
                      (
                        item: { categoryName: any; fields: any[] },
                        itemIndex: number,
                      ) => (
                        <FormLayoutDynamic
                          key={itemIndex}
                          heading={item.categoryName}
                        >
                          {[...item.fields]
                            .sort((a, b) => a.priority - b.priority)
                            .map((field, fieldIndex) => {
                              return field?.type === 'text' ? (
                                <Input
                                  key={fieldIndex}
                                  label={field.label}
                                  name={field.name}
                                  type={field.type}
                                  error={field.validation.errorMessage}
                                />
                              ) : field?.type === 'dropDown' ? (
                                <DropdownInput
                                  key={fieldIndex} // Add a key prop to DropdownInput as well
                                  label={field.label}
                                  name={field.name}
                                  options={field.validation?.options?.map(
                                    (option: string) => ({
                                      label: option,
                                      value: option
                                        .toLowerCase()
                                        .replace(/\s+/g, ''),
                                    }),
                                  )}
                                  formik={formik}
                                  error={field.validation.errorMessage}
                                />
                              ) : field?.type === 'date' ? (
                                <DateInputNew
                                  key={fieldIndex}
                                  formik={formik}
                                  label={field.label}
                                  name={field.name}
                                  error={field.validation.errorMessage}
                                />
                              ) : field?.type === 'checkItem' ? (
                                <CheckboxItem
                                  key={fieldIndex}
                                  description={field.label}
                                  isChecked={isChecked}
                                  handleCheckboxChange={handleCheckboxChange}
                                />
                              ) : field?.type === 'checkBoxInput' ? (
                                <CheckboxInput
                                  key={fieldIndex}
                                  name={field.name}
                                  error={field.validation.errorMessage}
                                  options={field.validation.options}
                                  form={formik}
                                  setSelectedCheckValue={setSelectedCheckValue}
                                />
                              ) : (
                                <p key={fieldIndex}>nothing to show field</p>
                              );
                            })}
                        </FormLayoutDynamic>
                      ),
                    )}
                  </React.Fragment>
                ),
                // )
              )}
              {/* <FormControlButtons saveAndContinue={saveAndContinue} /> */}
              <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                <Button
                  label={`Save & Continue Later`}
                  onClickHandler={() =>
                    saveAndContinue(
                      formik.values,
                      formik.setSubmitting,
                      // formik.validateForm,
                    )
                  }
                  type="button"
                  className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
                <Button
                  label={`Next`}
                  type="submit"
                  className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </div>
          </Form>
          // </div>
        )}
      </Formik>
    </>
  );
};

export default ActivityInformation;
