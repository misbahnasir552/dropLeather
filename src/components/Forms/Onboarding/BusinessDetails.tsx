'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import apiClient from '@/api/apiClient';
import OvalLoading from '@/components/Loader/OvalLoading';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo } from '@/interfaces/interface';
import { setLimitCategory } from '@/redux/features/formSlices/onBoardingForms';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import { partnershipBusinessDetailsFormData } from '@/utils/onboardingForms/businessDetailsForms/partnershipBusinessDetails';
import { pnpLtdBusinessDetailsFormData } from '@/utils/onboardingForms/businessDetailsForms/pnpLtdBusinessDetails';
// import { BarLoader } from 'react-spinners';
import { soleBusinessDetailsFormData } from '@/utils/onboardingForms/businessDetailsForms/soleBusinessDetails';

import DateInputNew from '../../UI/Inputs/DateInputNew';
import DropdownNew from '../../UI/Inputs/DropDownNew';
import CustomModal from '../../UI/Modal/CustomModal';
import FormLayoutDynamic from '../../UI/Wrappers/FormLayoutDynamic';
import {
  partnershipBusinessDetailsFormInitialValues,
  partnershipBusinessDetailsFormSchema,
} from '../validations/businessDetailsForm/partnershipBusinessForm';
import {
  pnpLtdBusinessDetailsFormInitialValues,
  pnpLtdBusinessDetailsFormSchema,
} from '../validations/businessDetailsForm/pnpLtdBusinessForm';
import {
  soleBusinessDetailsFormInitialValues,
  soleBusinessDetailsFormSchema,
} from '../validations/businessDetailsForm/soleBusinessForm';

