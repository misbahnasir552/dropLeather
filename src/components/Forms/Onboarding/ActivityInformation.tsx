'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import activityInformationFormSchema, {
  activityInformationFormInitialValues,
} from '@/components/Forms/validations/activityInformationForm';
import OvalLoading from '@/components/Loader/OvalLoading';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
// import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DisabledField from '@/components/UI/Inputs/DisabledField';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
// import type { ActivityFormInfo } from '@/interfaces/interface';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import { ActivityInformationFormData } from '@/utils/onboardingForms/activityInformation';
// import { buildValidationSchema } from './validationsOLD/helper';
// import type { FieldsData } from './validationsOLD/types';

const ActivityInformation = () => {
  const userData = useAppSelector((state: any) => state.auth);
  // const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [formData, setFormData] = useState(
    ActivityInformationFormData.categories,
  );
  const [apierror, setApierror] = useState('');
  const businessNature = useAppSelector(
    (state: any) => state.onBoardingForms.businessNature,
  );
  // const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  // const [isChecked, setChecked] = useState(false);
  // const [filteredData, setFilteredData] = useState<any[]>();
  // const [pageTitle, setPageTitle] = useState('');
  // const [initialValuesState, setInitialValuesState] = useState<any>();
  // const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  console.log('userdatais', setDescription, setTitle, userData, setFormData);
  const { apiSecret } = userData;
  const router = useRouter();
  console.log('selected value checkbox input: ', selectedCheckValue);

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

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('activity valuesssssssssssss', values);
    // router.push('?activeTab=additional-information');

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');

      // const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      console.log(currentEndpoint, 'currentpoint');
      const transformedData = {
        managerMobile: userData.managerMobile,

        page: {
          pageName: 'Activity Information',

          categories: ActivityInformationFormData.categories.map(
            (category) => ({
              categoryName: category.categoryName,
              data: category.fields.map((field) => ({
                label: field.label,
                value: values[field.name] || '', // Fetching value from formik.values
              })),
            }),
          ),
        },
      };

      // const additionalValues = {
      //   ...values,
      //   managerMobile: userData?.managerMobile,
      //   // businessNature: formData?.businessNature?.businessTypeNature,
      //   status: 'Completed',
      // };
      const mdRequest = {
        ...transformedData,
        apisecret: apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        // managerMobile: userData.managerMobile,
        request: transformedData,
        signature: md5Hash,
      };
      setLoading(true);
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(currentEndpoint, requestBody, {
            params: {
              natureOfBusiness: businessNature?.businessNature,
            },
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
              Username: userData?.email,
            },
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
            setApierror(response?.data?.responseMessage);
            setLoading(false);
          }
        }

        // Navigate to the next tab after successful submission
        const nextTab = endpointArray[currentIndex + 1]?.tab;
        if (nextTab) {
          router.push(`/merchant/home/business-nature/${nextTab}`);
        } else {
          console.log('Form submission completed, no more tabs to navigate.');
        }
      } catch (e: any) {
        setApierror(e?.message);
        setLoading(false);
        // console.log('Error in submitting dynamic form', e);
        // console.error('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    }
  };

  // const handleCheckboxChange = (name: string, formik: any) => {
  //   const newChecked = !isChecked;
  //   console.log(newChecked, 'NEW CHECKED', isChecked, 'ISCHECKED');
  //   if (formik.values.businessAddress) {
  //     setChecked(newChecked);
  //   }
  //   if (newChecked && formik.values.businessAddress) {
  //     formik.setFieldValue(name, formik.values.businessAddress);
  //   } else {
  //     formik.setFieldValue(name, '');
  //   }
  // };

  return (
    <>
      {loading && <OvalLoading />}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={attachRoute}
        // routeName="/merchant/home"
      />
      <Formik
        initialValues={activityInformationFormInitialValues}
        validationSchema={activityInformationFormSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            {/* <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
              {pageTitle}
            </div> */}

            <div className="flex flex-col justify-end gap-9">
              {formData?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                  <FormLayoutDynamic key={item} heading={item.categoryName}>
                    {item.fields.map((field: any, fieldIndex: any) => {
                      return field.type === 'text' ? (
                        <Input
                          key={fieldIndex}
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          formik={formik}
                          asterik={field.required}
                          error={field.validation?.errorMessage}
                          desclaimer={field.desclaimer}
                        />
                      ) : field.type === 'disabledInput' ? (
                        <DisabledField
                          data={[
                            {
                              label:
                                field.name === 'primaryPhoneNo'
                                  ? 'Primary Phone No'
                                  : 'Email Address',
                              value:
                                field.name === 'primaryPhoneNo'
                                  ? userData?.managerMobile
                                  : userData?.email,
                            },
                          ]}
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
                      ) : field?.type === 'checkBoxInputMulti' ? (
                        <CheckboxInput
                          key={fieldIndex}
                          isMulti
                          name={field.name}
                          options={field.options}
                          form={formik}
                          error={field.validation?.errorMessage}
                          setSelectedCheckValue={setSelectedCheckValue}
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
                        <p key={fieldIndex}>nothing to show</p>
                      );
                    })}
                  </FormLayoutDynamic>
                  {/* // ))} */}
                </React.Fragment>
              ))}
              <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                {apierror}
              </div>

              {/* <FormControlButtons saveAndContinue={saveAndContinue} /> */}
              <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                {/* <Button
                  label={`Save & Continue Later`}
                  // onClickHandler={() =>
                  //   saveAndContinue(
                  //     formik.values,
                  //     formik.setSubmitting,
                  //     // formik.validateForm,
                  //   )
                  // }
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
          // </div>
        )}
      </Formik>
    </>
  );
};

export default ActivityInformation;
