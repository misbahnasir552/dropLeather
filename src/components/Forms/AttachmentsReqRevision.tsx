'use client';

import { Form, Formik } from 'formik';
// import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import * as Yup from 'yup';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { endpointArray } from '@/utils/merchantForms/helper';
import {
  C5soleProprietorAttachmentsFormData,
  C10soleProprietorAttachmentsFormData,
  partnershipAttachmentsFormData,
  pnpAttachmentsFormData,
} from '@/utils/onboardingForms/attachments';

// import { ActivityInformationFormData } from '@/utils/onboardingForms/activityInformation';
// import { buildValidationSchema } from './validationsOLD/helper';
// import {
//   partnershipAttachmentsFormData,
//   soleProprietorAttachmentsFormData,
// } from '@/utils/onboardingForms/attachments';
import CorporateFileInput from '../UI/Inputs/CorporateFileInput';
// import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';
// import DropdownInput from '../UI/Inputs/DropdownInput';
// import ImageInput from "../UI/Inputs/ImageInput";
// import Input from '../UI/Inputs/Input';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import C5soleAttachmentFormSchema from './validations/attachmentForm/c5SoleAttachmentsForm';
import C10soleAttachmentFormSchema from './validations/attachmentForm/c10SoleAttachmentForm';
import partnershipAttachmentsFormSchema from './validations/attachmentForm/partnershipAttachmentsForm';
import pnpAttachmentsFormSchema from './validations/attachmentForm/pnpAttachmentsForm';
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
    limitCategory: any;
    natureOfBusiness: any;
    page: PageItem[];
  };
}

