'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

import CustomModal from '../UI/Modal/CustomModal';
// import DropdownInput from '../UI/Inputs/DropdownInput';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/integrationSchema';
import type { FieldsData, Page } from './validations/types';

function IntegrationForm() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [filteredData, setFilteredData] = useState<Page[]>();
  const [pageTitle, setPageTitle] = useState('');
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const router = useRouter();
  const { currentTab } = useCurrentTab();
  const [apierror, setApierror] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  interface InitialValues {
    [key: string]: any;
  }

  useEffect(() => {
    const initialValues: InitialValues = {};

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      const fData = fieldData.pages?.page.filter((item) => {
        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);
      console.log('FDATAAA:', fData);
      console.log('Filtered data', filteredData);
      fData?.forEach((item) => {
        item?.categories?.forEach((category) => {
          category.fields.forEach((field) => {
            // if (field?.type !== 'checkItem') {
            if (field?.type === 'checkItem') {
              return;
            }
            initialValues[field.name] = '';
          });
        });
        setInitialValuesState(initialValues);
        const validationSchema = buildValidationSchema(fData);
        setValidationSchemaState(validationSchema);
      });
    }
    console.log('selected check value', selectedCheckValue);
  }, [currentTab, fieldData.pages.page]);

  // if (!initialValuesState || !filteredData) {
  if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (
    values: { [key: string]: any },
    { setSubmitting }: any,
  ) => {
    console.log('values are', values);
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const additionalValues = {
        ...values,
        managerMobile: userData?.managerMobile,
        businessNature: 'partnership',
        status: 'Completed',
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            currentEndpoint,
            {
              request: additionalValues,
              signature: md5Hash,
            },
            {
              params: {
                username: userData?.email,
              },
              headers: { Authorization: `Bearer ${userData.jwt}` },
            },
          );
          console.log(response);
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
            setApierror(response?.data?.responseMessage);
            // setTitle('Error Occured');
            // setDescription(response?.data?.responseDescription);
            // setShowModal(true);
          } else {
            setTitle('Error Occured');
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
          }
        }

        // const nextTab = endpointArray[currentIndex + 1]?.tab;
        // if (nextTab) {
        //   router.push(`/merchant/home/business-nature/${nextTab}`);
        // } else {
        //   console.log('Form submission completed, no more tabs to navigate.');
        // }
      } catch (e: any) {
        console.log('Error in submitting dynamic form', e);
        setApierror(e.message);
        // setTitle('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={attachRoute}
        // routeName="/merchant/home"
      />
      <Formik
        initialValues={initialValuesState}
        validationSchema={validationSchemaState}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {pageTitle}
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
                  {filteredData?.map((pageItem, index) => (
                    <React.Fragment key={`${pageItem.name}-${index}`}>
                      {pageItem?.categories
                        ?.slice()
                        .sort(
                          (a: any, b: any) =>
                            Number(a.priority) - Number(b.priority),
                        )
                        .map((item, itemIndex) => (
                          <FormLayoutDynamic
                            key={`${pageItem.name}-${itemIndex}`}
                            heading={item.categoryName}
                          >
                            {[...item.fields]
                              .sort(
                                (a, b) =>
                                  Number(a.priority) - Number(b.priority),
                              ) // Sorting fields
                              .map((field, fieldIndex) => {
                                return field.type === 'text' ? (
                                  <Input
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    formik={formik}
                                    asterik={field.validation.required}
                                    error={field.validation?.errorMessage}
                                  />
                                ) : field?.type === 'checkBoxInputMulti' ? (
                                  <CheckboxInput
                                    key={fieldIndex}
                                    isMulti
                                    name={field.name}
                                    options={field.validation?.options?.map(
                                      (option) => ({
                                        label: option,
                                        value: option,
                                      }),
                                    )}
                                    form={formik}
                                    error={field.validation?.errorMessage}
                                    setSelectedCheckValue={
                                      setSelectedCheckValue
                                    }
                                  />
                                ) : (
                                  <p key={fieldIndex}>nothing to show</p>
                                );
                              })}
                          </FormLayoutDynamic>
                        ))}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  <Button
                    label={`Save & Continue Later`}
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
          </div>
        )}
      </Formik>
    </div>
  );
}

export default IntegrationForm;
