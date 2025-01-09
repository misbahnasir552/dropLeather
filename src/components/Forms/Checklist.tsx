'use client';

import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
// import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import { CheckListIcon } from '@/components/Timeline/CorporateTimeline/TimelineIcons/TimelineIcons';
import Button from '@/components/UI/Button/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setCorporateChecklistStatus } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';

import CheckBoxImageInput from '../UI/Inputs/CheckBoxImageInput';
// import DropdownInput from '../UI/Inputs/DropdownInput';
// import Input from '../UI/Inputs/Input';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/helper';
import type { FieldsData } from './validations/types';

const Checklist = () => {
  const dispatch = useAppDispatch();
  const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);
  const formData = useAppSelector((state) => state.onBoardingForms);

  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [checklistData, setChecklistData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  console.log(validationSchemaState);

  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | string[] | undefined
  >();

  console.log(selectedCheckValue);

  const router = useRouter();
  // const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      const fData = fieldsData.pages?.page.filter((item: any) => {
        if (item.name === 'Documents' && currentTab === 'attachments') {
          return convertSlugToTitle(item.name);
        }
        if (
          item.name === 'Corporate Sole Sample Attachments' &&
          currentTab === 'checklist'
        ) {
          return convertSlugToTitle(item.name);
        }

        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);

      if (formData?.businessNature === 'soleProprietor') {
        setChecklistData([
          'Beneficial Owner Certificate - for Corporate and Sole Owner Accounts - R....pdf',
          'CDD FORM.xls',
          'Corporate Acc Request Letter.doc',
          'CRS Entity (Organization).pdf',
          'CRS Individual tax residency self – certification.pdf',
          'FATCA-W8Ben (E).pdf',
          'fw8ben.pdf',
          'KYC form.pdf',
          'OPERATING AUTHORITY.doc',
          'Undertaking.docx',
        ]);
      } else {
        setChecklistData([
          'Beneficial Owner Certificate - for Corporate and Sole Owner Accounts.pdf',
          'BOR Sample.docx',
          'Branchless BOR.docx',
          'CDD FORM.xls',
          'CRS Entity (Organization).pdf',
          'CRS Individual tax residency self – certification.pdf',
          'FATCA W9.pdf',
          'FATCA-W8Ben (E).pdf',
          'KYC form.pdf',
          'List of Director.docx',
          'Undertaking.docx',
        ]);
      }
      console.log('check DATA LIST ', checklistData);

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
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    values.checklistStatus = 'Completed';

    dispatch(setCorporateChecklistStatus(values?.checklistStatus));

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
        endpoint: `/corporate/saveCorporateDocuments/${userData.email}`,
      },
      {
        tab: 'attachments',
        endpoint: `/corporate/saveCorporateDocuments/${userData.email}`,
      },
    ];
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      try {
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

  console.log('FILTERED DATA CHECKLIST', checklistData, filteredData);

  return (
    <div>
      <Formik
        initialValues={initialValuesState}
        // validationSchema={validationSchemaState}
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
                  <FormLayoutDynamic
                    key="document-checklist"
                    heading="Document Checklist (Please download and fill the forms, and upload filled scanned copies.)"
                  >
                    {checklistData?.map((fileName: string, index: number) => (
                      <CheckBoxImageInput
                        key={fileName}
                        name={fileName}
                        error={'error'}
                        options={[
                          {
                            index,
                            value: fileName,
                            label: fileName,
                            logo: <CheckListIcon color={'#322C3C'} />,
                            email: userData?.email,
                          },
                        ]}
                        form={formik}
                        setSelectedCheckValue={setSelectedCheckValue}
                      />
                    ))}
                  </FormLayoutDynamic>

                  {/* {filteredData?.map(
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
                              heading={
                                'Document Checklist (Please download and fill the forms, and upload filled scanned copies.)'
                              }
                              // heading={item.categoryName}
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
                                      [x: string]: any;
                                      type?: any;
                                      label: any;
                                      name: any;
                                      value: any;
                                      validation?: any;
                                      file?: any;
                                      icon?: string | StaticImageData;
                                      logo?: string | StaticImageData;
                                      image?: string | StaticImageData;
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
                                        <CheckBoxImageInput
                                          key={field?.name}
                                          name={field?.label}
                                          error={'error'}
                                          options={[
                                            {
                                              index: fieldIndex,
                                              value: field?.name,
                                              label: field?.label,

                                              logo: (
                                                <CheckListIcon
                                                  color={'#322C3C'}
                                                />
                                              ),
                                              email: userData?.email,
                                            },
                                          ]}
                                          form={formik}
                                          setSelectedCheckValue={
                                            setSelectedCheckValue
                                          }
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
                  )} */}
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

export default Checklist;
