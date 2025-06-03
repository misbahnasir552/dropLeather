'use client';

import { Form, Formik } from 'formik';
// import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import C5soleAttachmentFormSchema, {
  C5soleAttachmentFormInitialValues,
} from '@/components/Forms/validations/attachmentForm/c5SoleAttachmentsForm';
import C10soleAttachmentFormSchema, {
  C10soleAttachmentFormInitialValues,
} from '@/components/Forms/validations/attachmentForm/c10SoleAttachmentForm';
import partnershipAttachmentsFormSchema, {
  partnershipAttachmentsFormInitialValues,
} from '@/components/Forms/validations/attachmentForm/partnershipAttachmentsForm';
import pnpAttachmentsFormSchema, {
  pnpAttachmentsFormInitialValues,
} from '@/components/Forms/validations/attachmentForm/pnpAttachmentsForm';
import OvalLoading from '@/components/Loader/OvalLoading';
import Button from '@/components/UI/Button/PrimaryButton';
import CorporateFileInput from '@/components/UI/Inputs/CorporateFileInput';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { endpointArray } from '@/utils/merchantForms/helper';
// import { buildValidationSchema } from './validationsOLD/helper';
import {
  C5soleProprietorAttachmentsFormData,
  C10soleProprietorAttachmentsFormData,
  partnershipAttachmentsFormData,
  pnpAttachmentsFormData,
} from '@/utils/onboardingForms/attachments';

