'use client';

import { Form, Formik } from 'formik';
import Image from 'next/image';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import AddIcon from '@/assets/icons/Add.svg';
// import DisabledInput from '@/components/UI/Inputs/DisabledStoreComponent.tsx/DisabledStoreComponent';
import DisabledInput from '@/components/Forms/DisabledStoreComponent';
import OvalLoading from '@/components/Loader/OvalLoading';
// import AddIcon from '@/assets/icons/Add.svg';
// import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import M7 from '@/components/UI/Headings/M7';
// import M7 from '@/components/UI/Headings/M7';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo } from '@/interfaces/interface';
// import { storeFields } from '@/utils/fields/storeDetailsFields';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import { storeDetailsFormData } from '@/utils/onboardingForms/storeDetails';
// import DynamicRecordsTable from '@/components/Table/DynamicRecordsTable';
import {
  storeDetailsInitialValues,
  storeDetailsSchema,
} from '@/validations/merchant/onBoarding/storeDetails';

const AddStore = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { currentTab } = useCurrentTab();
  const userData = useAppSelector((state: any) => state.auth);
  const [addStoresValues, setAddStoresValues] = useState<AddStoreInfo[]>([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(true);
  const [isStoreAdded, setIsStoreAdded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [newStoreFields, setNewStoreFields] = useState<any>([]);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [formData, setFormData] = useState(storeDetailsFormData.categories);
  // const merchantregistrationData = useAppSelector(
  //   (state: any) => state.registerMerchantAccount,
  // );
  const [regions, setRegions] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [apierror, setApierror] = useState('');
  const { apiSecret, jwt, email, managerMobile } = userData;

  const [checkboxValue, setCheckboxValue] = useState<
    string | undefined | string[]
  >([]);

  console.log('chechkbox', setCheckboxValue, setFormData, checkboxValue);

  // const handleCheckboxValueChange = (value: any) => {
  //   console.log('Value from CheckboxInput:', value);
  //   setCheckboxValue(value); // Update the parent state with the new value
  //   setSelectedCheckValue(value);
  // };
  // const storeTableHeadings: string[] = [
  //   'Store Type',
  //   'Store Name',
  //   'Street Address',
  //   'City',
  //   'Store Category',
  //   'Country Code',
  //   'State',
  //   'POS Country Code',

  // ];

  const addAnotherStore = () => {
    console.log('here');
    setIsAddFormVisible(true); // Show the form
    setShowButton(false);
    setIsStoreAdded(false);
    console.log(showButton, showButton, apierror, selectedCheckValue);
  };

  const removeStore = (index: number) => {
    setAddStoresValues((prevStores) =>
      prevStores.filter((_, i) => i !== index),
    );

    if (addAnotherStore.length == 0) {
      setIsAddFormVisible(true);
      setShowButton(false);
    }
  };
  const router = useRouter();

  const getStoreCategories = async () => {
    try {
      const response = await apiClient.get('admin/getCategoryCode');
      if (response?.data?.responseCode === '009') {
        // setStoreCategories(response?.data?.categoryCode);
        // console.log("categories are", storeCategories)

        const finalCategories = response.data.categoryCode.map(
          (categoryCode: any) => ({
            value: categoryCode.value,
            label: categoryCode.label,
          }),
        );

        setStoreCategories(finalCategories);
        console.log('categories are', storeCategories);
      } else {
        setApierror(response?.data.responseDescription);
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

  // useEffect(() => {
  //   console.log('store type is', checkboxValue);
  // }, [checkboxValue]);

  // const updatedStoreFields = formData.map((field: any) => {
  //   // if (field.name === 'region') {
  //   //   return {
  //   //     ...field,
  //   //     options: regions,
  //   //   };
  //   // }
  //   console.log("field is", field)
  //   console.log(field.fields.name,"fields")
  //   if (field.fields.name === 'category') {
  //     console.log("store category ;ist", storeCategories)
  //     return {
  //       ...field,
  //       options: storeCategories,
  //      // Set the fetched regions as options for 'region'
  //     };
  //   }

  //   return field;
  // });

  const updatedStoreFields = formData.map((field: any) => {
    console.log('field is', field);

    // Iterate over `fields` array
    field.fields.forEach((subField: any) => {
      console.log(subField.name, 'fields');

      if (subField.name === 'category') {
        console.log('store category list', storeCategories);
        subField.options = storeCategories; // Update options
      }
    });

    return field;
  });
  useEffect(() => {
    console.log('stores are:', addStoresValues); // Track state changes

    //  getRegions();
  }, [addStoresValues]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('hoi');
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );
    console.log('values >>>', values);

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
          categories: storeDetailsFormData.categories.map((category: any) => ({
            // DO NOT REMOVE CODE BELOW
            // (category: any, index: any) => ({
            // categoryName: `${category.categoryName} + ${index + 1}`,
            categoryName: `${category.categoryName}`,
            data: category.fields.map((field: any) => ({
              label: field.label,
              // value: values[field.name] || '', // Fetching value from formik.values
              value:
                field.type === 'checkBoxInputMulti' ? '' : values[field.name], // Fetching value from formik.values
              ...(field.type === 'checkboxInput' ||
              field.type === 'checkBoxInputMulti'
                ? { options: values[field.name] || '' }
                : {}), // Add options only if it's a checkbox
            })),
          })),
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
      setLoading(true);
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
              router.push(`/merchant/home/business-nature/${nextTab}`);
            } else {
              setLoading(false);
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
          } else if (response?.data?.responseCode === '000') {
            setApierror(response?.data?.responseMessage);
            setLoading(false);
          } else {
            // setTitle('Error Occured');
            // setDescription(response?.data?.responseDescription);
            // setShowModal(true);
          }
        }
      } catch (e: any) {
        setApierror(e.message);
        setLoading(false);
        // console.log('Error in submitting dynamic form', e);
        // setTitle('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* <Breadcrumb /> */}
      <HeaderWrapper
        heading="Add Store"
        // description="Please add at least one store to continue merchant account registration"
      />
      <div className="flex flex-col gap-4 bg-screen-grey px-[290px] py-[60px]">
        <>
          {loading && <OvalLoading />}
          <Formik
            initialValues={storeDetailsInitialValues}
            validationSchema={storeDetailsSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const { handleSubmit } = formik;

              const handleNextNavigation = () => {
                handleSubmit();

                if (isStoreAdded) {
                  console.log('Navigating to the next page...');
                  router.push(
                    '/admin/admin-portal/manage-merchants/add-merchant-account/add-transaction-point',
                  );
                } else {
                  console.log('Form validation failed:', formik.errors);
                }
              };

              return (
                <div className="flex flex-col gap-4">
                  {isAddFormVisible && (
                    <>
                      {/* <div className="mt-4 h-[1px] w-full bg-border-light"></div> */}
                      <div className="rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[21px]">
                        <div className="flex items-center">
                          <M7>Add Store</M7>
                          <Image
                            src={AddIcon}
                            alt="plus-icon"
                            className="cursor-pointer"
                            onClick={() => setShowAddForm(true)}
                          />
                        </div>
                      </div>
                      {showAddForm && (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <H6>Store Type</H6>
                            {addStoresValues.length > 0 && (
                              <div onClick={() => setIsAddFormVisible(false)}>
                                <H6 textColor="text-danger-base">Cancel</H6>
                              </div>
                            )}
                          </div>
                          <Form>
                            <>
                              {/* <div className=""> */}
                              <div>
                                {updatedStoreFields?.map(
                                  (item: any, index: any) => (
                                    <React.Fragment key={index}>
                                      {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                                      <div
                                        // className="grid grid-cols-2 gap-6"

                                        className={`grid ${
                                          item.fields?.name === 'storeType'
                                            ? 'grid-cols-1'
                                            : 'grid-cols-2 gap-6'
                                        }`}
                                      >
                                        {/* <FormLayoutDynamic key={item} heading={item.categoryName}> */}
                                        {item.fields.map(
                                          (field: any, fieldIndex: any) => {
                                            return field.type === 'text' ? (
                                              <Input
                                                key={fieldIndex}
                                                label={field.label}
                                                name={field.name}
                                                type={field.type}
                                                formik={formik}
                                                asterik={field.required}
                                                error={
                                                  field.validation?.errorMessage
                                                }
                                              />
                                            ) : field?.type ===
                                              'checkBoxInputMulti' ? (
                                              <CheckboxInput
                                                key={fieldIndex}
                                                isMulti
                                                // layout='flex-row'
                                                name={field.name}
                                                options={field.options}
                                                form={formik}
                                                error={
                                                  field.validation?.errorMessage
                                                }
                                                setSelectedCheckValue={
                                                  setSelectedCheckValue
                                                }
                                              />
                                            ) : field?.type === 'dropdown' ? (
                                              <DropdownNew
                                                asterik={field.required}
                                                key={fieldIndex} // Add a key prop to DropdownInput as well
                                                label={field.label}
                                                name={field?.name}
                                                options={field.options}
                                                formik={formik}
                                                // error={field.validation.errorMessage}
                                              />
                                            ) : field?.type === 'date' ? (
                                              <DateInputNew
                                                asterik={field.required}
                                                key={fieldIndex}
                                                formik={formik}
                                                label={field.label}
                                                name={field.name}
                                                // error={field.validation.errorMessage}
                                              />
                                            ) : (
                                              <p key={fieldIndex}>
                                                nothing to show
                                              </p>
                                            );
                                          },
                                        )}
                                      </div>
                                      {/* </FormLayoutDynamic> */}
                                      {/* // ))} */}
                                    </React.Fragment>
                                  ),
                                )}
                              </div>
                              <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                                {apierror}
                              </div>
                              <div className="flex w-full justify-end pt-5">
                                <Button
                                  label="Save"
                                  type="submit"
                                  className="button-primary w-[271px] py-[19px] text-sm leading-tight transition duration-300"
                                />
                              </div>
                            </>
                          </Form>
                        </>
                      )}
                    </>
                  )}
                  {addStoresValues.length > 0 && (
                    <DisabledInput
                      data={addStoresValues}
                      removeStore={removeStore}
                    />
                  )}
                  {showButton && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        label="Next"
                        type="button" // Use type="button" to prevent form submission
                        onClickHandler={handleNextNavigation}
                        className="button-primary w-[271px] px-4 py-[19px] text-sm leading-tight transition duration-300"
                      />
                    </div>
                  )}
                </div>
              );
            }}
          </Formik>
        </>
      </div>
    </>
  );
};

export default AddStore;
