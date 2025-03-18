'use client';

import { Form, Formik } from 'formik';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
// import AddIcon from '@/assets/icons/Add.svg';
// import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import Button from '@/components/UI/Button/PrimaryButton';
// import M7 from '@/components/UI/Headings/M7';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo } from '@/interfaces/interface';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { storeFields } from '@/utils/fields/storeDetailsFields';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import {
  storeDetailsInitialValues,
  storeDetailsSchema,
} from '@/validations/merchant/onBoarding/storeDetails';

import DateInputNew from '../UI/Inputs/DateInputNew';
import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import DisabledInput from '@/components/UI/Inputs/DisabledStoreComponent.tsx/DisabledStoreComponent';
// import DisabledInput from './DisabledStoreComponent';
import type { FieldsData } from './validations/types';

const AddStoreReqRevision = () => {
  const { currentTab } = useCurrentTab();
  // const businessNatureData = useAppSelector(
  //   (state: any) => state.onBoardingForms,
  // );
  // const adminData = useAppSelector((state: any) => state.adminAuth);
  const userData = useAppSelector((state: any) => state.auth);
  const [addStoresValues] = useState<AddStoreInfo[]>([]);
  // const [isAddFormVisible, setIsAddFormVisible] = useState(true);
  // const [isStoreAdded, setIsStoreAdded] = useState(false);
  // const [showButton, setShowButton] = useState(false);
  // const [newStoreFields, setNewStoreFields] = useState<any>([]);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  // const merchantregistrationData = useAppSelector(
  //   (state: any) => state.registerMerchantAccount,
  // );
  const [regions, setRegions] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [apierror, setApierror] = useState('');
  const { apiSecret, jwt, email, managerMobile } = userData;
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);

  const storeDetailsFormData = {
    pageName: 'Store Details',
    categories: [
      {
        categoryName: 'Store',
        fields: [
          {
            label: 'Store Type *',
            name: 'storeType',
            type: 'checkBoxInputMulti',
            options: [
              // { value: 'Online', label: 'Online' },
              { value: 'Retail', label: 'Retail' },
            ],
          },
          // {
          //   label: 'Web Store Name *',
          //   name: 'webstoreName',
          //   type: 'text',
          //   show: ['Online'],
          // },
          {
            label: 'Store Name *',
            name: 'storeName',
            type: 'text',
            show: ['Online', 'Retail'],
          },
          // {
          //   label: 'Website URL *',
          //   name: 'webstoreURL',
          //   type: 'text',
          //   show: ['Online'],
          // },

          {
            label: 'Street Address *',
            name: 'streetAddress',
            type: 'text',
            show: ['Online', 'Retail'],
          },
          {
            label: 'City *',
            name: 'city',
            type: 'text',
            show: ['Online', 'Retail'],
          },
          {
            label: 'Store Category *',
            name: 'category',
            type: 'dropdown',
            show: ['Online', 'Retail'],
            // options: storeCategoryList,
          },
          {
            label: 'Country Code *',
            name: 'countryCode',
            type: 'text',
            show: ['Online', 'Retail'],
          },
          {
            label: 'State *',
            name: 'state',
            type: 'text',
            show: ['Online', 'Retail'],
          },
          {
            label: 'POS Country Code *',
            name: 'posCountryCode',
            type: 'text',
            show: ['Online', 'Retail'],
          },
        ],
      },
    ],
  };

  console.log(storeDetailsInitialValues);

  console.log('fieldData1', fieldData);
  const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  const [checkboxValue, setCheckboxValue] = useState<
    string | undefined | string[]
  >([]);

  console.log('chechkbox', setCheckboxValue);
  console.log('chechkbox', selectedCheckValue);

  // const handleCheckboxValueChange = (value: any) => {
  //   console.log('Value from CheckboxInput:', value);
  //   setCheckboxValue(value); // Update the parent state with the new value
  //   setSelectedCheckValue(value);
  // };

  // const addAnotherStore = () => {
  //   console.log('here');
  //   setIsAddFormVisible(true); // Show the form
  //   setShowButton(false);
  //   setIsStoreAdded(false);
  //   console.log(showButton, showButton, apierror, selectedCheckValue);
  // };

  // const removeStore = (index: number) => {
  //   setAddStoresValues((prevStores) =>
  //     prevStores.filter((_, i) => i !== index),
  //   );

  //   if (addAnotherStore.length == 0) {
  //     setIsAddFormVisible(true);
  //     setShowButton(false);
  //   }
  // };
  const router = useRouter();

  const getStoreCategories = async () => {
    try {
      const response = await apiClient.get('admin/getCategoryCode');
      if (response?.data?.responseCode === '009') {
        setStoreCategories(response?.data?.categoryCode); // Store regions data
        // console.log("categories are", storeCategories)
      } else {
        setApierror(response?.data.responseDescription);
        console.log(apierror);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getRegions = async () => {
    try {
      const response = await apiClient.get('admin/getAllRegions');
      if (response?.data?.responseCode === '009') {
        // console.log("hereeeeeeeeeee")
        const finalRegions = response.data.region.map((region: any) => ({
          value: region.name,
          label: region.name,
        }));
        setRegions(finalRegions);
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getStoreCategories();
    getRegions();
  }, [regions.length, storeCategories.length]);

  useEffect(() => {
    console.log('store type is', checkboxValue);
  }, [checkboxValue]);

  const updatedStoreFields = storeFields.map((field: any) => {
    if (field.name === 'region') {
      return {
        ...field,
        options: regions,
      };
    }
    if (field.name === 'category') {
      return {
        ...field,
        options: storeCategories, // Set the fetched regions as options for 'region'
      };
    }

    return field;
  });

  console.log('updated store fields,', updatedStoreFields);

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

      const mappedData = fData.map((item) => {
        const mappedCategories = item.categories.map((filteredCategory) => {
          const matchingCategory = storeDetailsFormData.categories.find(
            (category: { categoryName: string }) =>
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
                  // required: matchedField.required || false,
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
          pageName: item.pageName,
          categories: mappedCategories.filter(Boolean), // Remove null categories
        };
      });

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

  console.log('filtered data', filteredData);

  // useEffect(() => {
  //   console.log('stores are:', addStoresValues); // Track state changes

  //   //  getRegions();
  // }, [addStoresValues]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('hoi');
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );
    console.log('values >>>', values, addStoresValues);

    // console.log('BUSINESS NATURE DATAAA:', businessNatureData);
    // if (addStoresValues.length < 1) {
    //   setTitle('No Stores Found');
    //   setDescription('Please add atleast 1 store to proceed');
    //   setShowModal(true);
    //   return;
    // }

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const dynamicCurrentEndpoint = `${currentEndpoint}`;
      // const additionalValues = {
      // ...values,
      // stores: [values],
      // managerMobile: userData?.managerMobile,
      // businessNature: businessNatureData?.businessTypeNature,
      // status: 'Completed',
      // };
      // console.log('ADDITIONAL VALUES', additionalValues);
      // const stores = [values]
      const transformedRequest = {
        // request: {
        managerMobile,
        page: {
          pageName: storeDetailsFormData.pageName,
          categories: storeDetailsFormData.categories.map(
            (category: any, index: any) => ({
              categoryName: `${category.categoryName} + ${index + 1}`,
              data: category.fields.map((field: any) => ({
                label: field.label,
                value: values[field.name] || '', // Fetching value from formik.values
              })),
            }),
          ),
          status: 'Completed',
        },
        // },
      };
      const mdRequest = {
        ...transformedRequest,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);
      console.log('Signature', md5Hash);

      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            dynamicCurrentEndpoint,
            {
              request: transformedRequest,
              signature: md5Hash,
            },
            {
              // params: {
              //   username: email,
              // },
              headers: { Authorization: `Bearer ${jwt}`, username: email },
            },
          );
          console.log(response);
          if (response?.data?.responseCode === '009') {
            // Navigate to the next tab after successful submission
            const nextTab = endpointArray[currentIndex + 1]?.tab;
            if (nextTab) {
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
          } else if (response?.data?.responseCode === '000') {
            setApierror(response?.data?.responseMessage);
          } else {
            setTitle('Error Occured');
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
          }
        }
      } catch (e) {
        // console.log('Error in submitting dynamic form', e);
        // setTitle('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Custom Modal for displaying messages */}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={attachRoute}
        // routeName="/merchant/home"
      />

      {/* Formik Form for handling form state and submission */}
      <Formik
        enableReinitialize
        initialValues={initialValuesState || {}}
        validationSchema={storeDetailsSchema}
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
                filteredData.map((pageItem: any) => {
                  console.log('Page Item: ', pageItem); // Debug Page Item

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
                            console.log('Category Item: ', item); // Debug Category Item

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
                                        console.log('Field Item: ', field); // Debug Field Item

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
  // return (
  //   <>
  //     {/* <Breadcrumb /> */}
  //     <HeaderWrapper
  //       heading="Add Store"
  //       // description="Please add at least one store to continue merchant account registration"
  //     />
  //     <div className="flex flex-col gap-4 bg-screen-grey px-[290px] py-[60px]">
  //       <>
  //         <Formik
  //           enableReinitialize={true}
  //           initialValues={storeDetailsInitialValues}
  //           validationSchema={storeDetailsSchema}
  //           onSubmit={onSubmit}
  //         >
  //           {(formik) => {
  //             const { handleSubmit } = formik;

  //             const handleNextNavigation = () => {
  //               handleSubmit();

  //               if (isStoreAdded) {
  //                 console.log('Navigating to the next page...');
  //                 router.push(
  //                   '/admin/admin-portal/manage-merchants/add-merchant-account/add-transaction-point',
  //                 );
  //               } else {
  //                 console.log('Form validation failed:', formik.errors);
  //               }
  //             };

  //             return (
  //               <div className="flex flex-col gap-4">
  //                 {isAddFormVisible && (
  //                   <>
  //                     <div className="mt-4 h-[1px] w-full bg-border-light"></div>
  //                     <div className="flex w-full items-center justify-between">
  //                       <H6>Store Type</H6>
  //                       {addStoresValues.length > 0 && (
  //                         <div onClick={() => setIsAddFormVisible(false)}>
  //                           <H6 textColor="text-danger-base">Cancel</H6>
  //                         </div>
  //                       )}
  //                     </div>
  //                     <Form>
  //                       <>
  //                         <div className="grid grid-cols-2 gap-6">
  //                           {filteredData.length > 0 &&
  //                             filteredData.map(({ label, name, type, options }: any) => (
  //                               <div
  //                                 key={name}
  //                                 className={`flex flex-col gap-2 ${type === 'checkbox' ? 'col-span-2' : ''}`}
  //                               >
  //                                 {type === 'checkbox' && (
  //                                   <CheckboxInput
  //                                     setSelectedCheckValue={setSelectedCheckValue}
  //                                     name={name}
  //                                     options={options}
  //                                     isMulti={true}
  //                                     form={formik}
  //                                     layout="flex-row"
  //                                   />
  //                                 )}

  //                                 {type === 'dropdown' && (
  //                                   <DropdownInput
  //                                     label={label}
  //                                     name={name}
  //                                     options={options}
  //                                     formik={formik}
  //                                   />
  //                                 )}

  //                                 {type === 'text' && (
  //                                   <Input
  //                                     label={label}
  //                                     type="text"
  //                                     name={name}
  //                                   />
  //                                 )}
  //                               </div>
  //                             ))
  //                           }

  //                         </div>
  //                         <div className="flex w-full justify-end pt-5">
  //                           <Button
  //                             label="Save"
  //                             type="submit"
  //                             className="button-primary w-[271px] py-[19px] text-sm leading-tight transition duration-300"
  //                           />
  //                         </div>
  //                       </>
  //                     </Form>
  //                   </>
  //                 )}
  //                 {addStoresValues.length > 0 && (
  //                   <DisabledInput
  //                     data={addStoresValues}
  //                     removeStore={removeStore}
  //                   />
  //                 )}
  //                 {showButton && (
  //                   <div className="mt-4 flex justify-end">
  //                     <Button
  //                       label="Next"
  //                       type="button" // Use type="button" to prevent form submission
  //                       onClickHandler={handleNextNavigation}
  //                       className="button-primary w-[271px] px-4 py-[19px] text-sm leading-tight transition duration-300"
  //                     />
  //                   </div>
  //                 )}
  //               </div>
  //             );
  //           }}
  //         </Formik>
  //       </>
  //     </div>
  //   </>
  // );
};

export default AddStoreReqRevision;