const BusinessInformation = () => {
  const [formData, setFormData] = useState(
    soleBusinessDetailsFormData.categories,
  );
  const userData = useAppSelector((state: any) => state.auth);
  const [businessDetailsData, setBusinessDetailsData] = useState<any[]>();
  // const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);
  const businessNatureData = useAppSelector(
    (state: any) => state.onBoardingForms,
  );
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  console.log('businessNatureData', businessNatureData, setFormData, formData);
  const router = useRouter();
  // const [isChecked, setChecked] = useState(false);

  const { apiSecret } = userData;
  const [filteredData, setFilteredData] = useState<any[]>();
  const [addStoresValues, setAddStoresValues] = useState<AddStoreInfo[]>([]);

  const [pageTitle, setPageTitle] = useState('');
  // const [selectedCheckValue, setSelectedCheckValue] = useState();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [selectedDropDownValue, setSelectedDropDownValue] =
    useState<any>(undefined);
  const businessNature = useAppSelector(
    (state: any) => state.onBoardingForms.businessNature,
  );
  const { currentTab } = useCurrentTab();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  const [natureOfBusiness, setNatureOfBusiness] = useState([]);
  const [lowRiskType, setLowRiskType] = useState([]);
  const [mediumRiskType, setMediumRiskType] = useState([]);
  const [highRiskType, setHighRiskType] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('nature of business got', setDescription, setTitle);
  }, []);

  const dispatch = useDispatch();

  const getNatureOfBusiness = async () => {
    try {
      const response = await apiClient.get('merchant/getAllNatureOfBusiness');
      // if (response?.data?.responseCode === '009') {
      if (response?.data) {
        setNatureOfBusiness(response?.data); // Store regions data
        // console.log("categories are", storeCategories)

        console.log(
          'nature of business is',
          natureOfBusiness,
          selectedCheckValue,
          setPageTitle,
          setAddStoresValues,
        );
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getRiskTypes = async () => {
    try {
      const response = await apiClient.get('merchant/getAllLowRiskType');
      if (response?.data) {
        setLowRiskType(response?.data);
        // setNatureOfBusiness(response?.data); // Store regions data
        // console.log("categories are", storeCategories)
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }

    try {
      const response = await apiClient.get('merchant/getAllHighRiskType');
      if (response?.data) {
        setHighRiskType(response?.data);
        // setNatureOfBusiness(response?.data); // Store regions data
        // console.log("categories are", storeCategories)
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }
    try {
      const response = await apiClient.get('merchant/getAllMediumRiskType');
      if (response?.data) {
        setMediumRiskType(response?.data);
        // setNatureOfBusiness(response?.data); // Store regions data
        // console.log("categories are", storeCategories)
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    if (businessNature?.businessNature === 'soleProprietor') {
      setBusinessDetailsData(soleBusinessDetailsFormData?.categories);
      setInitialValuesState(soleBusinessDetailsFormInitialValues);
      setValidationSchemaState(soleBusinessDetailsFormSchema);
    } else if (businessNature?.businessNature === 'partnership') {
      setInitialValuesState(partnershipBusinessDetailsFormInitialValues);
      setValidationSchemaState(partnershipBusinessDetailsFormSchema);
      setBusinessDetailsData(partnershipBusinessDetailsFormData?.categories);
    } else if (businessNature?.businessNature === 'publicAndPrivateLtd') {
      setInitialValuesState(pnpLtdBusinessDetailsFormInitialValues);
      setValidationSchemaState(pnpLtdBusinessDetailsFormSchema);
      setBusinessDetailsData(pnpLtdBusinessDetailsFormData?.categories);
    } else {
      setBusinessDetailsData([]); // Set a default empty state to avoid undefined errors
    }
  }, [businessNature]);

  useEffect(() => {
    console.log('selected drop', selectedDropDownValue, selectedCheckValue);
  }, [selectedDropDownValue]);
  useEffect(() => {
    getNatureOfBusiness();
    getRiskTypes();
    console.log('hereeeeeeeeeeeeeeeee', selectedDropDownValue);
    console.log('business details data', businessDetailsData);
    const updatedFormData = businessDetailsData?.map((category) => {
      // const hasAssociationField = category.fields.some(
      //   (field: any) =>
      //     field.name === 'associationToHighRiskBusiness' &&
      //     field.type === 'dropdown',
      // );

      // if (!hasAssociationField) return category;

      let updatedFields = category.fields;
      console.log('updated fields', updatedFields.name);
      updatedFields.forEach((field: any) => {
        if (field.name === 'natureofBusiness') {
          console.log('Found natureOfBusiness:');
          field.options = natureOfBusiness;
          // Perform your action here
        } else if (field.name === 'lowRiskType') {
          field.options = lowRiskType;
        } else if (field.name === 'mediumRiskType') {
          field.options = mediumRiskType;
        } else if (field.name === 'highRiskType') {
          field.options = highRiskType;
        }
        // else if (field.name === "incomeStatusSalaried" && selectedDropDownValue==='No') {
        //   updatedFields = category.fields.filter(
        //     (field: any) =>
        //       field.name === 'currentSalaryIncome',
        //   );
        // }
      });
      if (selectedDropDownValue === 'High Risk Business / Person') {
        updatedFields = category.fields.filter(
          (field: any) =>
            field.name !== 'lowRiskType' && field.name !== 'mediumRiskType',
        );
      }

      if (selectedDropDownValue === 'No') {
        updatedFields = category.fields.filter(
          (field: any) => field.name !== 'currentSalaryIncome',
        );
      } else if (selectedDropDownValue === 'Medium Risk Business / Person') {
        updatedFields = category.fields.filter(
          (field: any) =>
            field.name !== 'lowRiskType' && field.name !== 'highRiskType',
        );
      } else if (selectedDropDownValue === 'Low Risk Business / Person') {
        updatedFields = category.fields.filter(
          (field: any) =>
            field.name !== 'mediumRiskType' && field.name !== 'highRiskType',
        );
      } else if (
        selectedDropDownValue === 'No' ||
        selectedDropDownValue === '' ||
        selectedDropDownValue === undefined
      ) {
        console.log('in no');
        updatedFields = category.fields.filter(
          (field: any) =>
            // field.name !== 'mediumRiskType' &&
            // field.name !== 'highRiskType' &&
            // field.name !== 'lowRiskType',
            field.name !== 'mediumRiskType' &&
            field.name !== 'highRiskType' &&
            field.name !== 'lowRiskType' &&
            field.name !== 'currentSalaryIncome',
        );
      }

      return {
        ...category,
        fields: updatedFields,
      };
    });

    setFilteredData(updatedFormData);

    // if (currentTab) {
    //   const title = convertSlugToTitle(currentTab);
    //   setPageTitle(title);
    //   console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
    // }

    // if (!currentTab) return;

    // const title = convertSlugToTitle(currentTab);
    // setPageTitle(title);

    // const updatedFormData = businessDetailsData?.map((category) => {
    //   const hasAssociationField = category.fields.some(
    //     (field: any) =>
    //       field.name === 'associationToHighRiskBusiness' &&
    //       field.type === 'dropdown',
    //   );

    //   if (!hasAssociationField) return category;

    //   let updatedFields = category.fields;

    //   if (selectedDropDownValue === 'High Risk Business / Person') {
    //     updatedFields = category.fields.filter(
    //       (field: any) =>
    //         field.name !== 'lowRiskType' && field.name !== 'mediumRiskType',
    //     );
    //   } else if (selectedDropDownValue === 'Medium Risk Business / Person') {
    //     updatedFields = category.fields.filter(
    //       (field: any) =>
    //         field.name !== 'lowRiskType' && field.name !== 'highRiskType',
    //     );
    //   } else if (selectedDropDownValue === 'Low Risk Business / Person') {
    //     updatedFields = category.fields.filter(
    //       (field: any) =>
    //         field.name !== 'mediumRiskType' && field.name !== 'highRiskType',
    //     );
    //   } else if (
    //     selectedDropDownValue === 'No' ||
    //     selectedDropDownValue === '' ||
    //     selectedDropDownValue === undefined
    //   ) {
    //     updatedFields = category.fields.filter(
    //       (field: any) =>
    //         field.name !== 'mediumRiskType' &&
    //         field.name !== 'highRiskType' &&
    //         field.name !== 'lowRiskType',
    //     );
    //   }

    //   return {
    //     ...category,
    //     fields: updatedFields,
    //   };
    // });

    // setFilteredData(updatedFormData);

    // console.log('filtered data is ', filteredData);
  }, [selectedDropDownValue, businessDetailsData, natureOfBusiness.length]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    // const onSubmit = async (values: BusinessFormInfo, { setSubmitting }: any) => {
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );
    console.log('values >>>', values, addStoresValues);

    console.log('BUSINESS NATURE DATAAA:', businessNatureData);

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      console.log('currentEndpoint', currentEndpoint);
      console.log('businessNatureData', businessNatureData);

      // const transformedData = {
      //   managerMobile: userData.managerMobile,
      //   businessNature: businessNatureData?.businessTypeNature,
      //   status: 'Completed',
      //   page: {
      //     pageName: 'Business Details',
      //     categories: soleBusinessDetailsFormData.categories.map(
      //       (category) => ({
      //         categoryName: category.categoryName,
      //         data: category.fields.map((field) => ({
      //           label: field.label,
      //           value:
      //             field.type === 'checkBoxInputMulti' ? '' : values[field.name], // Fetching value from formik.values
      //           ...(field.type === 'checkboxInput' ||
      //           field.type === 'checkBoxInputMulti'
      //             ? { options: values[field.name] || '' }
      //             : {}), // Add options only if it's a checkbox
      //         })),
      //       }),
      //     ),
      //   },
      // };

      const transformedData = {
        managerMobile: userData.managerMobile,
        businessNature: businessNatureData?.businessTypeNature,
        status: 'Completed',
        page: {
          pageName: 'Business Details',
          categories: (businessNature?.businessNature === 'soleProprietor'
            ? soleBusinessDetailsFormData?.categories ?? []
            : businessNature?.businessNature === 'partnership'
            ? partnershipBusinessDetailsFormData?.categories ?? []
            : businessNature?.businessNature === 'publicAndPrivateLtd'
            ? pnpLtdBusinessDetailsFormData?.categories ?? []
            : []
          ).map((category) => ({
            categoryName: category.categoryName,
            data: category.fields.map((field) => ({
              label: field.label,
              value:
                field.type === 'checkBoxInputMulti' ? '' : values[field.name],
              ...(field.type === 'checkboxInput' ||
              field.type === 'checkBoxInputMulti'
                ? { options: values[field.name] || '' }
                : {}),
            })),
          })),
        },
      };

      const mdRequest = {
        ...transformedData,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);
      console.log('Signature', md5Hash);
      setLoading(true);
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            currentEndpoint,

            {
              request: transformedData,
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
            dispatch(setLimitCategory(values.limitCategory));
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
          // else {
          //   setTitle('Error Occured');
          //   setDescription(response?.data?.responseDescription);
          //   setShowModal(true);
          // }
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
  // console.log(checkboxData);
  return (
    <div className="flex flex-col gap-5">
      {loading && <OvalLoading />}
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
      {initialValuesState && validationSchemaState ? (
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
                    {filteredData?.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                        <FormLayoutDynamic
                          key={item}
                          heading={item.categoryName}
                        >
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
                                setSelectedDropDownValue={
                                  setSelectedDropDownValue
                                }
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
                  </div>
                  <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                    {apierror}
                  </div>
                  <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                    {/* <Button
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
                    /> */}
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
      ) : null}
    </div>
  );
};

export default BusinessInformation;
