'use client';

import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import { buildValidationSchema } from '@/components/Forms/validations/helper';
import type { FieldsData } from '@/components/Forms/validations/types';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { ActivityFormInfo } from '@/interfaces/interface';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

const RequestRevision = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  console.log('userData', userData);

  const formData = useAppSelector((state: any) => state.onBoardingForms);

  const [isChecked, setChecked] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>();
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { apiSecret } = userData;
  const router = useRouter();
  const jwt = Cookies.get('jwt');
  console.log('selected value checkbox input: ', selectedCheckValue);

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    console.log('Field DATA:::', fieldData);
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

      setValidationSchemaState(validationSchema);
    }
  }, [currentTab]);
  const fetchUserDetails = async () => {
    try {
      if (userData?.email && jwt) {
        const getDetailResponse = await apiClient.get(
          `merchant/requestRevisionDynamicFieldsTest?email=${userData?.email}`,
        );
        console.log('getDetailResponse', getDetailResponse);
        if (getDetailResponse?.data?.responseCode === '009') {
          // router.push('/merchant/home');
        } else if (getDetailResponse?.data?.responseCode === '000') {
          setTitle('Failed to fetch records');
          setDescription('Unable to get positive response');
          setShowModal(true);
        } else {
          setTitle('Failed to fetch records');
          setDescription('Some Network Issue');
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setTitle('Network Error');
      setDescription('Error fetching merchant details. Please try again!');
      setShowModal(true);
      // router.push('/login');
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  console.log('INITAIL VALUES STATE', initialValuesState);
  if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
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
          businessNature: formData?.businessNature?.businessTypeNature,
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
    // router.push('?activeTab=additional-information');

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const additionalValues = {
        ...values,
        managerMobile: userData?.managerMobile,
        businessNature: formData?.businessNature?.businessTypeNature,
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
            params: {
              username: userData?.email,
            },
            headers: { Authorization: `Bearer ${userData.jwt}` },
          });
          // console.log(response);
          if (response?.data?.responseCode === '009') {
            // Navigate to the next tab after successful submission
            const nextTab = endpointArray[currentIndex + 1]?.tab;
            if (nextTab) {
              router.push(`/merchant/home/business-nature/${nextTab}`);
            } else {
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
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

        // Navigate to the next tab after successful submission
        const nextTab = endpointArray[currentIndex + 1]?.tab;
        if (nextTab) {
          router.push(`/merchant/home/business-nature/${nextTab}`);
        } else {
          console.log('Form submission completed, no more tabs to navigate.');
        }
      } catch (e) {
        console.log('Error in submitting dynamic form', e);
        console.error('Network Failed');
        setDescription('Network failed! Please try again later.');
        setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleCheckboxChange = (name: string, formik: any) => {
    const newChecked = !isChecked;
    console.log(newChecked, 'NEW CHECKED', isChecked, 'ISCHECKED');
    if (formik.values.businessAddress) {
      setChecked(newChecked);
    }
    if (newChecked && formik.values.businessAddress) {
      formik.setFieldValue(name, formik.values.businessAddress);
    } else {
      formik.setFieldValue(name, '');
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
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
                    {pageItem?.categories
                      ?.slice()
                      .sort(
                        (a: any, b: any) =>
                          Number(a.priority) - Number(b.priority),
                      )
                      .map(
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
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    error={field.validation.errorMessage}
                                    asterik={field.validation.required}
                                  />
                                ) : field?.type === 'dropDown' ? (
                                  <DropdownNew
                                    asterik={field.validation.required}
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
                                    asterik={field.validation.required}
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
                                    handleCheckboxChange={() =>
                                      handleCheckboxChange(
                                        'correspondenceAddress',
                                        formik,
                                      )
                                    }
                                  />
                                ) : field?.type === 'checkBoxInput' ? (
                                  <CheckboxInput
                                    key={fieldIndex}
                                    name={field.name}
                                    error={field.validation.errorMessage}
                                    options={field.validation.options}
                                    form={formik}
                                    setSelectedCheckValue={
                                      setSelectedCheckValue
                                    }
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

export default RequestRevision;
