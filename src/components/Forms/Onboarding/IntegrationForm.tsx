'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import integrationFormSchema, {
  integrationFormInitialValues,
} from '@/components/Forms/validations/integartionForm';
import OvalLoading from '@/components/Loader/OvalLoading';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
// import type { FieldsData, Page } from './validationsOLD/types';
import { IntegrationFormData } from '@/utils/onboardingForms/integrationInfo';
// import type { FieldsData, Page } from './validations/types';
// import settlementDetailsSchema,{settlementDetailsInitialValues} from './validations/settlementForm';

function IntegrationForm() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  // const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  // const [filteredData, setFilteredData] = useState<Page[]>([]);
  // const [pageTitle, setPageTitle] = useState('');
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [formData, setFormData] = useState(IntegrationFormData.categories);

  console.log(
    'IntegartionFormData',
    IntegrationFormData,
    selectedCheckValue,
    setFormData,
  );
  // const [pageTitle, setPageTitle] = useState('');

  const router = useRouter();
  const { currentTab } = useCurrentTab();
  const [apierror, setApierror] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setFormData(IntegrationFormData);
  // }, [formData]);

  console.log('form data is', formData);

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
      const transformedRequest = {
        // request: {
        managerMobile: userData.managerMobile,
        page: {
          pageName: IntegrationFormData?.pageName,
          categories: IntegrationFormData?.categories.map((category: any) => ({
            categoryName: `Integration`,
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
      // const transformedData = {
      //   managerMobile: userData.managerMobile,
      //   page: {
      //     pageName: 'Integration',
      //     categories: [
      //       {
      //         categoryName: 'Integration Methods',
      //         data: [
      //           {
      //             label: 'Integration Methods',
      //             value: values.integrationMethods,
      //           },
      //           // { label: "primaryPhoneNo", value: values.mobileNo },
      //         ],
      //       },
      //       {
      //         categoryName: 'Integration Modes',
      //         data: [
      //           { label: 'Integration Modes', value: values.integrationModes },
      //         ],
      //       },
      //       {
      //         categoryName: "Developer's Details",
      //         data: [
      //           { label: 'Email Address', value: values.email },
      //           { label: 'Mobile No', value: values.mobileNo },
      //         ],
      //       },
      //     ],
      //   },
      // };

      const mdRequest = {
        ...transformedRequest,
        apisecret: apiSecret,
      };
      setLoading(true);
      const md5Hash = generateMD5Hash(mdRequest);
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            currentEndpoint,
            {
              request: transformedRequest,
              signature: md5Hash,
            },
            {
              params: {
                username: userData?.email,
              },
              headers: {
                Authorization: `Bearer ${userData.jwt}`,
                username: userData.email,
              },
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
              setLoading(false);
            }
          } else if (response?.data?.responseCode === '000') {
            setApierror(response?.data?.responseMessage);
            setLoading(false);
            // setTitle('Error Occured');
            // setDescription(response?.data?.responseDescription);
            // setShowModal(true);
          } else {
            setLoading(false);
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
        setLoading(false);
        // setTitle('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setLoading(false);
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
      {/* <div>     {formData?.pageName}</div> */}
      {loading && <OvalLoading />}
      <Formik
        initialValues={integrationFormInitialValues}
        validationSchema={integrationFormSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {/* // {formData?.pageName} */}
                hi
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
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
                          ) : (
                            <p key={fieldIndex}>nothing to show</p>
                          );
                        })}
                      </FormLayoutDynamic>
                      {/* // ))} */}
                    </React.Fragment>
                  ))}

                  <div></div>
                </div>

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

export default IntegrationForm;
