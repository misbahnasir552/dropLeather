'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
// import { BarLoader } from 'react-spinners';
import * as Yup from 'yup';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import type { AddStoreInfo } from '@/interfaces/interface';
// import { setLogout } from '@/redux/features/authSlice';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';
import CheckboxItem from '../UI/Inputs/CheckboxItem';
// import DateInput from '../UI/Inputs/DateInput';
import DateInputNew from '../UI/Inputs/DateInputNew';
// import DateInputNew from '../UI/Inputs/DateInputNew';
// import DropdownInput from '../UI/Inputs/DropdownInput';
import DropdownNew from '../UI/Inputs/DropDownNew';
// import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { soleBusinessDetailsFormSchema } from './validations/businessDetailsForm/soleBusinessForm';
// import { partnershipBusinessDetailsFormData } from '@/utils/onboardingForms/businessDetailsForms/partnershipBusinessDetails';
// import { pnpLtdBusinessDetailsFormData } from '@/utils/onboardingForms/businessDetailsForms/pnpLtdBusinessDetails';
// import AddStore from './AddStore';
// import { buildValidationSchema } from './validations/helper';
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
    natureOfBusiness: any;
    page: PageItem[];
  };
}

// interface UserData {
//   managerMobile: string;
//   email: string;
//   apiSecret: string;
//   jwt: string;
// }

// interface InitialValues {
//   [key: string]: any;
// }

