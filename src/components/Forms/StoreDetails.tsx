'use client';

import { Form, Formik } from 'formik';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
// import AddIcon from '@/assets/icons/Add.svg';
// import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
// import M7 from '@/components/UI/Headings/M7';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo } from '@/interfaces/interface';
import { storeFields } from '@/utils/fields/storeDetailsFields';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import {
  storeDetailsInitialValues,
  storeDetailsSchema,
} from '@/validations/merchant/onBoarding/storeDetails';

// import DisabledInput from '@/components/UI/Inputs/DisabledStoreComponent.tsx/DisabledStoreComponent';
import DisabledInput from './DisabledStoreComponent';

const AddStore = () => {
  const { currentTab } = useCurrentTab();
  // const businessNatureData = useAppSelector(
  //   (state: any) => state.onBoardingForms,
  // );
  // const adminData = useAppSelector((state: any) => state.adminAuth);
  const userData = useAppSelector((state: any) => state.auth);
  const [addStoresValues, setAddStoresValues] = useState<AddStoreInfo[]>([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(true);
  const [isStoreAdded, setIsStoreAdded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  // const merchantregistrationData = useAppSelector(
  //   (state: any) => state.registerMerchantAccount,
  // );
  const [regions, setRegions] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [apierror, setApierror] = useState('');
  const { apiSecret, jwt, email } = userData;

  const [checkboxValue, setCheckboxValue] = useState<
    string | undefined | string[]
  >([]);

  const handleCheckboxValueChange = (value: any) => {
    console.log('Value from CheckboxInput:', value);
    setCheckboxValue(value); // Update the parent state with the new value
    setSelectedCheckValue(value);
  };

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
        setStoreCategories(response?.data?.categoryCode); // Store regions data
        // console.log("categories are", storeCategories)
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

  useEffect(() => {
    console.log('store type is', checkboxValue);
  }, [checkboxValue]);

  const updatedStoreFields = storeFields.map((field: any) => {
    if (field.name === 'region') {
      return {
        ...field,
        options: regions, // Set the fetched regions as options for 'region'
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

  useEffect(() => {
    console.log('stores are:', addStoresValues); // Track state changes

    //  getRegions();
  }, [addStoresValues]);

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
      const additionalValues = {
        ...values,
        stores: addStoresValues,
        // managerMobile: userData?.managerMobile,
        // businessNature: businessNatureData?.businessTypeNature,
        status: 'Completed',
      };
      console.log('ADDITIONAL VALUES', additionalValues);

      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);
      console.log('Signature', md5Hash);

      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            dynamicCurrentEndpoint,
            {
              request: additionalValues,
              signature: md5Hash,
            },
            {
              params: {
                username: email,
              },
              headers: { Authorization: `Bearer ${jwt}` },
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
          } else {
            // setTitle('Error Occured');
            // setDescription(response?.data?.responseDescription);
            // setShowModal(true);
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

  // const onSubmit = async (values: AddStoreInfo, { resetForm }: any) => {
  //     const currentIndex = endpointArray.findIndex(
  //         (item) => item.tab === currentTab,
  //       );
  //   console.log('Submitted store:', values);

  //   setAddStoresValues((prevStores) => [...prevStores, values]);

  //   const newStores = [...addStoresValues, values];
  //   const req = {
  //     // managerMobile,
  //     store: newStores,
  //   };
  //   const mdRequest = {
  //     ...req,
  //     apisecret: apiSecret,
  //   };

  //   const md5Hash = generateMD5Hash(mdRequest);
  //   try {
  //     const response: any = await apiClient.post(
  //       `admin/saveMerchantStore?username=${email}`,
  //       {
  //         request: req,
  //         signature: md5Hash,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //           // accountNumber: merchantregistrationData.accountNumber,
  //         },
  //       },
  //     );
  //     console.log('response is', response);
  //     if (response?.data?.responseCode === '009') {
  //       // setTitle(response?.data?.responseMessage);
  //       // setShowModal(true);
  //       // console.log('hereeeeee');
  //       router.push(
  //         '/admin/admin-portal/manage-merchants/add-merchant-account/add-transaction-point',
  //       );
  //     } else {
  //       console.log('Failure');
  //       setApierror(response?.data?.responseMessage);
  //       throw new Error('Error fetching');
  //     }
  //   } catch {
  //     console.log('hiiii');
  //   }

  //   setIsAddFormVisible(false);

  //   resetForm();
  //   setIsStoreAdded(true);
  //   setShowButton(true);
  //   // console.log("stores areee ",addStoresValues)
  // };

  return (
    <>
      {/* <Breadcrumb /> */}
      <HeaderWrapper
        heading="Add Store"
        // description="Please add at least one store to continue merchant account registration"
      />
      <div className="flex flex-col gap-4 bg-screen-grey px-[290px] py-[60px]">
        <>
          {/* {showButton && (
            <div className="rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[21px]">
              <div
                className="flex items-center"
                onClick={() => addAnotherStore()}
              >
                <M7>Add another Store</M7>
                <Image
                  src={AddIcon}
                  alt="plus-icon"
                  className="cursor-pointer"
                />
              </div>
            </div>
          )} */}

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
                      <div className="mt-4 h-[1px] w-full bg-border-light"></div>
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
                          <div className="grid grid-cols-2 gap-6">
                            {updatedStoreFields.map(
                              ({ label, name, type, options }) => (
                                <div
                                  key={name}
                                  className={`flex flex-col gap-2 ${
                                    type === 'checkbox' ? 'col-span-2' : ''
                                  }`}
                                >
                                  {type === 'checkbox' && (
                                    <CheckboxInput
                                      setSelectedCheckValue={
                                        setSelectedCheckValue
                                      }
                                      name={name}
                                      options={options}
                                      isMulti={true}
                                      form={formik}
                                      onValueChange={handleCheckboxValueChange}
                                      // touched={formik.touched[name as keyof t/ypeof formik.touched]}
                                      layout="flex-row"
                                    />
                                  )}

                                  {type === 'dropdown' && (
                                    <DropdownInput
                                      label={label}
                                      name={name}
                                      options={options}
                                      formik={formik}
                                      // error={
                                      //   formik.errors[
                                      //   name as keyof typeof formik.errors
                                      //   ]
                                      // }
                                      // touched={
                                      //   formik.touched[
                                      //   name as keyof typeof formik.touched
                                      //   ]
                                      // }
                                    />
                                  )}

                                  {type === 'text' && (
                                    <Input
                                      label={label}
                                      type="text"
                                      name={name}
                                      // error={
                                      //   formik.errors[
                                      //   name as keyof typeof formik.errors
                                      //   ]
                                      // }
                                      // touched={
                                      //   formik.touched[
                                      //   name as keyof typeof formik.touched
                                      //   ]
                                      // }
                                    />
                                  )}
                                </div>
                              ),
                            )}
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
