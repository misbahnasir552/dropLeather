'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import integrationFormSchema from '@/components/Forms/validations/integartionForm';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
// import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
// import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import CustomModal from '@/components/UI/Modal/CustomModal';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
// import { setLogout } from '@/redux/features/authSlice';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
// import { buildValidationSchema } from './validations/integrationSchema';
// import type { FieldsData } from './validations/types';

interface Field {
  required: boolean;
  options: any;
  name: string;
  label: string;
  type: string;
  validation: {
    errorMessage: string;
    options?: string[];
  };
  image?: string;
  priority: number;
}

interface Category {
  categoryName: string;
  fields: Field[];
}

interface PageItem {
  pageName: string;
  categories: Category[];
}

interface FieldsData {
  pages: {
    natureOfBusiness: any;
    page: PageItem[];
  };
}

// interface UserData {
//   managerMobile: string;
//   email: string;
//   apiSecret: string;
//   jwt: string;
// }

// interface InitialValues {
//   [key: string]: any;
// }

function IntegrationFormReqRevision() {
  const userData = useAppSelector((state: any) => state.auth);
  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  const dispatch = useAppDispatch();

  const { apiSecret } = userData;
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const router = useRouter();
  const [apierror, setApierror] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { currentTab } = useCurrentTab();
  const [navRoute, setNavRoute] = useState('');
  const businessNature = fieldData?.pages?.natureOfBusiness;

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

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Access internal schema fields safely
    const schemaFields = (integrationFormSchema as Yup.ObjectSchema<any>)
      .fields;

    mappedData.forEach((section: any) => {
      section.categories.forEach((category: any) => {
        category.fields.forEach((field: any) => {
          const schemaField = schemaFields?.[field.name];

          // Ensure schemaField is not a Yup.Reference
          if (
            schemaField &&
            typeof (schemaField as any).validate === 'function'
          ) {
            shape[field.name] = schemaField as Yup.AnySchema;
          }
        });
      });
    });

    console.log('✅ Dynamic schema includes:', Object.keys(shape));
    return Yup.object().shape(shape);
  };

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    console.log('Field DATA:::', fieldData);

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Current Tab');

      // Map fieldData to change `page` to `pageName`
      const fData = fieldData?.pages?.page?.map((item) => {
        return {
          ...item, // Spread the rest of the properties
          name: (item as any).pageName, // Cast item to 'any' to access 'pageName'
        };
      });

      // Ensure valid fData based on page name
      const filteredData = fData?.filter((item) => {
        console.log(item.name, 'ITEM PAGE NAME');
        return convertSlugToTitle(item.name) === title;
      });

      if (!filteredData || filteredData.length === 0) {
        console.error('No matching data found for the current tab.');
        return; // Exit if no valid data
      }

      console.log('Filtered Data:', filteredData);
      setFilteredData(filteredData);

      // Map and Compare filteredData with ActivityInformationFormData
      const mappedData = filteredData.map(
        (item: { categories: any[]; name: any }) => {
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
            pageName: item.name, // Ensure we're using `pageName` here
            categories: mappedCategories.filter(Boolean), // Remove null categories
          };
        },
      );

      console.log('Mapped Data:', mappedData);
      console.log(mappedData);
      setFilteredData(mappedData || []);

      setInitialValuesState(initialValues);

      if (mappedData.length > 0) {
        const validationSchema =
          buildValidationSchemaFromMappedFields(mappedData);
        setValidationSchemaState(validationSchema);
      }
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

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('Submitted form values:', values);

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'Current Index');

      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      // ✅ Extract valid page names from fieldData
      const validPages = fieldData.pages.page.map((p) => p.pageName);
      console.log('valid pages', validPages);

      const transformedData = {
        status: 'Completed',
        // businessNature,
        managerMobile: userData.managerMobile,
        page: {
          pageName: 'Integration',
          categories: IntegrationFormData.categories
            .map((category) => {
              const filteredFields = category.fields.filter((field) =>
                Object.keys(values).includes(field.name),
              );

              if (filteredFields.length === 0) return null; // Exclude empty categories

              return {
                categoryName: category.categoryName,
                data: filteredFields.map((field) => ({
                  label: field.label,
                  // value: values[field.name] || '', // Fetching value from formik.values
                  value:
                    field.type === 'checkBoxInputMulti'
                      ? ''
                      : values[field.name], // Fetching value from formik.values
                  ...(field.type === 'checkboxInput' ||
                  field.type === 'checkBoxInputMulti'
                    ? { options: values[field.name] || '' }
                    : {}), // Add options only if it's a checkbox
                })),
              };
            })
            .filter(Boolean), // Remove null categories
        },
      };

      const mdRequest = {
        ...transformedData,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);

      const requestBody = {
        request: transformedData,
        signature: md5Hash,
      };

      try {
        if (currentEndpoint) {
          const updatedEndpoint = `${currentEndpoint}?natureOfBusiness=${businessNature}&requestRevision=Completed`;
          let finalEndpoint = updatedEndpoint;

          if (isLastTab) {
            finalEndpoint += '&requestRevisionStatus=Completed';
            dispatch(setIsLastTab(false));
          } else {
            finalEndpoint += '&requestRevisionStatus=null';
          }
          const response = await apiClient.post(finalEndpoint, requestBody, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
              Username: userData?.email,
            },
          });

          console.log('api response', response.data);
          if (response?.data?.responseCode === '009') {
            let nextIndex = currentIndex + 1;
            console.log('nextIndex', nextIndex);
            console.log(
              'endpointArray[nextIndex]?.name',
              endpointArray[5]?.name,
            );

            //  Ensure nextIndex is within bounds and valid
            while (
              nextIndex < endpointArray.length &&
              (!endpointArray[nextIndex]?.name ||
                !validPages.includes(endpointArray[nextIndex]?.name ?? ''))
            ) {
              nextIndex += 1;
            }

            //  Ensure nextIndex is valid before accessing tab
            if (
              nextIndex < endpointArray.length &&
              endpointArray[nextIndex]?.tab
            ) {
              const nextTab = endpointArray[nextIndex]?.tab as string; // Type assertion ensures it's a string
              console.log('next tab', nextTab);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              router.push(`/merchant/home/request-revision/review-form`);
              // setTitle(response?.data?.responseMessage);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              // dispatch(setLogout());
              // setNavRoute('/login');
              console.log('Form submission completed.');
            }
          } else {
            setTitle('Error Occurred');
            setApierror(response?.data?.responseDescription);
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
            setNavRoute('/merchant/home');
          }
        }
      } catch (e) {
        console.error('Error in submitting form:', e);
        setDescription('Network failed! Please try again later.');
        setShowModal(true);
      } finally {
        setSubmitting(false);
      }
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
        routeName={navRoute}
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