const Attachments = () => {
  // const fieldsData = useAppSelector((state: any) => state.fields);
  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const [apierror, setApierror] = useState('');
  const userData = useAppSelector((state: any) => state.auth);
  const fieldData = useAppSelector(
    (state: { fields: FieldsData }) => state.fields,
  );
  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  // const dispatch = useAppDispatch();

  console.log('fieldData1', fieldData);
  // const formData = useAppSelector((state: any) => state.onBoardingForms);
  const formData = new FormData();
  console.log('FORM DATA ', formData);

  //  const [selectedCheckValue, setSelectedCheckValue] = useState();
  // const [selectedCheckValue, setSelectedCheckValue] = useState<
  //   string | undefined | string[]
  // >(undefined);

  const businessNature = fieldData?.pages?.natureOfBusiness;
  const limitCategory = fieldData?.pages?.limitCategory;
  // const [isChecked, setIsChecked] = useState(false);
  // const [navRoute, setNavRoute] = useState('');
  console.log('userdatais', userData);
  // const { apiSecret } = userData;
  // const dispatch = useAppDispatch();
  // console.log('selected value checkbox input: ', selectedCheckValue);

  // const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File[] | null>>(
    Array(5).fill(null),
  );

  // const soleProprietorAttachmentsFormData = {
  //   pageName: 'Attachments',
  //   categories: [
  //     {
  //       categoryName: 'Upload Documents(What would you like to integrate)',
  //       fields: [
  //         {
  //           label: 'CNIC Front',
  //           name: 'cnicFront',
  //           type: 'file',
  //           required: true,
  //         },
  //         {
  //           label: 'CNIC Back',
  //           name: 'cnicBack',
  //           type: 'file',
  //           required: true,
  //         },
  //         {
  //           label: 'Selfie',
  //           name: 'selfie',
  //           type: 'file',
  //           required: true,
  //         },
  //         {
  //           label: 'Certificate',
  //           name: 'certificate',
  //           type: 'file',
  //           required: true,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const router = useRouter();
  const [attachmentData, setAttachmentData] = useState<any[]>();
  // const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log(filteredData, 'filtered data from attachmentsssssssssss');

  useEffect(() => {
    console.log(initialValuesState, 'initial values');
    console.log(validationSchemaState, 'validationSchemaState');
  }, [initialValuesState, validationSchemaState]);

  useEffect(() => {
    if (
      businessNature === 'soleProprietor' &&
      limitCategory === 'C5(limit of max 500k)'
    ) {
      setValidationSchemaState(C5soleAttachmentFormSchema);
      setAttachmentData(C5soleProprietorAttachmentsFormData?.categories);
    } else if (
      businessNature === 'soleProprietor' &&
      limitCategory === 'C10 (limit above than 500k)'
    ) {
      setValidationSchemaState(C10soleAttachmentFormSchema);
      setAttachmentData(C10soleProprietorAttachmentsFormData?.categories);
    } else if (businessNature === 'partnership') {
      setValidationSchemaState(partnershipAttachmentsFormSchema);
      setAttachmentData(partnershipAttachmentsFormData?.categories);
    } else if (businessNature === 'publicAndPrivateLtd') {
      setValidationSchemaState(pnpAttachmentsFormSchema);
      setAttachmentData(pnpAttachmentsFormData?.categories);
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

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    let schemaFields: {
      [x: string]:
        | Yup.Reference<unknown>
        | Yup.ISchema<any, Yup.AnyObject, any, any>;
    };

    if (
      businessNature === 'soleProprietor' &&
      limitCategory === 'C5(limit of max 500k)'
    ) {
      // Access internal schema fields safely
      schemaFields = (C5soleAttachmentFormSchema as Yup.ObjectSchema<any>)
        .fields;
    } else if (
      businessNature === 'soleProprietor' &&
      limitCategory === 'C10 (limit above than 500k)'
    ) {
      // Access internal schema fields safely
      schemaFields = (C10soleAttachmentFormSchema as Yup.ObjectSchema<any>)
        .fields;
    } else if (businessNature === 'partnership') {
      // Access internal schema fields safely
      schemaFields = (partnershipAttachmentsFormSchema as Yup.ObjectSchema<any>)
        .fields;
    } else if (businessNature === 'publicAndPrivateLtd') {
      // Access internal schema fields safely
      schemaFields = (pnpAttachmentsFormSchema as Yup.ObjectSchema<any>).fields;
    }

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
          const matchingCategory = attachmentData?.find(
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
  console.log('filtered data', filteredData);

  if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  console.log('attachments data', attachmentData);

  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    console.log('values', values);
    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');
      if (currentIndex === 4) {
        // tested running code without labels
        // Object.keys(values).forEach((key) => {
        //   if (values[key]) {
        //     formData.append('files', values[key]);
        //   }
        // });
        // Log filteredData to check its structure
        console.log('filteredData:', filteredData);

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
          const label = filteredData[0].categories
            ?.flatMap((category: any) => category.fields)
            ?.find((field: any) => field?.name === key)?.label;
          if (label && Array.isArray(value)) {
            console.log('LABEL ', label);

            value.forEach((file: any) => {
              console.log('file is', file);
              formData.append(label, file); // Use the label here
              console.log('File appended to formData:', formData);
            });
          }
        });

        // formData.append('status', 'Completed');
        console.log('FORM DATAA', formData);
        console.log('userData?.email', userData?.email);

        try {
          const response: any = await apiClient.post(
            `/merchant/saveMerchantDocuments`,
            formData,
            {
              params: {
                merchantEmail: userData?.email,
                status: 'Completed',
                requestRevision: 'Completed',
                requestRevisionStatus: 'Completed',
              },
              headers: { Authorization: `Bearer ${userData.jwt}` },
            },
          );
          console.log(response, 'Attachments');
          if (response?.data?.responseCode === '009') {
            // Navigate to the next tab after successful submission
            const nextTab = endpointArray[currentIndex + 1]?.tab;
            if (nextTab) {
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              router.push(`/merchant/home/request-revision/review-form`);
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
          // return;
        } catch (e: any) {
          console.log('Error in submitting dynamic form', e);
          setTitle('Network Failed');
          setDescription('Network failed! Please try again later.');
          setShowModal(true);
        } finally {
          setSubmitting(false);
        }
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
        // routeName={navRoute}
      />

      {/* Formik Form for handling form state and submission */}
      <Formik
        enableReinitialize
        initialValues={initialValuesState}
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
              {filteredData?.length > 0 ? (
                filteredData?.map((pageItem: any) => {
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
                                          type: string;
                                          label: string;
                                          name: string;
                                          placeholder: any;
                                          validation: {
                                            errorMessage: string | string[];
                                            options: unknown;
                                          };
                                          required: any;
                                          options: {
                                            label: string;
                                            value: string;
                                          }[];
                                        },
                                        fieldIndex: any,
                                      ) => {
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
                                          <p key={fieldIndex}>
                                            nothing to show
                                          </p>
                                        );
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
              <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                {apierror}
              </div>

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

export default Attachments;
