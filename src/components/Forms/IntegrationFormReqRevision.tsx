'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

// import CheckboxItem from '../UI/Inputs/CheckboxItem';
// import DateInputNew from '../UI/Inputs/DateInputNew';
// import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
// import DropdownInput from '../UI/Inputs/DropdownInput';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import { buildValidationSchema } from './validations/integrationSchema';
import type { FieldsData } from './validations/types';

function IntegrationFormReqRevision() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState] = useState<any>();
  const router = useRouter();
  const [apierror, setApierror] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title] = useState('');
  const [description] = useState('');
  const { currentTab } = useCurrentTab();

  const IntegrationFormData = {
    pageName: 'Integration',
    categories: [
      {
        categoryName: 'Integration Methods (What would you like to integrate)',
        fields: [
          {
            name: 'integrationMethods',
            label: 'Integration Methods',
            type: 'checkBoxInputMulti',
            options: [
              { label: 'Website', value: 'Website' },
              { label: 'Facebook Page', value: 'Facebook Page' },
            ],
            required: 'false',
          },
        ],
      },
      {
        categoryName: 'Integration Modes (Select your mode of integrate)',
        fields: [
          {
            name: 'integrationModes',
            label: 'Integration Modes',
            type: 'checkBoxInputMulti',
            options: [{ label: 'API', value: 'API' }],
            required: 'false',
          },
        ],
      },
      {
        categoryName: "Developer's Details",
        fields: [
          {
            name: 'email',
            label: 'Email Address',
            type: 'text',
            required: 'true',
          },
          {
            name: 'mobileNo',
            label: 'Mobile No',
            type: 'text',
            required: 'true',
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    console.log('Field DATA:::', fieldData);

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Current Tab');

      // Ensure valid fData based on page name
      const fData = fieldData?.pages?.page?.filter((item) => {
        console.log(item.pageName, 'ITEM PAGE NAME');
        return convertSlugToTitle(item.pageName) === title;
      });

      if (!fData || fData.length === 0) {
        console.error('No matching data found for the current tab.');
        return; // Exit if no valid data
      }

      // setFilteredData(fData);
      console.log('FDATAAAA:', fData);

      // Map and Compare fData with ActivityInformationFormData
      const mappedData = fData.map(
        (item: { categories: any[]; pageName: any }) => {
          const mappedCategories = item.categories.map((filteredCategory) => {
            // Find matching category in ActivityInformationFormData
            const matchingCategory = IntegrationFormData.categories.find(
              (category) =>
                category.categoryName === filteredCategory.categoryName,
            );

            if (matchingCategory) {
              // Collect matched fields with full field info
              const matchedFields = filteredCategory.fields.map(
                (fieldLabel: any) => {
                  // Find full field info based on label
                  const matchedField = matchingCategory.fields.find(
                    (field: { label: any }) => field.label === fieldLabel,
                  );

                  if (matchedField) {
                    if (matchedField?.type !== 'checkItem') {
                      initialValues[matchedField.name] = '';
                    }

                    return {
                      name: matchedField.name,
                      label: matchedField.label,
                      type: matchedField.type,
                      required: matchedField.required || false,
                      options:
                        'options' in matchedField ? matchedField.options : [],
                    };
                  }

                  return null; // Ignore unmatched fields
                },
              );

              return {
                categoryName: filteredCategory.categoryName,
                fields: matchedFields.filter(Boolean), // Remove null values
              };
            }

            return null; // Ignore unmatched categories
          });

          return {
            pageName: item.pageName,
            categories: mappedCategories.filter(Boolean), // Remove null categories
          };
        },
      );

      console.log('Mapped Data:', mappedData);
      console.log(mappedData);
      setFilteredData(mappedData || []);

      setInitialValuesState(initialValues);

      // Build validation schema if matched data exists
      // if (mappedData.length > 0) {
      //   const validationSchema = buildValidationSchema(mappedData);
      //   console.log('Validation schema result:', validationSchema);
      //   setValidationSchemaState(validationSchema);
      // }
    }
  }, [currentTab, fieldData]);

  // if (!initialValuesState || !filteredData) {
  // if (!initialValuesState || !validationSchemaState || !filteredData) {
  //   return (
  //     <div className="flex w-full flex-col justify-center">
  //       <BarLoader color="#21B25F" />
  //     </div>
  //   );
  // }

  console.log(selectedCheckValue);

  const onSubmit = async (
    values: { [key: string]: any },
    { setSubmitting }: any,
  ) => {
    console.log('Form values:', values);

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex === -1) return; // Exit if no matching tab is found

    const currentEndpoint = endpointArray[currentIndex]?.endpoint;

    //  Dynamically generate categories and data based on form values
    const transformedData = {
      page: {
        pageName: 'Integration',
        categories: [
          {
            categoryName: 'Integration Methods',
            data: values.integrationMethods
              ? [
                  {
                    label: 'Integration Methods',
                    value: values.integrationMethods,
                  },
                ]
              : [],
          },
          {
            categoryName: 'Integration Modes',
            data: values.integrationModes
              ? [{ label: 'Integration Modes', value: values.integrationModes }]
              : [],
          },
          {
            categoryName: "Developer's Details",
            data: [
              values.email && { label: 'Email Address', value: values.email },
              values.mobileNo && { label: 'Mobile No', value: values.mobileNo },
            ].filter(Boolean), // ✅ Remove empty fields
          },
        ].filter((category) => category.data.length > 0), // ✅ Remove empty categories
      },
    };

    const mdRequest = {
      ...transformedData,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);

    try {
      if (currentEndpoint) {
        const response = await apiClient.post(
          currentEndpoint,
          {
            request: transformedData,
            signature: md5Hash,
          },
          {
            params: { username: userData?.email },
            headers: { Authorization: `Bearer ${userData.jwt}` },
          },
        );

        console.log('API Response:', response);

        if (response?.data?.responseCode === '009') {
          // ✅ Navigate to the next tab if available
          const nextTab = endpointArray[currentIndex + 1]?.tab;
          if (nextTab) {
            router.push(`/merchant/home/business-nature/${nextTab}`);
          } else {
            console.log('Form submission completed.');
          }
        } else {
          setApierror(
            response?.data?.responseMessage || 'Unknown error occurred',
          );
        }
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setApierror(error.message || 'Network failed! Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  console.log('initialValuesState', initialValuesState);

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
        enableReinitialize={true}
        initialValues={initialValuesState || []}
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
                    <React.Fragment key={`${pageItem.pageName}-${index}`}>
                      {pageItem?.categories
                        ?.slice()
                        .sort(
                          (a: any, b: any) =>
                            Number(a.priority) - Number(b.priority),
                        )
                        .map(
                          (
                            item: { categoryName: any; fields: any },
                            itemIndex: any,
                          ) => (
                            <FormLayoutDynamic
                              key={`${pageItem.pageName}-${itemIndex}`}
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
                                      placeholder={
                                        field.placeholder || 'Enter value'
                                      }
                                      type="text"
                                      error={field?.validation?.errorMessage}
                                      asterik={field?.required || false}
                                    />
                                  ) : field?.type === 'checkBoxInputMulti' ? (
                                    <CheckboxInput
                                      layout="grid grid-cols-2 gap-4"
                                      isMulti={true}
                                      name={field.name}
                                      options={
                                        field?.options?.map(
                                          (option: {
                                            label: any;
                                            value: any;
                                          }) => ({
                                            label: option.label,
                                            value: option.value,
                                          }),
                                        ) || []
                                      }
                                      form={formik}
                                      setSelectedCheckValue={
                                        setSelectedCheckValue
                                      }
                                    />
                                  ) : (
                                    <p key={fieldIndex}>nothing to show</p>
                                  );
                                })}
                            </FormLayoutDynamic>
                          ),
                        )}
                    </React.Fragment>
                  ))}
                </div>

                {/* <div className="flex flex-col gap-6">
                  {filteredData?.map((pageItem, index) => (
                    <React.Fragment key={`${pageItem.name}-${index}`}>
                      {pageItem?.categories?.map((item, itemIndex) => (
                        <FormLayoutDynamic
                          key={`${pageItem.name}-${itemIndex}`}
                          heading={item.categoryName}
                        >
                          {[...item.fields]
                            .sort((a, b) => a.priority - b.priority)
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
                                  setSelectedCheckValue={setSelectedCheckValue}
                                />
                              ) : (
                                <p key={fieldIndex}>nothing to show</p>
                              );
                            })}
                        </FormLayoutDynamic>
                      ))}
                    </React.Fragment>
                  ))}
                </div> */}
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  {/* <Button
                    label={`Save & Continue Later`}
                    type="button"
                    className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  /> */}
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

export default IntegrationFormReqRevision;
