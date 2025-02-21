'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

// import * as Yup from 'yup';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo, BusinessFormInfo } from '@/interfaces/interface';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';
import CheckboxItem from '../UI/Inputs/CheckboxItem';
import DateInputNew from '../UI/Inputs/DateInputNew';
import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import AddStore from './AddStore';
// import { buildValidationSchema } from './validations/helper';
import type { FieldsData, Page } from './validations/types';

const BusinessInformation = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);
  const businessNatureData = useAppSelector(
    (state: any) => state.onBoardingForms,
  );

  const router = useRouter();
  const [isChecked, setChecked] = useState(false);

  const { apiSecret } = userData;
  const [filteredData, setFilteredData] = useState<Page[]>();
  const [addStoresValues, setAddStoresValues] = useState<AddStoreInfo[]>([]);

  const [pageTitle, setPageTitle] = useState('');
  // const [selectedCheckValue, setSelectedCheckValue] = useState();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [selectedDropDownValue, setSelectedDropDownValue] =
    useState<any>(undefined);
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(5).fill(null),
  );
  const [initialValuesState, setInitialValuesState] = useState<any>();
  // const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  // const [selectedAssociation, setSelectedAssociation] = useState<string | undefined>(undefined);
  // const BusinessInfoInitialValues = GetBusinessDetails();
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  console.log(
    'selected value checkbox input',
    selectedCheckValue,
    setAddStoresValues,
  );
  console.log('sel dropdown 222', selectedDropDownValue);

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    if (!currentTab) return;

    const title = convertSlugToTitle(currentTab);
    setPageTitle(title);

    let updatedFData = fieldsData?.pages?.page?.filter(
      (item) => convertSlugToTitle(item.name) === title,
    );

    // Find the category containing "associationToHighRiskBusiness"
    updatedFData = updatedFData?.map((item) => {
      return {
        ...item,
        categories: item.categories.map((category) => {
          const hasAssociationField = category.fields.some(
            (field) =>
              field.name === 'associationToHighRiskBusiness' &&
              field.type === 'dropDown',
          );

          if (!hasAssociationField) return category;

          let updatedFields = category.fields;

          if (selectedDropDownValue === 'High Risk Business / Person') {
            updatedFields = category.fields.filter(
              (field) =>
                field.name !== 'lowRiskType' && field.name !== 'mediumRiskType',
            );
          } else if (
            selectedDropDownValue === 'Medium Risk Business / Person'
          ) {
            updatedFields = category.fields.filter(
              (field) =>
                field.name !== 'lowRiskType' && field.name !== 'highRiskType',
            );
          } else if (selectedDropDownValue === 'Low Risk Business / Person') {
            updatedFields = category.fields.filter(
              (field) =>
                field.name !== 'mediumRiskType' &&
                field.name !== 'highRiskType',
            );
          }

          return {
            ...category,
            fields: updatedFields,
          };
        }),
      };
    });

    setFilteredData(updatedFData);

    console.log('fdata', updatedFData);

    updatedFData?.forEach((item) => {
      // if (item.name === "Activity Information") {
      item.categories.forEach((category) => {
        category.fields.forEach((field) => {
          if (field?.type === 'checkItem') {
            return;
          }
          initialValues[field.name] = '';
          initialValues[field.name] = [
            'natureOfActivity',
            'businessMode',
            'paymentModes',
          ].includes(field.name)
            ? []
            : '';
        });
      });
      setInitialValuesState(initialValues);
      // const validationSchema = buildValidationSchema(updatedFData);

      // setValidationSchemaState(validationSchema);
      // }
    });
  }, [currentTab, selectedDropDownValue]);

  if (!initialValuesState || !filteredData) {
    // if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (values: BusinessFormInfo, { setSubmitting }: any) => {
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );
    console.log('values >>>', values, addStoresValues);

    console.log('BUSINESS NATURE DATAAA:', businessNatureData);

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const dynamicCurrentEndpoint = `${currentEndpoint}${businessNatureData.businessNature.businessEndpoint}`;
      // const dynamicCurrentEndpoint = `${currentEndpoint}`;
      const additionalValues = {
        ...values,
        // stores: addStoresValues,
        managerMobile: userData?.managerMobile,
        businessNature: businessNatureData?.businessTypeNature,
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
                username: userData?.email,
              },
              headers: { Authorization: `Bearer ${userData.jwt}` },
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
            setTitle('Error Occured');
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
          }
        }
      } catch (e: any) {
        setApierror(e.message);
        // console.log('Error in submitting dynamic form', e);
        // setTitle('Network Failed');
        // setDescription('Network failed! Please try again later.');
        // setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };
  // console.log(checkboxData);
  return (
    <div className="flex flex-col gap-5">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={attachRoute}
        // routeName="/merchant/home"
      />
      {/* <AddStore
        addStoresValues={addStoresValues}
        setAddStoresValues={setAddStoresValues}
      /> */}
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
                  {filteredData?.map(
                    (pageItem) => (
                      // pageItem.name === "Business Details" && (
                      <React.Fragment key={pageItem.name}>
                        {pageItem.categories
                          .sort(
                            (a: any, b: any) =>
                              Number(a.priority) - Number(b.priority),
                          )
                          .map((item, itemIndex) => (
                            <FormLayoutDynamic
                              // key={itemIndex}
                              key={`${itemIndex}-${pageItem.name}-${item.categoryName}`}
                              heading={item.categoryName}
                            >
                              {[...item.fields]
                                .sort((a, b) => a.priority - b.priority)
                                .map((field, fieldIndex) => {
                                  return field?.type === 'text' ? (
                                    <Input
                                      key={fieldIndex}
                                      label={field.label}
                                      name={field.name}
                                      type={field.type}
                                      error={field.validation.errorMessage}
                                    />
                                  ) : field?.type === 'dropDown' &&
                                    field.name !==
                                      'associationToHighRiskBusiness' &&
                                    field.name !== 'highRiskType' &&
                                    field.name !== 'mediumRiskType' &&
                                    field.name !== 'lowRiskType' ? (
                                    <DropdownNew
                                      key={fieldIndex} // Add a key prop to DropdownInput as well
                                      label={field.label}
                                      name={field.name}
                                      options={field.validation?.options?.map(
                                        (option: string) => ({
                                          label: option,
                                          value: option,
                                          // .toLowerCase()
                                          // .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      formik={formik}
                                      error={field.validation.errorMessage}
                                      setSelectedDropDownValue={
                                        setSelectedDropDownValue
                                      }
                                    />
                                  ) : field?.type === 'dropDown' &&
                                    field.name ===
                                      'associationToHighRiskBusiness' ? (
                                    <DropdownNew
                                      key={fieldIndex}
                                      label={field.label}
                                      name={field.name}
                                      options={field.validation?.options?.map(
                                        (option: string) => ({
                                          label: option,
                                          value: option
                                            .toLowerCase()
                                            .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      formik={formik}
                                      error={field.validation.errorMessage}
                                      setSelectedDropDownValue={(
                                        value: string,
                                      ) => {
                                        // setSelectedAssociation(value);
                                        setSelectedDropDownValue(value);
                                      }}
                                    />
                                  ) : field?.type === 'dropDown' &&
                                    field.name === 'highRiskType' &&
                                    selectedDropDownValue ===
                                      'High Risk Business / Person' ? (
                                    <DropdownNew
                                      key={fieldIndex}
                                      label={field.label}
                                      name={field.name}
                                      options={field.validation?.options?.map(
                                        (option: string) => ({
                                          label: option,
                                          value: option
                                            .toLowerCase()
                                            .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      formik={formik}
                                      error={field.validation.errorMessage}
                                      setSelectedDropDownValue={
                                        setSelectedDropDownValue
                                      }
                                    />
                                  ) : field?.type === 'dropDown' &&
                                    field.name === 'mediumRiskType' &&
                                    selectedDropDownValue ===
                                      'Medium Risk Business / Person' ? (
                                    <DropdownNew
                                      key={fieldIndex}
                                      label={field.label}
                                      name={field.name}
                                      options={field.validation?.options?.map(
                                        (option: string) => ({
                                          label: option,
                                          value: option
                                            .toLowerCase()
                                            .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      formik={formik}
                                      error={field.validation.errorMessage}
                                      setSelectedDropDownValue={
                                        setSelectedDropDownValue
                                      }
                                    />
                                  ) : field?.type === 'dropDown' &&
                                    field.name === 'lowRiskType' &&
                                    selectedDropDownValue ===
                                      'Low Risk Business / Person' ? (
                                    <DropdownNew
                                      key={fieldIndex}
                                      label={field.label}
                                      name={field.name}
                                      options={field.validation?.options?.map(
                                        (option: string) => ({
                                          label: option,
                                          value: option
                                            .toLowerCase()
                                            .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      formik={formik}
                                      error={field.validation.errorMessage}
                                      setSelectedDropDownValue={
                                        setSelectedDropDownValue
                                      }
                                    />
                                  ) : field?.type === 'date' ? (
                                    <DateInputNew
                                      formik={formik}
                                      label={field.label}
                                      name={field.name}
                                    />
                                  ) : field?.type === 'checkItem' ? (
                                    <CheckboxItem
                                      description={field.label}
                                      isChecked={isChecked}
                                      handleCheckboxChange={
                                        handleCheckboxChange
                                      }
                                    />
                                  ) : field?.type === 'checkBoxInput' ? (
                                    <CheckboxInput
                                      isMulti={false}
                                      name={field.name}
                                      options={field.validation.options?.map(
                                        (option) => ({
                                          label: option,
                                          value: option,
                                          // value: option
                                          //   .toLowerCase()
                                          //   .replace(/\s+/g, ''),
                                        }),
                                      )}
                                      error={field.validation.errorMessage}
                                      form={formik}
                                      setSelectedCheckValue={
                                        setSelectedCheckValue
                                      }
                                    />
                                  ) : field?.type === 'checkBoxInputMulti' ? (
                                    <div>
                                      <CheckboxInput
                                        layout="grid grid-cols-2 gap-4"
                                        isMulti={true}
                                        name={field.name}
                                        options={field.validation.options?.map(
                                          (option) => ({
                                            label: option,
                                            value: option,
                                            // value: option
                                            //   .toLowerCase()
                                            //   .replace(/\s+/g, ''),
                                          }),
                                        )}
                                        error={field.validation.errorMessage}
                                        form={formik}
                                        setSelectedCheckValue={
                                          setSelectedCheckValue
                                        }
                                      />
                                    </div>
                                  ) : field?.type === 'file' ? (
                                    <BulkRegisterInput
                                      key={field.name}
                                      selectedFiles={selectedFiles}
                                      setSelectedFiles={setSelectedFiles}
                                      index={fieldIndex}
                                      formik={formik}
                                      item={field}
                                    />
                                  ) : null;
                                  // (
                                  //   <p key={fieldIndex}>nothing to show</p>
                                  // );
                                })}
                            </FormLayoutDynamic>
                          ))}
                      </React.Fragment>
                    ),
                    // )
                  )}
                </div>
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  <Button
                    label={`Save & Continue Later`}
                    // onClickHandler={() =>
                    //   saveAndContinue(
                    //     formik.values,
                    //     formik.setSubmitting,
                    //     formik.validateForm,
                    //   )
                    // }
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
              {/* <FormControlButtons /> */}
              {/* <AddStore formik={formik}/> */}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BusinessInformation;
