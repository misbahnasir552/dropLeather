'use client';

import { Form, Formik } from 'formik';
import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
// import AttachmentsIcon from "@/assets/icons/Attachments.svg";
import Button from '@/components/UI/Button/PrimaryButton';
import FileInput from '@/components/UI/Inputs/FileInput';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
// import { setAttachmentForm } from "@/redux/features/formSlices/onBoardingForms";
// import {
//   AttachmentFormInfoInitialValues,
//   AttachmentFormInfoSchema,
// } from "@/validations/merchant/onBoarding/attachmentInfo";
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';

import DropdownInput from '../UI/Inputs/DropdownInput';
// import ImageInput from "../UI/Inputs/ImageInput";
import Input from '../UI/Inputs/Input';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/helper';

const Attachments = () => {
  const fieldsData = useAppSelector((state: any) => state.fields);
  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();

  // const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(5).fill(null),
  );

  const router = useRouter();
  // const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);

  const formData = new FormData();
  console.log(filteredData, 'filtered data from attachmentsssssssssss');

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
      const fData = fieldsData.pages?.page.filter((item: any) => {
        // console.log(item.name, "ITEM NAME");
        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);
      // console.log("FDATAAA", fData);

      fData?.forEach((item: any) => {
        // if (item.name === "Activity Information") {
        item.categories.forEach((category: any) => {
          category.fields.forEach((field: any) => {
            initialValues[field.name] = '';
          });
        });
        setInitialValuesState(initialValues);
        // }
      });
      const validationSchema = buildValidationSchema(fData);
      console.log('Vaidation schema result', validationSchema);

      setValidationSchemaState(validationSchema);
    }
  }, [currentTab]);

  if (!initialValuesState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const endpointArray = [
      {
        tab: 'activity-information',
        endpoint: `/merchant/activity/${userData.email}`,
      },
      {
        tab: 'business-details',
        endpoint: `/merchant/businessdetails/${userData.email}`,
      },
      {
        tab: 'settlement-details',
        endpoint: `/merchant/settlementdetails/${userData.email}`,
      },
      {
        tab: 'integration',
        endpoint: `/merchant/integration/${userData.email}`,
      },
      { tab: 'attachments', endpoint: `/merchant/upload/${userData.email}` },
    ];
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');
      if (currentIndex === 4) {
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            formData.append('files', values[key]);
          }
        });
        formData.append('status', 'Completed');
        console.log('FORM DATAA', formData);

        const response: any = await apiClient.post(
          `merchant/upload/${userData.email}`,
          formData,
          {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          },
        );
        console.log(response, 'Attachments');
        return;
      }
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const additionalValues = {
        ...values,
        managerMobile: userData?.managerMobile,
        // businessNature: 'partnership',
        status: 'Completed',
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
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
              headers: { Authorization: `Bearer ${userData?.jwt}` },
            },
          );
          console.log(response);
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
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
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
                  {/* <H6>
                      Upload Documents{" "}
                      <span className="font-normal leading-tight text-secondary-500">
                        (What would you like to integrate)
                      </span>
                    </H6> */}
                  {filteredData?.map(
                    (pageItem: {
                      name: React.Key | null | undefined;
                      categories: any[];
                    }) => (
                      <React.Fragment key={pageItem.name}>
                        {pageItem.categories.map(
                          (
                            item: { categoryName: any; fields: any[] },
                            itemIndex: any,
                          ) => (
                            <FormLayoutDynamic
                              key={itemIndex}
                              heading={item.categoryName}
                            >
                              {[...item.fields]
                                .sort(
                                  (
                                    a: { priority: number },
                                    b: { priority: number },
                                  ) => a.priority - b.priority,
                                )
                                .map(
                                  (
                                    field: {
                                      type?: any;
                                      label: any;
                                      name: any;
                                      validation?: any;
                                      file?: any;
                                      icon?: string | StaticImageData;
                                    },
                                    fieldIndex: React.Key | null | undefined,
                                  ) => {
                                    if (field?.type === 'text') {
                                      return (
                                        <Input
                                          key={fieldIndex}
                                          label={field.label}
                                          name={field.name}
                                          type={field.type}
                                          error={field.validation.errorMessage}
                                        />
                                      );
                                    }
                                    if (field?.type === 'dropDown') {
                                      return (
                                        <DropdownInput
                                          key={fieldIndex}
                                          label={field.label}
                                          name={field.name}
                                          options={field.validation?.options}
                                          formik={formik}
                                          error={field.validation.errorMessage}
                                        />
                                      );
                                    }
                                    if (field?.type === 'file') {
                                      return (
                                        <FileInput
                                          key={field.name}
                                          selectedFiles={selectedFiles}
                                          setSelectedFiles={setSelectedFiles}
                                          index={fieldIndex}
                                          formik={formik}
                                          item={field}
                                        />
                                      );
                                    }
                                    return null;
                                  },
                                )}
                            </FormLayoutDynamic>
                          ),
                        )}
                      </React.Fragment>
                    ),
                  )}
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
};

export default Attachments;
