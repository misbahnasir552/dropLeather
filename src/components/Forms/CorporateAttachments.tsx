'use client';

import { Form, Formik } from 'formik';
import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import FileInput from '@/components/UI/Inputs/FileInput';s
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setRequestRevision } from '@/redux/features/authSlice';
import { setCorporateAttachmentStatus } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';

import CorporateFileInput from '../UI/Inputs/CorporateFileInput';
// import type { CorporateAttachmentFormInfo } from '@/interfaces/interface'
import DropdownInput from '../UI/Inputs/DropdownInput';
import Input from '../UI/Inputs/Input';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/helper';
import type { FieldsData } from './validations/types';

const CorporateAttachments = () => {
  const dispatch = useAppDispatch();
  const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);

  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [attachRoute, setAttachRoute] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();

  // const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
  //   Array(5).fill(null),
  // );
  const [selectedFiles, setSelectedFiles] = useState<Array<File[] | null>>([]);
  // const [selectedFiles, setSelectedFiles] = React.useState<Array<File[] | null>>([]);

  const router = useRouter();
  console.log('ROUTER ', router);

  const userData = useAppSelector((state: any) => state.auth);

  const formData = new FormData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentDocLabels, setDocLabels] = useState<string[]>([]);

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    const docLabels: string[] = [];
    const initialLabel: { [key: string]: any } = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      const fData = fieldsData?.pages?.page?.filter((item: any) => {
        if (
          (item.name === 'Documents' ||
            item.name === 'Corporate Sole Attachments') &&
          currentTab === 'attachments'
        ) {
          return convertSlugToTitle(item.name);
        }

        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);

      fData?.forEach((item: any) => {
        item.categories.forEach((category: any) => {
          category.fields.forEach((field: any) => {
            initialValues[field.name] = '';
          });
        });
        setInitialValuesState(initialValues);
      });
      const validationSchema = buildValidationSchema(fData);

      setValidationSchemaState(validationSchema);

      fData?.forEach((item: any) => {
        item.categories.forEach((category: any) => {
          if (
            category?.categoryName ===
            'Upload Documents (What would you like to integrate)'
          ) {
            category.fields.forEach((field: any) => {
              initialLabel[field.name] = field?.label;
              docLabels.push(field.label);
            });
          }
        });
      });
    }
    setDocLabels(docLabels);
  }, [currentTab]);

  console.log('FILT ', filteredData);
  console.log('LABELS ', attachmentDocLabels);

  if (!initialValuesState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (values: any) => {
    values.attachmentStatus = 'Completed';
    dispatch(setCorporateAttachmentStatus(values?.attachmentStatus));
    const endpointArray = [
      {
        tab: 'application-form',
        endpoint: `/corporate/saveApplicationForm/${userData.email}`,
      },
      {
        tab: 'live-picture',
        endpoint: `/corporate/livePicture/${userData.email}`,
      },
      {
        tab: 'checklist',
        endpoint: `/corporate/checklist/${userData.email}`,
      },
      {
        tab: 'attachments',
        endpoint: `/corporate/saveCorporateDocuments/${userData.email}`,
      },
      {
        tab: 'review-form',
        endpoint: `/corporate/corporateFormReview/${userData.email}`,
      },
    ];
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      if (currentIndex === 3) {
        try {
          console.log('values ', values, attachmentDocLabels);

          Object.entries(values).forEach(([key, value]) => {
            console.log('OB VAL ', value, key);

            // Find the corresponding label from filteredData
            let label: string | undefined;
            filteredData?.forEach((item: any) => {
              item.categories.forEach((category: any) => {
                category.fields.forEach((field: any) => {
                  if (field?.name === key) {
                    label = field?.label; // Match the key with the field's name
                  }
                });
              });
            });
            if (label && Array.isArray(value)) {
              console.log('LABEL ', label);

              value.forEach((file: any) => {
                formData.append(label!, file); // Use the label here
              });
            }
          });
          const status = 'Completed';

          formData.append('corporateEmail', userData.email);
          formData.append('status', status);

          const response = await apiClient.post(
            `/corporate/saveCorporateDocuments`,
            formData,
            { headers: { Authorization: `Bearer ${userData.jwt}` } },
          );
          if (response.data.responseCode === '000') {
            setShowModal(true);
            setTitle('Duplicate Filename Error');
            setDescription(response?.data.responseDescription);
            setAttachRoute('');
          } else {
            const nextTab = endpointArray[currentIndex + 1]?.tab;

            if (nextTab) {
              console.log('Upload Response11:', response);

              if (userData.isrequestRevision) {
                dispatch(setRequestRevision(false));

                setTitle('Files Uploaded!');
                setDescription(response?.data?.responseDescription);
                setShowModal(true);
                setAttachRoute('/merchant/home');
              } else {
                setTitle('Files Uploaded!');
                setDescription(response?.data?.responseDescription);
                setShowModal(true);
                setAttachRoute(`/merchant/home/business-nature/${nextTab}`);
                // router.push(`/merchant/home/business-nature/${nextTab}`);
              }
              // router.push(`/merchant/home/business-nature/${nextTab}`);
            } else {
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
          }
        } catch (error) {
          setShowModal(true);
          setTitle('File Upload Error');
          setDescription('Network failed! Please try again later.');
          console.error('File Upload Error:', error);
        }
      }
    }
  };

  console.log('attachRoute ', attachRoute);

  return (
    <div>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={attachRoute}
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
                              subHeading={`*Only jpg, png, jpeg, or pdf files are allowed`}
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
                                        <CorporateFileInput
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
};

export default CorporateAttachments;