const Attachments = () => {
  // const fieldsData = useAppSelector((state: any) => state.fields);
  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const [apierror, setApierror] = useState('');
  const [loading, setLoading] = useState(false);
  const [showField, setShowField] = useState(false);
  const businessNature = useAppSelector(
    (state: any) => state.onBoardingForms.businessNature,
  );

  // const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File[] | null>>(
    Array(5).fill(null),
  );

  const [newLabel, setNewLabel] = useState('');
  console.log(
    'businessNature',
    businessNature.businessNature,
    // apierror,
    setFilteredData,
  );
  const router = useRouter();
  const [attachmentData, setAttachmentData] = useState<any[]>();
  // const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);

  const formData = new FormData();
  console.log(filteredData, 'filtered data from attachmentsssssssssss');
  const limitCategory = useAppSelector(
    (state: any) => state.onBoardingForms.limitCategory,
  );

  console.log('limitCategory', limitCategory);

  useEffect(() => {
    console.log(initialValuesState, 'initial values');
    console.log(validationSchemaState, 'validationSchemaState');
  }, [initialValuesState, validationSchemaState]);

  useEffect(() => {
    if (
      businessNature?.businessNature === 'soleProprietor' &&
      limitCategory === 'C5 (limit of max 500k)'
    ) {
      setInitialValuesState(C5soleAttachmentFormInitialValues);
      setValidationSchemaState(C5soleAttachmentFormSchema);
      setAttachmentData(C5soleProprietorAttachmentsFormData.categories);
    } else if (
      businessNature?.businessNature === 'soleProprietor' &&
      limitCategory === 'C10 (limit above than 500k)'
    ) {
      setInitialValuesState(C10soleAttachmentFormInitialValues);
      setValidationSchemaState(C10soleAttachmentFormSchema);
      setAttachmentData(C10soleProprietorAttachmentsFormData.categories);
    } else if (businessNature?.businessNature === 'partnership') {
      setInitialValuesState(partnershipAttachmentsFormInitialValues);
      setValidationSchemaState(partnershipAttachmentsFormSchema);
      setAttachmentData(partnershipAttachmentsFormData.categories);
    } else if (businessNature?.businessNature === 'publicOrPrivateLtd') {
      setInitialValuesState(pnpAttachmentsFormInitialValues);
      setValidationSchemaState(pnpAttachmentsFormSchema);
      setAttachmentData(pnpAttachmentsFormData.categories);
    } else {
      setAttachmentData([]); // Set a default empty state to avoid undefined errors
    }

    console.log(attachmentData, 'attachments');

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
    }
  }, [currentTab, businessNature]);
  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');
      if (currentIndex === 4) {
        // tested running code without labels
        // Object.keys(values).forEach((key) => {
        //   if (values[key]) {
        //     formData.append('files', values[key]);
        //   }
        // });
        Object.entries(values).forEach(([key, value]) => {
          console.log('OB VAL ', value, key);

          // Find the corresponding label from filteredData
          console.log('filtered data is', filteredData);
          // let label: string | undefined;
          // filteredData?.forEach((item: any) => {
          //   item.categories.forEach((category: any) => {
          //     category.fields.forEach((field: any) => {
          //       if (field?.name === key) {
          //         label = field?.label; // Match the key with the field's name
          //       }
          //     });
          //   });
          // });
          const label = attachmentData
            ?.flatMap((category: any) => category.fields)
            ?.find((field: any) => field?.name === key)?.label;
          if (label && Array.isArray(value)) {
            console.log('LABEL ', label);

            value.forEach((file: any) => {
              console.log('file is', file);
              formData.append(label!, file); // Use the label here
            });
          }
        });

        // formData.append('status', 'Completed');
        console.log('FORM DATAA', formData);
        setLoading(true);
        try {
          const response: any = await apiClient.post(
            `merchant/saveMerchantDocuments`,
            formData,
            {
              params: {
                merchantEmail: userData?.email,
                status: 'Completed',
                resetFiles: false,
              },
              headers: { Authorization: `Bearer ${userData.jwt}` },
            },
          );
          console.log(response, 'Attachments');
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
            console.log('no');
            setApierror(response?.data?.responseMessage);
            setLoading(false);
          }
          // else {
          //   setTitle('Error Occured');
          //   setDescription(response?.data?.responseDescription);
          //   setShowModal(true);
          // }
          // return;
        } catch (e: any) {
          setLoading(false);
          setApierror(e?.message);
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }
    }
  };
  // Add a new field with a custom label
  const handleAddField = () => {
    if (!newLabel?.trim()) return;
    setShowField(false);
    const newField: any = {
      label: newLabel,
      name: newLabel?.toLowerCase()?.replace(/\s+/g, '_'),
      type: 'file',
      required: false,
    };

    // Add to the first category of first page
    const updatedData: any = [...(attachmentData ?? [])];
    updatedData[0]?.fields?.push(newField);
    setAttachmentData(updatedData);
    setNewLabel('');
  };
  return (
    <div>
      {loading && <OvalLoading />}
      {initialValuesState && validationSchemaState ? (
        <Formik
          initialValues={initialValuesState}
          validationSchema={validationSchemaState}
          enableReinitialize
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

                    {attachmentData?.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                        <FormLayoutDynamic
                          key={index}
                          heading={item.categoryName}
                        >
                          {/* <FormLayoutDynamic key={item} heading={item.categoryName}> */}
                          {item?.fields?.map((field: any, fieldIndex: any) => {
                            return field?.type === 'file' ? (
                              <CorporateFileInput
                                asterik={field.required}
                                key={field.name}
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                                index={fieldIndex}
                                formik={formik}
                                item={field}
                              />
                            ) : (
                              <p key={fieldIndex}>nothing to show</p>
                            );
                          })}
                          {/* Input to add new field */}

                          {showField ? (
                            <div className="flex flex-col gap-4">
                              <input
                                type="text"
                                placeholder="Enter Field Label"
                                value={newLabel}
                                className="focus-within:border-primary-base hover:border-primary-base w-full rounded-lg border border-border-light p-4 hover:shadow-sm focus:shadow-sm focus:outline-none"
                                onChange={(e) => setNewLabel(e.target.value)}
                              />
                              {/* <button onClick={handleAddField}>Add Field</button> */}
                              <div className="flex justify-end gap-4">
                                <Button
                                  label={`Save`}
                                  onClickHandler={handleAddField}
                                  className="button-primary px-4  py-[12px] text-sm leading-tight transition duration-300"
                                />
                                <Button
                                  label={`Cancel`}
                                  onClickHandler={() => setShowField(false)}
                                  className="button-primary px-4  py-[12px] text-sm leading-tight transition duration-300"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-end">
                              <Button
                                label={`Add More Documents`}
                                onClickHandler={() => setShowField(true)}
                                className="button-primary px-4 py-[12px] text-sm leading-tight transition duration-300"
                              />
                            </div>
                          )}
                        </FormLayoutDynamic>
                      </React.Fragment>
                    ))}
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
                      disable={loading}
                      className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                    />
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

export default Attachments;
