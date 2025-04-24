'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from "@/components/UI/Headings/H6";
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from "@/components/UI/Wrappers/FormLayout";
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import {
//   // ActivityFormInfoSchema,
//   GetActivityInfoDetails,
// } from "@/validations/merchant/onBoarding/activityInfo";
import useCurrentTab from '@/hooks/useCurrentTab';
// import { buildValidationSchema } from './validationsOLD/helper';
import { setLogout } from '@/redux/features/authSlice';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { setActivityForm } from "@/redux/features/formSlices/onBoardingForms";
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

import CheckboxInput from '../UI/Inputs/CheckboxInput';
import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import activityInformationFormSchema from './validations/activityInformationForm';
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

const ActivityInformationReqRevision = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldData = useAppSelector(
    (state: { fields: FieldsData }) => state.fields,
  );
  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  const dispatch = useAppDispatch();

  console.log('fieldData1', fieldData);
  const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  //  const [selectedCheckValue, setSelectedCheckValue] = useState();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);

  const businessNature = fieldData?.pages?.natureOfBusiness;
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [navRoute, setNavRoute] = useState('');
  console.log('userdatais', userData);
  const { apiSecret } = userData;
  const router = useRouter();
  // const dispatch = useAppDispatch();
  console.log('selected value checkbox input: ', selectedCheckValue);

  const ActivityInformationFormData = {
    pageName: 'Activity Information',
    categories: [
      {
        categoryName: "Merchant's Detail",
        fields: [
          {
            name: 'businessOwnerName',
            label: 'Business Owner Name (Signatory name as per CNIC)',
            type: 'text',
            required: true,
          },
          {
            name: 'ownerOfCNIC',
            label: 'Owner of CNIC/Signatory CNIC',
            type: 'text',
            required: true,
          },

          {
            name: 'fatherSpouseName',
            label: 'Father / Spouse Name',
            type: 'text',
            required: true,
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ],
          },

          {
            name: 'purposeOfAccount',
            label: 'Purpose of Account',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Online Payment', value: 'Online Payment' },
              { label: 'Retail Payments', value: 'Retail Payments' },
              { label: 'Mini App', value: 'Mini App' },
            ],
          },

          {
            name: 'citizenship',
            label: 'Citizenship',
            type: 'dropdown',
            required: true,
            options: [{ label: 'Pakistan', value: 'Pakistan' }],
          },

          {
            name: 'businessName',
            label: 'Business Name',
            type: 'text',
            required: true,
          },
          {
            name: 'legalName',
            label: 'Legal Name',
            type: 'text',
            required: true,
          },
          {
            name: 'ntnNO',
            label: 'NTN No',
            type: 'text',
            required: true,
          },
          {
            name: 'dateOfCorporation',
            label: 'Date of Corporation',
            type: 'date',
            required: true,
          },
          {
            name: 'terrorFinancing',
            label: 'Terror Financing',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
          },
          {
            name: 'politicallyExposed',
            label: 'Politically Exposed',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
          },

          {
            name: 'residency',
            label: 'Residency',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
          },
        ],
      },

      {
        categoryName: 'Contact Details',
        fields: [
          {
            name: 'email',
            label: 'Email Address',
            type: 'text',
            required: true,
          },
          {
            name: 'city',
            label: 'City',
            type: 'text',
            required: true,
          },
          {
            name: 'businessAddress',
            label: 'Business Address',
            type: 'text',
            required: true,
          },
          {
            name: 'correspondenceAddress',
            label: 'Correspondence Address',
            type: 'text',
            required: true,
          },
          {
            name: 'accountHandlerIsdifferentfromOwnerAccountHolder',
            label: 'Account Handler is different from Owner/Account Holder',
            type: 'dropdown',
            required: true,
            options: [{ label: 'API', value: 'API' }],
          },
          {
            name: 'primaryPhoneNo',
            label: 'Primary Phone No',
            type: 'text',
            required: true,
          },
          {
            name: 'secondaryPhoneNo',
            label: 'Secondary Phone No',
            type: 'text',
            required: false,
          },
        ],
      },
    ],
  };

  console.log('filtered data', filteredData);

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Access internal schema fields safely
    const schemaFields = (
      activityInformationFormSchema as Yup.ObjectSchema<any>
    ).fields;

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

  // const ActivityFormInfoInitialValues = GetActivityInfoDetails();
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

      console.log('fData', fData);
      // Filter the data based on the title (converted slug)
      const filteredData = fData?.filter((item) => {
        console.log(item, 'ITEM PAGE NAME');
        return convertSlugToTitle(item.name) === title;
      });

      console.log('filteredData', filteredData);
      // Exit if no valid data is found
      if (!filteredData || filteredData.length === 0) {
        console.error('No matching data found for the current tab.');
        return; // Exit early if no valid data
      }

      console.log('Filtered Data:', filteredData);
      setFilteredData(filteredData);

      // Map and Compare fData with ActivityInformationFormData
      const mappedData = filteredData.map((item) => {
        const mappedCategories = item.categories.map((filteredCategory) => {
          // Find matching category in ActivityInformationFormData
          const matchingCategory = ActivityInformationFormData.categories.find(
            (category) =>
              category.categoryName === filteredCategory.categoryName,
          );

          if (matchingCategory) {
            // Collect matched fields with full field info
            const matchedFields = filteredCategory.fields.map((fieldLabel) => {
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
                  options: matchedField.options || [],
                };
              }

              return null; // Ignore unmatched fields
            });

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
      });

      console.log('Mapped Data:', mappedData);
      setFilteredData(mappedData || []);

      setInitialValuesState(initialValues);

      if (mappedData.length > 0) {
        const validationSchema =
          buildValidationSchemaFromMappedFields(mappedData);
        setValidationSchemaState(validationSchema);
      }
    }
  }, [currentTab, fieldData]);

  console.log('validation schema', validationSchemaState);

  console.log('INITAIL VALUES STATE', initialValuesState);
  // if (!initialValuesState || !validationSchemaState || !filteredData) {
  //   return (
  //     <div className="flex w-full flex-col justify-center">
  //       <BarLoader color="#21B25F" />
  //     </div>
  //   );
  // }
  // const saveAndContinue = async (
  //   values: ActivityFormInfo,
  //   { setSubmitting }: any,
  // ) => {
  //   try {
  //     const response: any = await apiClient.post(
  //       `merchant/activity/${userData.email}`,
  //       {
  //         businessNature: formData?.businessNature?.businessTypeNature,
  //         managerMobile: userData.managerMobile,
  //         fatherName: values.fatherName,
  //         businessName: values.businessName,
  //         nameOfBusinessOwner: values.businessOwner,
  //         legalNameOfBusiness: values.legalName,
  //         dateOfIncorporation: values.incorporationDate,
  //         ntnNumber: values.ntnNumber,
  //         purposeOfAccount: values.purposeOfAccount,
  //         emailAddress: values.emailAddress,
  //         city: values.city,
  //         businessAddress: values.businessAddress,
  //         correspondenceAddress: values.correspondenceAddress,
  //         primaryPhoneNumber: values.primaryPhoneNumber,
  //         otherPhoneNumber: values.otherPhoneNumber,
  //         status: 'partial',
  //         terrorFinancing: values.terrorFinancing,
  //         politicallyExposed: values.politicallyExposed,
  //         accountHolder: values.accountHolder,
  //         gender: values.gender,
  //         citizenship: values.citizenship,
  //         countryOfResidency: values.residency,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${userData.jwt}` },
  //       },
  //     );

  //     if (response.data.responseCode === '000') {
  //       console.log(response, 'Activity Information');
  //       router.push('/business-details');
  //     } else {
  //       router.push('/login');
  //       console.log('Data submission failure');
  //     }
  //   } catch (e) {
  //     console.log(e, 'Error');
  //   }

  //   setSubmitting(false);
  // };

  console.log('endpointArray[nextIndex]?.name', endpointArray);

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
          pageName: 'Activity Information',
          categories: ActivityInformationFormData.categories
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
          const updatedEndpoint = `${currentEndpoint}?natureOfBusiness=${businessNature}`;
          let finalEndpoint = updatedEndpoint;

          if (isLastTab) {
            finalEndpoint += '&requestRevision=Completed';
            dispatch(setIsLastTab(false));
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
              endpointArray[1]?.name,
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
              setTitle(response?.data?.responseMessage);
              setDescription(response?.data?.responseDescription);
              setShowModal(true);
              dispatch(setLogout());
              setNavRoute('/login');
              console.log('Form submission completed.');
            }
          } else {
            setTitle('Error Occurred');
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

  const handleCheckboxChange = (name: string, formik: any) => {
    const newChecked = !isChecked;
    console.log(newChecked, 'NEW CHECKED', isChecked, 'ISCHECKED');
    if (formik.values.businessAddress) {
      setIsChecked(newChecked);
    }
    if (newChecked && formik.values.businessAddress) {
      formik.setFieldValue(name, formik.values.businessAddress);
    } else {
      formik.setFieldValue(name, '');
    }
  };

  console.log('Initial Values: ', initialValuesState);
  console.log('Validation Schema: ', validationSchemaState);
  console.log('Filtered Data: ', filteredData);
  console.log('formik', Formik);

  return (
    <>
      {/* Custom Modal for displaying messages */}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={navRoute}
        // routeName="/merchant/home"
      />

      {/* Formik Form for handling form state and submission */}
      <Formik
        enableReinitialize
        initialValues={initialValuesState || {}}
        validationSchema={validationSchemaState}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            {/* Page Title for Small Screens */}
            <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
              {pageTitle}
            </div>

            <div className="flex flex-col justify-end gap-9">
              {/* Loop through filtered data to render form pages */}
              {filteredData.length > 0 ? (
                filteredData?.map((pageItem: any) => {
                  // console.log('Page Item: ', pageItem); // Debug Page Item

                  return (
                    <React.Fragment key={pageItem.pageName}>
                      {pageItem?.categories
                        ?.slice()
                        .sort(
                          (a: { priority: any }, b: { priority: any }) =>
                            Number(a.priority) - Number(b.priority),
                        )
                        .map(
                          (
                            item: { categoryName: any; fields: any[] },
                            itemIndex: any,
                          ) => {
                            // console.log('Category Item: ', item); // Debug Category Item

                            return (
                              <FormLayoutDynamic
                                key={itemIndex}
                                heading={
                                  item.categoryName || 'Unknown Category'
                                }
                              >
                                {item?.fields?.length > 0 ? (
                                  item.fields
                                    .slice()
                                    .sort(
                                      (
                                        a: { priority: number },
                                        b: { priority: number },
                                      ) => a.priority - b.priority,
                                    )
                                    .map(
                                      (
                                        field: {
                                          type:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<
                                                any,
                                                | string
                                                | React.JSXElementConstructor<any>
                                              >
                                            | Iterable<React.ReactNode>
                                            | React.ReactPortal
                                            | React.PromiseLikeOfReactNode
                                            | null
                                            | undefined;
                                          label: string;
                                          name: string;
                                          placeholder: any;
                                          validation: {
                                            errorMessage:
                                              | string
                                              | string[]
                                              | undefined;
                                            options: unknown;
                                          };
                                          required: any;
                                          options: {
                                            label: string;
                                            value: string;
                                          }[];
                                        },
                                        fieldIndex:
                                          | React.Key
                                          | null
                                          | undefined,
                                      ) => {
                                        // console.log('Field Item: ', field); // Debug Field Item

                                        switch (field?.type) {
                                          case 'text':
                                            return (
                                              <Input
                                                key={fieldIndex}
                                                label={field.label}
                                                name={field.name}
                                                placeholder={
                                                  field.placeholder ||
                                                  'Enter value'
                                                }
                                                type="text"
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );
                                          case 'dropdown':
                                            return (
                                              <DropdownNew
                                                key={fieldIndex}
                                                label={
                                                  field.label || 'Missing Label'
                                                }
                                                name={
                                                  field.name ||
                                                  `field-${fieldIndex}`
                                                }
                                                options={
                                                  field?.options?.map(
                                                    (option: {
                                                      label: string;
                                                      value: string;
                                                    }) => ({
                                                      label: option.label,
                                                      value: option.value,
                                                    }),
                                                  ) || []
                                                }
                                                formik={formik}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage || ''
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );

                                          case 'date':
                                            return (
                                              <DateInputNew
                                                key={fieldIndex}
                                                formik={formik}
                                                label={field.label}
                                                name={field.name}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );
                                          case 'checkItem':
                                            return (
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
                                            );
                                          case 'checkBoxInput':
                                            return (
                                              <CheckboxInput
                                                key={fieldIndex}
                                                name={field.name}
                                                options={
                                                  field?.validation?.options
                                                }
                                                form={formik}
                                                setSelectedCheckValue={
                                                  setSelectedCheckValue
                                                }
                                              />
                                            );
                                          default:
                                            return (
                                              <p key={fieldIndex}>
                                                Unsupported field: {field?.type}
                                              </p>
                                            );
                                        }
                                      },
                                    )
                                ) : (
                                  <p>No fields available.</p>
                                )}
                              </FormLayoutDynamic>
                            );
                          },
                        )}
                    </React.Fragment>
                  );
                })
              ) : (
                <p>Loading data or no fields available.</p>
              )}

              {/* Action Buttons: Save & Continue Later and Submit */}
              <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                {/* Save & Continue Later Button */}
                {/* <Button
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
                /> */}

                {/* Submit Button */}
                <Button
                  label={`Next`}
                  type="submit"
                  className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ActivityInformationReqRevision;