const BusinessInformationReqRevision = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);
  const businessNatureData = useAppSelector(
    (state: any) => state.onBoardingForms,
  );

  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  console.log('businessNatureData', businessNatureData);
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const { apiSecret } = userData;
  const [filteredData, setFilteredData] = useState<any[]>([]);
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
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  const [navRoute, setNavRoute] = useState('');
  const [natureOfBusiness, setNatureOfBusiness] = useState([]);
  const [lowRiskType, setLowRiskType] = useState([]);
  const [mediumRiskType, setMediumRiskType] = useState([]);
  const [highRiskType, setHighRiskType] = useState([]);
  // const [selectedAssociation, setSelectedAssociation] = useState<string | undefined>(undefined);
  // const BusinessInfoInitialValues = GetBusinessDetails();
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const businessNature = fieldsData?.pages?.natureOfBusiness;
  // console.log(
  //   'selected value checkbox input',
  //   selectedCheckValue,
  //   setAddStoresValues,
  // );
  console.log(addStoresValues);

  const BusinessDetailsFormData = {
    pageName: 'Business Details',
    categories: [
      {
        categoryName: 'Business Particulars',
        fields: [
          {
            name: 'accountBusinessDocumentationType',
            label: 'Account/Business Documentation Type',
            type: 'dropdown',
            options: [
              { label: 'Sole Proprietor', value: 'Sole Proprietor' },
              {
                label: 'Public and Private Ltd.',
                value: 'Public and Private Ltd.',
              },
              { label: 'Partnership', value: 'Partnership' },
              { label: 'Other', value: 'Other' },
              { label: 'Trusts', value: 'Trusts' },
              { label: 'Clubs,Societies', value: 'Clubs,Societies' },
              { label: 'NGO,NPO,Charities', value: 'NGO,NPO,Charities' },
            ],
            required: true,
          },
          {
            name: 'limitCategory',
            label: 'Limit Category',
            type: 'dropdown',
            options: [
              {
                label: 'C5 (limit of max 500k)',
                value: 'C5 (limit of max 500k)',
              },
              {
                label: 'C10 (limit above than 500k)',
                value: 'C10 (limit above than 500k)',
              },
            ],
            required: true,
          },
          {
            name: 'natureofBusiness',
            label: 'Nature of Business',
            type: 'dropdown',
            // options: [
            //   {
            //     label: 'C5 (limit of max 500k)',
            //     value: 'C5 (limit of max 500k)',
            //   },
            //   {
            //     label: 'C10 (limit above than 500k)',
            //     value: 'C10 (limit above than 500k)',
            //   },
            // ],
            required: true,
          },
          {
            name: 'raastEnabled',
            label: 'Raast Enabled',
            type: 'dropdown',
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
            required: true,
          },
          {
            name: 'Established Since',
            label: 'establishedSince',
            type: 'date',
            required: false,
          },
        ],
      },
      {
        categoryName: 'Business Mode',
        fields: [
          {
            name: 'businessMode',
            label: 'Business Mode',
            type: 'checkBoxInputMulti',
            required: true,
            options: [
              { label: 'Retail Payment', value: 'Retail Payment' },
              { label: 'Online Payment', value: 'Online Payment' },
            ],
          },
        ],
      },
      {
        categoryName: 'Payment Modes',
        fields: [
          {
            name: 'paymentModes',
            label: 'Payment Modes',
            type: 'checkBoxInputMulti',
            required: true,
            options: [
              { label: 'Mobile Account', value: 'Mobile Account' },
              { label: 'Easypaisa shop', value: 'Easypaisa shop' },
              { label: 'QR', value: 'QR' },
              { label: 'TILL', value: 'TILL' },
              { label: 'Direct Debit', value: 'Direct Debit' },
              { label: 'Debit/Credit Card', value: 'Debit/Credit Card' },
            ],
          },
        ],
      },
      {
        categoryName: 'Business Type Details',
        fields: [
          {
            name: 'permanentAddress',
            label: 'Permanent Address',
            type: 'text',
            required: false,
          },
          {
            name: 'fatcaStatus',
            label: 'FATCA Status',
            type: 'text',
            required: false,
          },
          {
            name: 'crsStatus',
            label: 'CRS status',
            type: 'text',
            required: false,
          },
          {
            name: 'mandateName',
            label: 'Mandate Name',
            type: 'text',
            required: false,
          },
          {
            name: 'mandateIdCardNumber',
            label: 'Mandate Id Card Number',
            type: 'text',
            required: false,
          },
          {
            name: 'mandateRelationshipWithAccountHolder',
            label: 'Mandate relationship with account holder',
            type: 'text',
            required: false,
          },
          {
            name: 'dateOfIssuanceOfApplicableIdentityDocument',
            label: 'Date of issuance of applicable identity document',
            type: 'date',
            required: false,
          },
          {
            name: 'beneficialOwnerControllingRights',
            label: 'Beneficial Owner/Controlling Rights',
            type: 'text',
            required: false,
          },
          {
            name: 'mandateDateOfBirth',
            label: 'Mandate Date of Birth',
            type: 'text',
            required: false,
          },
          {
            name: 'mandatePlaceOfBirth',
            label: 'Mandate Place of Birth',
            type: 'text',
            required: false,
          },
          {
            name: 'cityAndCountry',
            label: 'City and Country',
            type: 'text',
            required: false,
          },
          {
            name: 'nextOfKinCnic',
            label: 'Next of KIN CNIC',
            type: 'text',
            required: true,
          },
          {
            name: 'nextOfKinRelationship',
            label: 'Next of KIN Relationship',
            type: 'text',
            required: true,
          },
          {
            name: 'nextOfKinName',
            label: 'Next of Kin Name',
            type: 'text',
            required: true,
          },
          {
            name: 'dateOfBirth',
            label: 'Date Of Birth',
            type: 'text',
            required: false,
          },
          {
            name: 'registerUnRegister',
            label: 'Register/UnRegister',
            type: 'text',
            required: true,
          },
          {
            name: 'specialCustomer',
            label: 'Special Customer',
            type: 'text',
            required: true,
          },
          {
            name: 'registrationIncorporationNo',
            label: 'Registration/Incorporation No',
            type: 'text',
            required: false,
          },
          {
            name: 'placeOfIncorporationOrRegistration',
            label: 'Place of Incorporation or Registration',
            type: 'text',
            required: false,
          },
          {
            name: 'geographiesInvolved',
            label: 'Geographies Involved',
            type: 'text',
            required: false,
          },
          {
            name: 'expectedTypeOfCounterParties',
            label: 'Expected Type of Counter-Parties',
            type: 'text',
            required: false,
          },
          {
            name: 'intendedNatureOfBusinessRelations',
            label: 'Intended nature of business relations',
            type: 'text',
            required: false,
          },
          {
            name: 'expectedModesOfTransactionsDeliveryChannels',
            label: 'Expected modes of transactions/ delivery channels',
            type: 'text',
            required: false,
          },
          {
            name: 'industrySegment',
            label: 'Industry/Segment',
            type: 'text',
            required: false,
          },
          {
            name: 'product',
            label: 'Product',
            type: 'dropdown',
            options: [
              { label: 'Cash', value: 'Cash' },
              { label: 'Loan', value: 'Loan' },
              { label: 'Deposit', value: 'Deposit' },
              { label: 'Bills Payment', value: 'Bills Payment' },
              {
                label: 'Foreign Inward Remittance',
                value: 'Foreign Inward Remittance',
              },
              { label: ' Branchless', value: ' Branchless' },
              { label: ' IBFT', value: ' IBFT' },
              { label: ' Online Transfer', value: ' Online Transfer' },
              { label: ' Other', value: ' Other' },
            ],
            required: true,
          },
          {
            name: 'nationality',
            label: 'Nationality',
            type: 'dropdown',
            options: [
              { label: 'Resident', value: 'Resident' },
              { label: 'Non-Resident', value: 'Non-Resident' },
            ],
            required: true,
          },
        ],
      },
      {
        categoryName: 'Nature of Activity',
        fields: [
          {
            name: 'natureOfActivity',
            label: 'Nature of Activity',
            type: 'checkBoxInputMulti',
            required: true,
            options: [
              {
                label: 'Payment to Suppliers/Vendors',
                value: 'Payment to Suppliers/Vendors',
              },
              {
                label: 'Receiving & Payments From / To Customers',
                value: 'Receiving & Payments From / To Customers',
              },
            ],
          },
        ],
      },
      {
        categoryName: 'Customer Details',
        fields: [
          {
            name: 'incomeStatusSalaried',
            label: 'Income Status (Salaried)',
            type: 'text',
            required: true,
          },
          {
            name: 'currentDailyTransactionPKR',
            label: 'Current Daily Transaction (PKR)',
            type: 'text',
            required: true,
          },
          {
            name: 'anyOtherDetails',
            label: 'Any Other Details',
            type: 'text',
            required: false,
          },
          {
            name: 'associationToHighRiskBusiness',
            label: 'Association to High Risk Business',
            type: 'dropdown',
            options: [
              {
                label: 'High Risk Business / Person',
                value: 'High Risk Business / Person',
              },
              {
                label: 'Medium Risk Business / Person',
                value: 'Medium Risk Business / Person',
              },
              {
                label: 'Low Risk Business / Person',
                value: '   Low Risk Business / Person',
              },
            ],
            required: true,
          },
          {
            name: 'highRiskType',
            label: 'High Risk Type',
            type: 'dropdown',
            // options: [{ label: 'High Risk Type', value: 'High Risk Type' }],
            required: true,
          },
          {
            name: 'mediumRiskType',
            label: 'Medium Risk Type',
            type: 'dropdown',
            // options: [{ label: 'Medium Risk Type', value: 'Medium Risk Type' }],
            required: true,
          },
          {
            name: 'lowRiskType',
            label: 'Low Risk Type',
            type: 'dropdown',
            // options: [{ label: 'Low Risk Type', value: 'Low Risk Type' }],
            required: true,
          },

          {
            name: 'sourceOfFunds',
            label: 'Source of Funds',
            type: 'text',
            required: true,
          },
          {
            name: 'currentMonthlyTransactionPKR',
            label: 'Current Monthly Transaction (PKR)',
            type: 'dropdown',
            required: true,
            options: [
              { label: '1000 - 24999', value: '1000 - 24999' },
              { label: '25000 - 49999', value: '25000 - 49999' },
              { label: '50000 - 74999', value: '50000 - 74999' },
              { label: '75000 - 99999', value: '75000 - 99999' },
              { label: '100000 and Above', value: '100000 and Above' },
            ],
          },

          // Sole Above
          // { label: 'Current Salar/Income', value: 'abc' },
        ],
      },
      {
        categoryName: 'Account Profile / Transaction Activity',
        fields: [
          {
            name: 'expectedMonthlyDebitTransactions',
            label: 'Expected monthly Debit turnover (No. of transactions)',
            type: 'text',
            required: true,
          },
          {
            name: 'expectedMonthlyDebitAmount',
            label: 'Expected monthly Debit turnover (amount)',
            type: 'text',
            required: true,
          },
          {
            name: 'expectedMonthlyCreditTransactions',
            label: 'Expected monthly credit turnover (No. of transactions)',
            type: 'text',
            required: true,
          },
          {
            name: 'expectedMonthlyCreditAmount',
            label: 'Expected monthly credit turnover (amount)',
            type: 'text',
            required: true,
          },
          {
            name: 'annualTurnoverCredit',
            label: 'Annual Turnover (Credit)',
            type: 'text',
            required: true,
          },
          {
            name: 'annualTurnoverDebit',
            label: 'Annual Turnover (Debit)',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    console.log(
      'dropdown value is',
      selectedDropDownValue,
      selectedCheckValue,
      setAddStoresValues,
    );
  }, [selectedDropDownValue]);

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
    getNatureOfBusiness();
    console.log('natureOf business updated', natureOfBusiness);
    getRiskTypes();
  }, [
    natureOfBusiness.length,
    highRiskType.length,
    lowRiskType.length,
    mediumRiskType.length,
  ]);

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};
    let schemaFields: {
      [x: string]:
        | Yup.Reference<unknown>
        | Yup.ISchema<any, Yup.AnyObject, any, any>;
    };

    if (businessNature === 'soleProprietor') {
      // Access internal schema fields safely
      schemaFields = (soleBusinessDetailsFormSchema as Yup.ObjectSchema<any>)
        .fields;
    }
    // } else if (businessNatureData?.businessNature === 'partnership') {
    //   // Access internal schema fields safely
    //   schemaFields = (partnershipBusinessDetailsFormData as Yup.ObjectSchema<any>).fields;
    // }
    // else if (businessNatureData?.businessNature === 'publicAndPrivateLtd') {
    //   // Access internal schema fields safely
    //   schemaFields = (pnpLtdBusinessDetailsFormData as Yup.ObjectSchema<any>).fields;
    // }

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

  useEffect(() => {
    if (!currentTab) return;

    const title = convertSlugToTitle(currentTab);
    setPageTitle(title);

    const initialValues: { [key: string]: any } = {};

    console.log('fieldsData', fieldsData);

    // Step 1: Filter based on page title
    let updatedFData = fieldsData?.pages?.page?.filter(
      (item) => convertSlugToTitle(item.pageName) === title,
    );

    // Step 2: Apply conditional filtering based on selectedDropDownValue
    updatedFData = updatedFData?.map((item) => {
      return {
        ...item,
        categories: item.categories.map((category) => {
          const hasAssociationField = category.fields.some(
            (field) =>
              field.name === 'associationToHighRiskBusiness' &&
              field.type === 'dropdown',
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
          } else if (
            selectedDropDownValue === 'No' ||
            selectedDropDownValue === '' ||
            selectedDropDownValue === undefined
          ) {
            updatedFields = category.fields.filter(
              (field) => field.name !== 'currentSalary',
            );
          }

          console.log('updated fields', updatedFields);
          return {
            ...category,
            fields: updatedFields,
          };
        }),
      };
    });

    console.log('Updated FData:', updatedFData);

    // Step 3: Apply your mapping logic to transform updatedFData
    const mappedData = updatedFData?.map((item) => {
      const mappedCategories = item.categories.map((filteredCategory) => {
        // Find matching category in ActivityInformationFormData
        const matchingCategory = BusinessDetailsFormData.categories.find(
          (category) => category.categoryName === filteredCategory.categoryName,
        );

        if (matchingCategory) {
          // Collect matched fields with full field info
          const matchedFields = filteredCategory.fields.map((fieldLabel) => {
            // Find full field info based on label
            const matchedField = matchingCategory.fields.find(
              (field: { label: any }) => field.label === fieldLabel,
            );

            if (matchedField) {
              if (matchedField.name === 'natureofBusiness') {
                console.log('banknames', natureOfBusiness);
                return {
                  ...matchedField,
                  options: natureOfBusiness, // Set the fetched regions as options for 'region'
                };
              }
              if (matchedField.name === 'highRiskType') {
                console.log('banknames', highRiskType);
                return {
                  ...matchedField,
                  options: highRiskType, // Set the fetched regions as options for 'region'
                };
              }
              if (matchedField.name === 'lowRiskType') {
                console.log('banknames', lowRiskType);
                return {
                  ...matchedField,
                  options: lowRiskType, // Set the fetched regions as options for 'region'
                };
              }
              if (matchedField.name === 'mediumRiskType') {
                console.log('banknames', mediumRiskType);
                return {
                  ...matchedField,
                  options: mediumRiskType, // Set the fetched regions as options for 'region'
                };
              }
              if (matchedField?.type !== 'checkItem') {
                initialValues[matchedField.name] = '';
              }

              return {
                name: matchedField.name,
                label: matchedField.label,
                type: matchedField.type,
                required: matchedField.required || false,
                options: matchedField.options || [],
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
        pageName: item.pageName,
        categories: mappedCategories.filter(Boolean), // Remove null categories
      };
    });

    console.log('Mapped Data:', mappedData);

    // Step 4: Set transformed data and initial values
    setFilteredData(mappedData || []);
    setInitialValuesState(initialValues);

    if (mappedData.length > 0) {
      const validationSchema =
        buildValidationSchemaFromMappedFields(mappedData);
      setValidationSchemaState(validationSchema);
    }
  }, [
    currentTab,
    selectedDropDownValue,
    natureOfBusiness.length,
    highRiskType.length,
    lowRiskType.length,
    mediumRiskType.length,
  ]);

  console.log('initialValuesState', initialValuesState);

  console.log('selectedDropDownValue', selectedDropDownValue);

  // if (!initialValuesState || !filteredData) {
  if (!initialValuesState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('Submitted form values:', values);

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'Current Index');

      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      // ✅ Extract valid page names from fieldData
      const validPages = fieldsData.pages.page.map((p) => p.pageName);

      const transformedData = {
        status: 'Completed',
        // businessNature,
        managerMobile: userData.managerMobile,
        page: {
          pageName: 'Business Details',
          categories: BusinessDetailsFormData.categories
            .map((category) => {
              const filteredFields = category.fields.filter((field) =>
                Object.keys(values).includes(field.name),
              );

              if (filteredFields.length === 0) return null; // Exclude empty categories

              return {
                categoryName: category.categoryName,
                data: filteredFields.map((field) => ({
                  label: field.label,
                  // value: values[field.name] || '', // Fetching value from formik.values
                  value:
                    field.type === 'checkBoxInputMulti'
                      ? ''
                      : values[field.name], // Fetching value from formik.values
                  ...(field.type === 'checkboxInput' ||
                  field.type === 'checkBoxInputMulti'
                    ? { options: values[field.name] || '' }
                    : {}), // Add options only if it's a checkbox
                })),
              };
            })
            .filter(Boolean), // Remove null categories
        },
      };

      const mdRequest = {
        ...transformedData,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);

      const requestBody = {
        request: transformedData,
        signature: md5Hash,
      };

      try {
        if (currentEndpoint) {
          const updatedEndpoint = `${currentEndpoint}?natureOfBusiness=${businessNature}&requestRevision=Completed`;
          let finalEndpoint = updatedEndpoint;

          if (isLastTab) {
            finalEndpoint += '&requestRevisionStatus=Completed';
            dispatch(setIsLastTab(false));
          } else {
            finalEndpoint += '&requestRevisionStatus=null';
          }
          console.log('finalEndpoint', finalEndpoint);
          const response = await apiClient.post(finalEndpoint, requestBody, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
              Username: userData?.email,
            },
          });

          if (response?.data?.responseCode === '009') {
            let nextIndex = currentIndex + 1;

            //  Ensure nextIndex is within bounds and valid
            while (
              nextIndex < endpointArray.length &&
              (!endpointArray[nextIndex]?.name ||
                !validPages.includes(endpointArray[nextIndex]?.name ?? ''))
            ) {
              nextIndex += 1;
            }

            console.log('next index', nextIndex, endpointArray[nextIndex]?.tab);
            // Ensure nextIndex is valid before accessing tab
            if (
              nextIndex < endpointArray.length &&
              endpointArray[nextIndex]?.tab
            ) {
              const nextTab = endpointArray[nextIndex]?.tab as string; // Type assertion ensures it's a string
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              router.push(`/merchant/home/request-revision/review-form`);
              console.log('Form submission completed.');
              // setTitle(response?.data?.responseMessage);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              // dispatch(setLogout());
              // setNavRoute('/login');
              // router.push('/login');
              // setTitle('Form submission completed.');
              // setDescription('Form submission completed.');
              // setShowModal(true);
              // router.push(`/merchant/home`);
            }
          } else {
            setTitle('Error Occurred');
            setApierror(response?.data?.responseDescription);
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
            setNavRoute('/merchant/home');
          }
        }
      } catch (e) {
        console.error('Error in submitting form:', e);
        setDescription('Network failed! Please try again later.');
        setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };
  console.log('Initial Values State:', initialValuesState);

  // console.log(checkboxData);
  return (
    <div className="flex flex-col gap-5">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={navRoute}
        // routeName="/merchant/home"
      />
      {/* <AddStore
      addStoresValues={addStoresValues}
      setAddStoresValues={setAddStoresValues}
    /> */}
      <Formik
        enableReinitialize
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
                  {filteredData?.map((pageItem) => (
                    <React.Fragment key={pageItem.pageName}>
                      {pageItem?.categories
                        ?.slice()
                        .sort(
                          (a: { priority: any }, b: { priority: any }) =>
                            Number(a.priority) - Number(b.priority),
                        )
                        .map(
                          (
                            item: { categoryName: any; fields: any },
                            itemIndex: any,
                          ) => (
                            <FormLayoutDynamic
                              key={`${pageItem.pageName}-${item.categoryName}-${itemIndex}`}
                              heading={item.categoryName}
                            >
                              {[...item.fields]
                                .sort((a, b) => a.priority - b.priority)
                                .map((field, fieldIndex) => {
                                  // Ensure a unique key by combining all dynamic variables
                                  const uniqueKey = `${pageItem.pageName}-${
                                    item.categoryName
                                  }-${field.name || fieldIndex}`;

                                  if (field?.type === 'text') {
                                    return (
                                      <Input
                                        key={uniqueKey}
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        asterik={field?.required || false}
                                      />
                                    );
                                  }

                                  if (field?.type === 'dropdown') {
                                    const dropdownKey = `${uniqueKey}-dropdown`;
                                    return (
                                      <DropdownNew
                                        key={dropdownKey}
                                        label={field.label}
                                        name={field.name}
                                        options={
                                          field?.options?.map(
                                            (option: {
                                              label: any;
                                              value: any;
                                            }) => ({
                                              label: option.label,
                                              value: option.value,
                                            }),
                                          ) || []
                                        }
                                        formik={formik}
                                        asterik={field?.required || false}
                                        setSelectedDropDownValue={(
                                          value: any,
                                        ) => {
                                          console.log(
                                            'Updating selectedDropDownValue:',
                                            value,
                                          );
                                          setSelectedDropDownValue(value);
                                        }}
                                      />
                                    );
                                  }

                                  if (field?.type === 'date') {
                                    return (
                                      <DateInputNew
                                        key={uniqueKey}
                                        formik={formik}
                                        label={field.label}
                                        name={field.name}
                                        asterik={field?.required || false}
                                      />
                                    );
                                  }

                                  if (field?.type === 'checkItem') {
                                    return (
                                      <CheckboxItem
                                        key={uniqueKey}
                                        description={field.label}
                                        isChecked={isChecked}
                                        handleCheckboxChange={
                                          handleCheckboxChange
                                        }
                                      />
                                    );
                                  }

                                  if (field?.type === 'checkBoxInput') {
                                    return (
                                      <CheckboxInput
                                        key={uniqueKey}
                                        isMulti={false}
                                        name={field.name}
                                        options={
                                          field?.options?.map(
                                            (option: {
                                              label: any;
                                              value: any;
                                            }) => ({
                                              label: option.label,
                                              value: option.value,
                                            }),
                                          ) || []
                                        }
                                        form={formik}
                                        setSelectedCheckValue={
                                          setSelectedCheckValue
                                        }
                                      />
                                    );
                                  }

                                  if (field?.type === 'checkBoxInputMulti') {
                                    return (
                                      <div key={uniqueKey}>
                                        <CheckboxInput
                                          layout="grid grid-cols-2 gap-4"
                                          isMulti={true}
                                          name={field.name}
                                          options={
                                            field?.options?.map(
                                              (option: any) => ({
                                                label: option.label,
                                                value: option.value,
                                              }),
                                            ) || []
                                          }
                                          form={formik}
                                          setSelectedCheckValue={
                                            setSelectedCheckValue
                                          }
                                        />
                                      </div>
                                    );
                                  }

                                  if (field?.type === 'file') {
                                    return (
                                      <BulkRegisterInput
                                        key={uniqueKey}
                                        selectedFiles={selectedFiles}
                                        setSelectedFiles={setSelectedFiles}
                                        index={fieldIndex}
                                        formik={formik}
                                        item={field}
                                      />
                                    );
                                  }

                                  // If no matching type, return null
                                  return null;
                                })}
                            </FormLayoutDynamic>
                          ),
                        )}
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

export default BusinessInformationReqRevision;
