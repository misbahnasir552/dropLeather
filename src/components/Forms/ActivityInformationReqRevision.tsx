'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import BarLoader from 'react-spinners/BarLoader';
import * as Yup from 'yup';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from "@/components/UI/Headings/H6";
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from "@/components/UI/Wrappers/FormLayout";
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import {
//   // ActivityFormInfoSchema,
//   GetActivityInfoDetails,
// } from "@/validations/merchant/onBoarding/activityInfo";
import useCurrentTab from '@/hooks/useCurrentTab';
// import { buildValidationSchema } from './validationsOLD/helper';
// import { setLogout } from '@/redux/features/authSlice';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { setActivityForm } from "@/redux/features/formSlices/onBoardingForms";
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';

import CheckboxInput from '../UI/Inputs/CheckboxInput';
import DisabledField from '../UI/Inputs/DisabledField';
import DropdownNew from '../UI/Inputs/DropDownNew';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import activityInformationFormSchema from './validations/activityInformationForm';
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
  desclaimer: string;
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

const ActivityInformationReqRevision = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const fieldData = useAppSelector(
    (state: { fields: FieldsData }) => state.fields,
  );
  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  const dispatch = useAppDispatch();

  console.log('fieldData1', fieldData);
  const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const { currentTab } = useCurrentTab();
  //  const [selectedCheckValue, setSelectedCheckValue] = useState();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);

  const businessNature = fieldData?.pages?.natureOfBusiness;
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [navRoute, setNavRoute] = useState('');
  console.log('userdatais', userData);
  const { apiSecret } = userData;
  const router = useRouter();
  // const dispatch = useAppDispatch();
  console.log('selected value checkbox input: ', selectedCheckValue);

  const ActivityInformationFormData = {
    pageName: 'Activity Information',
    categories: [
      {
        categoryName: "Merchant's Detail",
        fields: [
          {
            name: 'businessOwnerName',
            label: 'Signatory name as per CNIC',
            type: 'text',
            required: true,
          },
          {
            name: 'ownerOfCNIC',
            label: 'Signatory CNIC',
            type: 'text',
            required: true,
          },

          {
            name: 'fatherSpouseName',
            label: 'Father / Husband / Spouse Name',
            type: 'text',
            required: true,
            desclaimer: '( as per CNIC )',
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ],
          },

          {
            name: 'purposeOfAccount',
            label: 'Purpose of Account',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Retail Payments', value: 'Retail Payments' },
              // DO NOT REMOVE COMMENTED CODE
              // { label: 'Online Payment', value: 'Online Payment' },
              // { label: 'Retail Payments', value: 'Retail Payments' },
              // { label: 'Mini App', value: 'Mini App' },
            ],
          },

          {
            name: 'citizenship',
            label: 'Citizenship',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Afghanistan', value: 'Afghanistan' },
              { label: 'Albania', value: 'Albania' },
              { label: 'Algeria', value: 'Algeria' },
              { label: 'Andorra', value: 'Andorra' },
              { label: 'Angola', value: 'Angola' },
              { label: 'Argentina', value: 'Argentina' },
              { label: 'Armenia', value: 'Armenia' },
              { label: 'Australia', value: 'Australia' },
              { label: 'Austria', value: 'Austria' },
              { label: 'Azerbaijan', value: 'Azerbaijan' },
              { label: 'Bahamas', value: 'Bahamas' },
              { label: 'Bahrain', value: 'Bahrain' },
              { label: 'Bangladesh', value: 'Bangladesh' },
              { label: 'Barbados', value: 'Barbados' },
              { label: 'Belarus', value: 'Belarus' },
              { label: 'Belgium', value: 'Belgium' },
              { label: 'Belize', value: 'Belize' },
              { label: 'Benin', value: 'Benin' },
              { label: 'Bhutan', value: 'Bhutan' },
              { label: 'Bolivia', value: 'Bolivia' },
              {
                label: 'Bosnia and Herzegovina',
                value: 'Bosnia and Herzegovina',
              },
              { label: 'Botswana', value: 'Botswana' },
              { label: 'Brazil', value: 'Brazil' },
              { label: 'Brunei', value: 'Brunei' },
              { label: 'Bulgaria', value: 'Bulgaria' },
              { label: 'Burkina Faso', value: 'Burkina Faso' },
              { label: 'Burundi', value: 'Burundi' },
              { label: 'Cambodia', value: 'Cambodia' },
              { label: 'Cameroon', value: 'Cameroon' },
              { label: 'Canada', value: 'Canada' },
              { label: 'Cape Verde', value: 'Cape Verde' },
              {
                label: 'Central African Republic',
                value: 'Central African Republic',
              },
              { label: 'Chad', value: 'Chad' },
              { label: 'Chile', value: 'Chile' },
              { label: 'China', value: 'China' },
              { label: 'Colombia', value: 'Colombia' },
              { label: 'Comoros', value: 'Comoros' },
              { label: 'Cote dlovoire', value: 'Cote dlovoire' },
              { label: 'Costa Rica', value: 'Costa Rica' },
              { label: 'Croatia', value: 'Croatia' },
              { label: 'Cuba', value: 'Cuba' },
              { label: 'Cyprus', value: 'Cyprus' },
              { label: 'Czech Republic', value: 'Czech Republic' },
              { label: 'Czechia', value: 'Czechia' },
              { label: 'Denmark', value: 'Denmark' },
              { label: 'Djibouti', value: 'Djibouti' },
              { label: 'Dominica', value: 'Dominica' },
              { label: 'Dominican Republic', value: 'Dominican Republic' },
              { label: 'Ecuador', value: 'Ecuador' },
              { label: 'Egypt', value: 'Egypt' },
              { label: 'El Salvador', value: 'El Salvador' },
              { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
              { label: 'Eritrea', value: 'Eritrea' },
              { label: 'Estonia', value: 'Estonia' },
              { label: 'Eswatini', value: 'Eswatini' },
              { label: 'Ethiopia', value: 'Ethiopia' },
              { label: 'Fiji', value: 'Fiji' },
              { label: 'Finland', value: 'Finland' },
              { label: 'France', value: 'France' },
              { label: 'Gabon', value: 'Gabon' },
              { label: 'Gambia', value: 'Gambia' },
              { label: 'Georgia', value: 'Georgia' },
              { label: 'Germany', value: 'Germany' },
              { label: 'Ghana', value: 'Ghana' },
              { label: 'Greece', value: 'Greece' },
              { label: 'Grenada', value: 'Grenada' },
              { label: 'Guatemala', value: 'Guatemala' },
              { label: 'Guinea', value: 'Guinea' },
              { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
              { label: 'Guyana', value: 'Guyana' },
              { label: 'Haiti', value: 'Haiti' },
              { label: 'Honduras', value: 'Honduras' },
              { label: 'Hungary', value: 'Hungary' },
              { label: 'Iceland', value: 'Iceland' },
              { label: 'India', value: 'India' },
              { label: 'Indonesia', value: 'Indonesia' },
              { label: 'Iran', value: 'Iran' },
              { label: 'Iraq', value: 'Iraq' },
              { label: 'Ireland', value: 'Ireland' },
              { label: 'Israel', value: 'Israel' },
              { label: 'Italy', value: 'Italy' },
              { label: 'Jamaica', value: 'Jamaica' },
              { label: 'Japan', value: 'Japan' },
              { label: 'Jordan', value: 'Jordan' },
              { label: 'Kazakhstan', value: 'Kazakhstan' },
              { label: 'Kenya', value: 'Kenya' },
              { label: 'Kiribati', value: 'Kiribati' },
              { label: 'Kuwait', value: 'Kuwait' },
              { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
              { label: 'Laos', value: 'Laos' },
              { label: 'Latvia', value: 'Latvia' },
              { label: 'Lebanon', value: 'Lebanon' },
              { label: 'Lesotho', value: 'Lesotho' },
              { label: 'Liberia', value: 'Liberia' },
              { label: 'Libya', value: 'Libya' },
              { label: 'Liechtenstein', value: 'Liechtenstein' },
              { label: 'Lithuania', value: 'Lithuania' },
              { label: 'Luxembourg', value: 'Luxembourg' },
              { label: 'Madagascar', value: 'Madagascar' },
              { label: 'Malawi', value: 'Malawi' },
              { label: 'Malaysia', value: 'Malaysia' },
              { label: 'Maldives', value: 'Maldives' },
              { label: 'Mali', value: 'Mali' },
              { label: 'Malta', value: 'Malta' },
              { label: 'Mauritania', value: 'Mauritania' },
              { label: 'Mauritius', value: 'Mauritius' },
              { label: 'Mexico', value: 'Mexico' },
              { label: 'Moldova', value: 'Moldova' },
              { label: 'Monaco', value: 'Monaco' },
              { label: 'Mongolia', value: 'Mongolia' },
              { label: 'Montenegro', value: 'Montenegro' },
              { label: 'Morocco', value: 'Morocco' },
              { label: 'Mozambique', value: 'Mozambique' },
              { label: 'Myanmar', value: 'Myanmar' },
              { label: 'Namibia', value: 'Namibia' },
              { label: 'Nepal', value: 'Nepal' },
              { label: 'Netherlands', value: 'Netherlands' },
              { label: 'New Zealand', value: 'New Zealand' },
              { label: 'Nicaragua', value: 'Nicaragua' },
              { label: 'Niger', value: 'Niger' },
              { label: 'Nigeria', value: 'Nigeria' },
              { label: 'North Korea', value: 'North Korea' },
              { label: 'North Macedonia', value: 'North Macedonia' },
              { label: 'Norway', value: 'Norway' },
              { label: 'Oman', value: 'Oman' },
              { label: 'Pakistan', value: 'Pakistan' },
              { label: 'Palestine', value: 'Palestine' },
              { label: 'Panama', value: 'Panama' },
              { label: 'Papua New Guinea', value: 'Papua New Guinea' },
              { label: 'Paraguay', value: 'Paraguay' },
              { label: 'Peru', value: 'Peru' },
              { label: 'Philippines', value: 'Philippines' },
              { label: 'Poland', value: 'Poland' },
              { label: 'Portugal', value: 'Portugal' },
              { label: 'Qatar', value: 'Qatar' },
              { label: 'Romania', value: 'Romania' },
              { label: 'Russia', value: 'Russia' },
              { label: 'Rwanda', value: 'Rwanda' },
              {
                label: 'Saint Kitts and Nevis',
                value: 'Saint Kitts and Nevis',
              },
              { label: 'Saint Lucia', value: 'Saint Lucia' },
              {
                label: 'Saint Vincent and the Grenadines',
                value: 'Saint Vincent and the Grenadines',
              },
              { label: 'Samoa', value: 'Samoa' },
              { label: 'San Marino', value: 'San Marino' },
              { label: 'Saudi Arabia', value: 'Saudi Arabia' },
              { label: 'Senegal', value: 'Senegal' },
              { label: 'Serbia', value: 'Serbia' },
              { label: 'Seychelles', value: 'Seychelles' },
              { label: 'Sierra Leone', value: 'Sierra Leone' },
              { label: 'Singapore', value: 'Singapore' },
              { label: 'Slovakia', value: 'Slovakia' },
              { label: 'Slovenia', value: 'Slovenia' },
              { label: 'Solomon Islands', value: 'Solomon Islands' },
              { label: 'Somalia', value: 'Somalia' },
              { label: 'South Africa', value: 'South Africa' },
              { label: 'South Korea', value: 'South Korea' },
              { label: 'South Sudan', value: 'South Sudan' },
              { label: 'Spain', value: 'Spain' },
              { label: 'Sri Lanka', value: 'Sri Lanka' },
              { label: 'Sudan', value: 'Sudan' },
              { label: 'Suriname', value: 'Suriname' },
              { label: 'Sweden', value: 'Sweden' },
              { label: 'Switzerland', value: 'Switzerland' },
              { label: 'Syria', value: 'Syria' },
              { label: 'Taiwan', value: 'Taiwan' },
              { label: 'Tajikistan', value: 'Tajikistan' },
              { label: 'Tanzania', value: 'Tanzania' },
              { label: 'Thailand', value: 'Thailand' },
              { label: 'Togo', value: 'Togo' },
              { label: 'Tonga', value: 'Tonga' },
              { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
              { label: 'Tunisia', value: 'Tunisia' },
              { label: 'Turkey', value: 'Turkey' },
              { label: 'Turkmenistan', value: 'Turkmenistan' },
              { label: 'Tuvalu', value: 'Tuvalu' },
              { label: 'Uganda', value: 'Uganda' },
              { label: 'Ukraine', value: 'Ukraine' },
              { label: 'United Arab Emirates', value: 'United Arab Emirates' },
              { label: 'United Kingdom', value: 'United Kingdom' },
              { label: 'United States', value: 'United States' },
              { label: 'Uruguay', value: 'Uruguay' },
              { label: 'Uzbekistan', value: 'Uzbekistan' },
              { label: 'Vanuatu', value: 'Vanuatu' },
              { label: 'Vatican City', value: 'Vatican City' },
              { label: 'Venezuela', value: 'Venezuela' },
              { label: 'Vietnam', value: 'Vietnam' },
              { label: 'Yemen', value: 'Yemen' },
              { label: 'Zambia', value: 'Zambia' },
              { label: 'Zimbabwe', value: 'Zimbabwe' },
              { label: 'Kosovo', value: 'Kosovo' },
              { label: 'Marshall Islands', value: 'Marshall Islands' },
              { label: 'Micronesia', value: 'Micronesia' },
              { label: 'Nauru', value: 'Nauru' },
              {
                label: 'Sao Tome and Principe',
                value: 'Sao Tome and Principe',
              },
              { label: 'Timor-Leste', value: 'Timor-Leste' },
              { label: 'USA', value: 'USA' },
            ],
          },

          {
            name: 'businessName',
            label: 'Business Name',
            type: 'text',
            required: true,
          },
          {
            name: 'legalName',
            label: 'Legal Name',
            type: 'text',
            required: true,
            desclaimer: '( as per Registration Certificate )',
          },
          {
            name: 'ntnNO',
            label: 'NTN No',
            type: 'text',
            required: true,
          },
          {
            name: 'dateOfCorporation',
            label: 'Date of Corporation',
            type: 'date',
            required: true,
          },
          {
            name: 'terrorFinancing',
            label: 'Terror Financing',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
          },
          {
            name: 'politicallyExposed',
            label: 'Politically Exposed',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ],
          },

          {
            name: 'residency',
            label: 'Residency',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Afghanistan', value: 'Afghanistan' },
              { label: 'Albania', value: 'Albania' },
              { label: 'Algeria', value: 'Algeria' },
              { label: 'Andorra', value: 'Andorra' },
              { label: 'Angola', value: 'Angola' },
              { label: 'Argentina', value: 'Argentina' },
              { label: 'Armenia', value: 'Armenia' },
              { label: 'Australia', value: 'Australia' },
              { label: 'Austria', value: 'Austria' },
              { label: 'Azerbaijan', value: 'Azerbaijan' },
              { label: 'Bahamas', value: 'Bahamas' },
              { label: 'Bahrain', value: 'Bahrain' },
              { label: 'Bangladesh', value: 'Bangladesh' },
              { label: 'Barbados', value: 'Barbados' },
              { label: 'Belarus', value: 'Belarus' },
              { label: 'Belgium', value: 'Belgium' },
              { label: 'Belize', value: 'Belize' },
              { label: 'Benin', value: 'Benin' },
              { label: 'Bhutan', value: 'Bhutan' },
              { label: 'Bolivia', value: 'Bolivia' },
              {
                label: 'Bosnia and Herzegovina',
                value: 'Bosnia and Herzegovina',
              },
              { label: 'Botswana', value: 'Botswana' },
              { label: 'Brazil', value: 'Brazil' },
              { label: 'Brunei', value: 'Brunei' },
              { label: 'Bulgaria', value: 'Bulgaria' },
              { label: 'Burkina Faso', value: 'Burkina Faso' },
              { label: 'Burundi', value: 'Burundi' },
              { label: 'Cambodia', value: 'Cambodia' },
              { label: 'Cameroon', value: 'Cameroon' },
              { label: 'Canada', value: 'Canada' },
              { label: 'Cape Verde', value: 'Cape Verde' },
              {
                label: 'Central African Republic',
                value: 'Central African Republic',
              },
              { label: 'Chad', value: 'Chad' },
              { label: 'Chile', value: 'Chile' },
              { label: 'China', value: 'China' },
              { label: 'Colombia', value: 'Colombia' },
              { label: 'Comoros', value: 'Comoros' },
              { label: 'Cote dlovoire', value: 'Cote dlovoire' },
              { label: 'Costa Rica', value: 'Costa Rica' },
              { label: 'Croatia', value: 'Croatia' },
              { label: 'Cuba', value: 'Cuba' },
              { label: 'Cyprus', value: 'Cyprus' },
              { label: 'Czech Republic', value: 'Czech Republic' },
              { label: 'Czechia', value: 'Czechia' },
              { label: 'Denmark', value: 'Denmark' },
              { label: 'Djibouti', value: 'Djibouti' },
              { label: 'Dominica', value: 'Dominica' },
              { label: 'Dominican Republic', value: 'Dominican Republic' },
              { label: 'Ecuador', value: 'Ecuador' },
              { label: 'Egypt', value: 'Egypt' },
              { label: 'El Salvador', value: 'El Salvador' },
              { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
              { label: 'Eritrea', value: 'Eritrea' },
              { label: 'Estonia', value: 'Estonia' },
              { label: 'Eswatini', value: 'Eswatini' },
              { label: 'Ethiopia', value: 'Ethiopia' },
              { label: 'Fiji', value: 'Fiji' },
              { label: 'Finland', value: 'Finland' },
              { label: 'France', value: 'France' },
              { label: 'Gabon', value: 'Gabon' },
              { label: 'Gambia', value: 'Gambia' },
              { label: 'Georgia', value: 'Georgia' },
              { label: 'Germany', value: 'Germany' },
              { label: 'Ghana', value: 'Ghana' },
              { label: 'Greece', value: 'Greece' },
              { label: 'Grenada', value: 'Grenada' },
              { label: 'Guatemala', value: 'Guatemala' },
              { label: 'Guinea', value: 'Guinea' },
              { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
              { label: 'Guyana', value: 'Guyana' },
              { label: 'Haiti', value: 'Haiti' },
              { label: 'Honduras', value: 'Honduras' },
              { label: 'Hungary', value: 'Hungary' },
              { label: 'Iceland', value: 'Iceland' },
              { label: 'India', value: 'India' },
              { label: 'Indonesia', value: 'Indonesia' },
              { label: 'Iran', value: 'Iran' },
              { label: 'Iraq', value: 'Iraq' },
              { label: 'Ireland', value: 'Ireland' },
              { label: 'Israel', value: 'Israel' },
              { label: 'Italy', value: 'Italy' },
              { label: 'Jamaica', value: 'Jamaica' },
              { label: 'Japan', value: 'Japan' },
              { label: 'Jordan', value: 'Jordan' },
              { label: 'Kazakhstan', value: 'Kazakhstan' },
              { label: 'Kenya', value: 'Kenya' },
              { label: 'Kiribati', value: 'Kiribati' },
              { label: 'Kuwait', value: 'Kuwait' },
              { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
              { label: 'Laos', value: 'Laos' },
              { label: 'Latvia', value: 'Latvia' },
              { label: 'Lebanon', value: 'Lebanon' },
              { label: 'Lesotho', value: 'Lesotho' },
              { label: 'Liberia', value: 'Liberia' },
              { label: 'Libya', value: 'Libya' },
              { label: 'Liechtenstein', value: 'Liechtenstein' },
              { label: 'Lithuania', value: 'Lithuania' },
              { label: 'Luxembourg', value: 'Luxembourg' },
              { label: 'Madagascar', value: 'Madagascar' },
              { label: 'Malawi', value: 'Malawi' },
              { label: 'Malaysia', value: 'Malaysia' },
              { label: 'Maldives', value: 'Maldives' },
              { label: 'Mali', value: 'Mali' },
              { label: 'Malta', value: 'Malta' },
              { label: 'Mauritania', value: 'Mauritania' },
              { label: 'Mauritius', value: 'Mauritius' },
              { label: 'Mexico', value: 'Mexico' },
              { label: 'Moldova', value: 'Moldova' },
              { label: 'Monaco', value: 'Monaco' },
              { label: 'Mongolia', value: 'Mongolia' },
              { label: 'Montenegro', value: 'Montenegro' },
              { label: 'Morocco', value: 'Morocco' },
              { label: 'Mozambique', value: 'Mozambique' },
              { label: 'Myanmar', value: 'Myanmar' },
              { label: 'Namibia', value: 'Namibia' },
              { label: 'Nepal', value: 'Nepal' },
              { label: 'Netherlands', value: 'Netherlands' },
              { label: 'New Zealand', value: 'New Zealand' },
              { label: 'Nicaragua', value: 'Nicaragua' },
              { label: 'Niger', value: 'Niger' },
              { label: 'Nigeria', value: 'Nigeria' },
              { label: 'North Korea', value: 'North Korea' },
              { label: 'North Macedonia', value: 'North Macedonia' },
              { label: 'Norway', value: 'Norway' },
              { label: 'Oman', value: 'Oman' },
              { label: 'Pakistan', value: 'Pakistan' },
              { label: 'Palestine', value: 'Palestine' },
              { label: 'Panama', value: 'Panama' },
              { label: 'Papua New Guinea', value: 'Papua New Guinea' },
              { label: 'Paraguay', value: 'Paraguay' },
              { label: 'Peru', value: 'Peru' },
              { label: 'Philippines', value: 'Philippines' },
              { label: 'Poland', value: 'Poland' },
              { label: 'Portugal', value: 'Portugal' },
              { label: 'Qatar', value: 'Qatar' },
              { label: 'Romania', value: 'Romania' },
              { label: 'Russia', value: 'Russia' },
              { label: 'Rwanda', value: 'Rwanda' },
              {
                label: 'Saint Kitts and Nevis',
                value: 'Saint Kitts and Nevis',
              },
              { label: 'Saint Lucia', value: 'Saint Lucia' },
              {
                label: 'Saint Vincent and the Grenadines',
                value: 'Saint Vincent and the Grenadines',
              },
              { label: 'Samoa', value: 'Samoa' },
              { label: 'San Marino', value: 'San Marino' },
              { label: 'Saudi Arabia', value: 'Saudi Arabia' },
              { label: 'Senegal', value: 'Senegal' },
              { label: 'Serbia', value: 'Serbia' },
              { label: 'Seychelles', value: 'Seychelles' },
              { label: 'Sierra Leone', value: 'Sierra Leone' },
              { label: 'Singapore', value: 'Singapore' },
              { label: 'Slovakia', value: 'Slovakia' },
              { label: 'Slovenia', value: 'Slovenia' },
              { label: 'Solomon Islands', value: 'Solomon Islands' },
              { label: 'Somalia', value: 'Somalia' },
              { label: 'South Africa', value: 'South Africa' },
              { label: 'South Korea', value: 'South Korea' },
              { label: 'South Sudan', value: 'South Sudan' },
              { label: 'Spain', value: 'Spain' },
              { label: 'Sri Lanka', value: 'Sri Lanka' },
              { label: 'Sudan', value: 'Sudan' },
              { label: 'Suriname', value: 'Suriname' },
              { label: 'Sweden', value: 'Sweden' },
              { label: 'Switzerland', value: 'Switzerland' },
              { label: 'Syria', value: 'Syria' },
              { label: 'Taiwan', value: 'Taiwan' },
              { label: 'Tajikistan', value: 'Tajikistan' },
              { label: 'Tanzania', value: 'Tanzania' },
              { label: 'Thailand', value: 'Thailand' },
              { label: 'Togo', value: 'Togo' },
              { label: 'Tonga', value: 'Tonga' },
              { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
              { label: 'Tunisia', value: 'Tunisia' },
              { label: 'Turkey', value: 'Turkey' },
              { label: 'Turkmenistan', value: 'Turkmenistan' },
              { label: 'Tuvalu', value: 'Tuvalu' },
              { label: 'Uganda', value: 'Uganda' },
              { label: 'Ukraine', value: 'Ukraine' },
              { label: 'United Arab Emirates', value: 'United Arab Emirates' },
              { label: 'United Kingdom', value: 'United Kingdom' },
              { label: 'United States', value: 'United States' },
              { label: 'Uruguay', value: 'Uruguay' },
              { label: 'Uzbekistan', value: 'Uzbekistan' },
              { label: 'Vanuatu', value: 'Vanuatu' },
              { label: 'Vatican City', value: 'Vatican City' },
              { label: 'Venezuela', value: 'Venezuela' },
              { label: 'Vietnam', value: 'Vietnam' },
              { label: 'Yemen', value: 'Yemen' },
              { label: 'Zambia', value: 'Zambia' },
              { label: 'Zimbabwe', value: 'Zimbabwe' },
              { label: 'Kosovo', value: 'Kosovo' },
              { label: 'Marshall Islands', value: 'Marshall Islands' },
              { label: 'Micronesia', value: 'Micronesia' },
              { label: 'Nauru', value: 'Nauru' },
              {
                label: 'Sao Tome and Principe',
                value: 'Sao Tome and Principe',
              },
              { label: 'Timor-Leste', value: 'Timor-Leste' },
              { label: 'USA', value: 'USA' },
            ],
          },
        ],
      },

      {
        categoryName: 'Contact Details',
        fields: [
          {
            name: 'email',
            label: 'Email Address',
            type: 'disabledInput',
            required: true,
          },
          {
            name: 'city',
            label: 'City',
            type: 'dropdown',
            required: true,
            options: [
              { label: 'Abbaspur', value: 'Abbaspur' },
              { label: 'Abbottabad', value: 'Abbottabad' },
              { label: 'Adezai', value: 'Adezai' },
              { label: 'Ahmadpur East', value: 'Ahmadpur East' },
              { label: 'Ahmed Nager Chatha', value: 'Ahmed Nager Chatha' },
              { label: 'Ahmedpur Sial', value: 'Ahmedpur Sial' },
              { label: 'Akora Khattak', value: 'Akora Khattak' },
              { label: 'Alai', value: 'Alai' },
              { label: 'Al Abad', value: 'Al Abad' },
              { label: 'Ali Khan Abad', value: 'Ali Khan Abad' },
              { label: 'Alipur', value: 'Alipur' },
              { label: 'Alizai', value: 'Alizai' },
              { label: 'Alpuri', value: 'Alpuri' },
              { label: 'AliWala', value: 'AliWala' },
              { label: 'Astore', value: 'Astore' },
              { label: 'Athmuqam', value: 'Athmuqam' },
              { label: 'Attock', value: 'Attock' },
              { label: 'Awaran', value: 'Awaran' },
              { label: 'Ayubia', value: 'Ayubia' },
              { label: 'Batala Kot', value: 'Batala Kot' },
              { label: 'Badin', value: 'Badin' },
              { label: 'Bagh', value: 'Bagh' },
              { label: 'Bahawalnagar', value: 'Bahawalnagar' },
              { label: 'Bahawalpur', value: 'Bahawalpur' },
              { label: 'Bajaur Agency', value: 'Bajaur Agency' },
              { label: 'Bakarki', value: 'Bakarki' },
              { label: 'Bala Kot', value: 'Bala Kot' },
              { label: 'Balambat Lal Qilla', value: 'Balambat Lal Qilla' },
              { label: 'Baloch', value: 'Baloch' },
              { label: 'Banda Daud Shah', value: 'Banda Daud Shah' },
              { label: 'Bannu', value: 'Bannu' },
              { label: 'Barawal', value: 'Barawal' },
              { label: 'Barkhan', value: 'Barkhan' },
              { label: 'Barmala', value: 'Barmala' },
              { label: 'Batkhela', value: 'Batkhela' },
              { label: 'Battagram', value: 'Battagram' },
              { label: 'Bela', value: 'Bela' },
              { label: 'Besima', value: 'Besima' },
              { label: 'Bhag', value: 'Bhag' },
              { label: 'Bhalwal', value: 'Bhalwal' },
              { label: 'Bhakkar', value: 'Bhakkar' },
              { label: 'Bhalwal', value: 'Bhalwal' },
              { label: 'Bhawana', value: 'Bhawana' },
              { label: 'Bhera', value: 'Bhera' },
              { label: 'Bhimber', value: 'Bhimber' },
              { label: 'Bhiria Road', value: 'Bhiria Road' },
              { label: 'Bhirkan', value: 'Bhirkan' },
              { label: 'Bilrote', value: 'Bilrote' },
              { label: 'Bisham', value: 'Bisham' },
              { label: 'Bolan (Dhadar)', value: 'Bolan (Dhadar)' },
              { label: 'Bunir', value: 'Bunir' },
              { label: 'Buurewala', value: 'Buurewala' },
              { label: 'Chachro', value: 'Chachro' },
              { label: 'Chaghi', value: 'Chaghi' },
              { label: 'Chak Jhumra', value: 'Chak Jhumra' },
              { label: 'Chakdara', value: 'Chakdara' },
              { label: 'Chakesar', value: 'Chakesar' },
              { label: 'Chakwal', value: 'Chakwal' },
              { label: 'Chaman', value: 'Chaman' },
              { label: 'Chamber', value: 'Chamber' },
              { label: 'Charcoal', value: 'Charcoal' },
              { label: 'Charsadda', value: 'Charsadda' },
              { label: 'Chitral', value: 'Chitral' },
              { label: 'Chowk Azam', value: 'Chowk Azam' },
              { label: 'Cherat', value: 'Cherat' },
              { label: 'Chitkan', value: 'Chitkan' },
              { label: 'Chilas', value: 'Chilas' },
              { label: 'Chiniot', value: 'Chiniot' },
              { label: 'Chistian', value: 'Chistian' },
              { label: 'Chowk Munda', value: 'Chowk Munda' },
              { label: 'Chowk Sarwar Shaheed', value: 'Chowk Sarwar Shaheed' },
              { label: 'Dadu', value: 'Dadu' },
              { label: 'Dagar', value: 'Dagar' },
              { label: 'Dadu', value: 'Dadu' },
              { label: 'Dabir', value: 'Dabir' },
              { label: 'Dadu', value: 'Dadu' },
              { label: 'Danyore', value: 'Danyore' },
              { label: 'Darra Adam Khel', value: 'Darra Adam Khel' },
              { label: 'Darya Khan', value: 'Darya Khan' },
              { label: 'Daska', value: 'Daska' },
              { label: 'Datta', value: 'Datta' },
              { label: 'Dadu', value: 'Dadu' },
              { label: 'Daska', value: 'Daska' },
              { label: 'Dolatpur', value: 'Dolatpur' },
              { label: 'Domer', value: 'Domer' },
              { label: 'Drish', value: 'Drish' },
              { label: 'Dubairy(AK)', value: 'Dubairy(AK)' },
              { label: 'Duki', value: 'Duki' },
              { label: 'Dunyapur', value: 'Dunyapur' },
              { label: 'Dureji', value: 'Dureji' },
              { label: 'Faisalabad', value: 'Faisalabad' },
              { label: 'Fateh Jang', value: 'Fateh Jang' },
              { label: 'Fateh Garh', value: 'Fateh Garh' },
              { label: 'Fazilpur', value: 'Fazilpur' },
              { label: 'Feroza Wala', value: 'Feroza Wala' },
              { label: 'Fort Abbas', value: 'Fort Abbas' },
              { label: 'Forward Kanula', value: 'Forward Kanula' },
              { label: 'Gadani', value: 'Gadani' },
              { label: 'Gambat', value: 'Gambat' },
              { label: 'Garhiyasin', value: 'Garhiyasin' },
              { label: 'Gari Habibullah', value: 'Gari Habibullah' },
              { label: 'Ghotki', value: 'Ghotki' },
              { label: 'Gilgit', value: 'Gilgit' },
              { label: 'Gojra', value: 'Gojra' },
              { label: 'Gujar Khan', value: 'Gujar Khan' },
              { label: 'Gujranwala', value: 'Gujranwala' },
              { label: 'Gujrat', value: 'Gujrat' },
              { label: 'Gwadar', value: 'Gwadar' },
              { label: 'Gwash', value: 'Gwash' },
              { label: 'Hafizabad', value: 'Hafizabad' },
              { label: 'Hangu', value: 'Hangu' },
              { label: 'Haripur', value: 'Haripur' },
              { label: 'Harnai', value: 'Harnai' },
              { label: 'Hasilpur', value: 'Hasilpur' },
              { label: 'Haveli Kahuta', value: 'Haveli Kahuta' },
              { label: 'Havelian', value: 'Havelian' },
              { label: 'Hassan Abdal', value: 'Hassan Abdal' },
              { label: 'Hasil', value: 'Hasil' },
              { label: 'Jamshoro', value: 'Jamshoro' },
              { label: 'Jand', value: 'Jand' },
              { label: 'Jamshedka', value: 'Jamshedka' },
              { label: 'Jati', value: 'Jati' },
              { label: 'Jatli', value: 'Jatli' },
              { label: 'Jauharabad', value: 'Jauharabad' },
              { label: 'Jhal Magsi', value: 'Jhal Magsi' },
              { label: 'Jhatpat', value: 'Jhatpat' },
              { label: 'Jhando Mari', value: 'Jhando Mari' },
              { label: 'Jhang', value: 'Jhang' },
              { label: 'Jhelum', value: 'Jhelum' },
              { label: 'Jhel Pat', value: 'Jhel Pat' },
              { label: 'Jiwani', value: 'Jiwani' },
              { label: 'Johi', value: 'Johi' },
              { label: 'Jampur', value: 'Jampur' },
              { label: 'Kot Waza', value: 'Kot Waza' },
              { label: 'Kachhi', value: 'Kachhi' },
              { label: 'Haveli Lakha', value: 'Haveli Lakha' },
              { label: 'Hub', value: 'Hub' },
              { label: 'Hunza Nagar', value: 'Hunza Nagar' },
              { label: 'Hurnai', value: 'Hurnai' },
              { label: 'Hussain Bux Mari', value: 'Hussain Bux Mari' },
              { label: 'Hyderabad', value: 'Hyderabad' },
              { label: 'Ishkoman', value: 'Ishkoman' },
              { label: 'Islamabad', value: 'Islamabad' },
              { label: 'Islamkot', value: 'Islamkot' },
              { label: 'Jacobabad', value: 'Jacobabad' },
              { label: 'Jaffarabad', value: 'Jaffarabad' },
              { label: 'Jahaniyan', value: 'Jahaniyan' },
              { label: 'Jalalpur', value: 'Jalalpur' },
              { label: 'Jalalpur Jattan', value: 'Jalalpur Jattan' },
              { label: 'Jami Nawaz Ali', value: 'Jami Nawaz Ali' },
              { label: 'Jamrud', value: 'Jamrud' },
              { label: 'Jamshoro', value: 'Jamshoro' },
              { label: 'Kachhi', value: 'Kachhi' },
              { label: 'Kahan', value: 'Kahan' },
              { label: 'Kahror Pakka', value: 'Kahror Pakka' },
              { label: 'Kahuta', value: 'Kahuta' },
              { label: 'Kala Dhaka', value: 'Kala Dhaka' },
              { label: 'Kalabagh', value: 'Kalabagh' },
              { label: 'Kalat', value: 'Kalat' },
              { label: 'Kallar Kahar', value: 'Kallar Kahar' },
              { label: 'Kallar Sayyedan', value: 'Kallar Sayyedan' },
              { label: 'Kalur Kot', value: 'Kalur Kot' },
              { label: 'Kamalia', value: 'Kamalia' },
              { label: 'Kambar Ali Khan', value: 'Kambar Ali Khan' },
              { label: 'Kamoke', value: 'Kamoke' },
              { label: 'Kandhkot', value: 'Kandhkot' },
              { label: 'Kandia', value: 'Kandia' },
              { label: 'Kandaro', value: 'Kandaro' },
              { label: 'Kanraj', value: 'Kanraj' },
              { label: 'Karachi', value: 'Karachi' },
            ],
          },
          {
            name: 'businessAddress',
            label: 'Business Address',
            type: 'text',
            required: true,
          },
          {
            name: 'correspondenceAddress',
            label: 'Correspondence Address',
            type: 'text',
            required: true,
          },
          {
            name: 'accountHandlerIsdifferentfromOwnerAccountHolder',
            label: 'Account Handler is different from Owner/Account Holder',
            type: 'dropdown',
            required: true,
            options: [{ label: 'API', value: 'API' }],
          },
          {
            name: 'primaryPhoneNo',
            label: 'Primary Phone No',
            type: 'disabledInput',
            required: true,
          },
          {
            name: 'secondaryPhoneNo',
            label: 'Secondary Phone No',
            type: 'text',
            required: false,
          },
        ],
      },
    ],
  };

  console.log('filtered data', filteredData);

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Access internal schema fields safely
    const schemaFields = (
      activityInformationFormSchema as Yup.ObjectSchema<any>
    ).fields;

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
          const matchingCategory = ActivityInformationFormData.categories.find(
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
  // if (!initialValuesState || !validationSchemaState || !filteredData) {
  //   return (
  //     <div className="flex w-full flex-col justify-center">
  //       <BarLoader color="#21B25F" />
  //     </div>
  //   );
  // }
  // const saveAndContinue = async (
  //   values: ActivityFormInfo,
  //   { setSubmitting }: any,
  // ) => {
  //   try {
  //     const response: any = await apiClient.post(
  //       `merchant/activity/${userData.email}`,
  //       {
  //         businessNature: formData?.businessNature?.businessTypeNature,
  //         managerMobile: userData.managerMobile,
  //         fatherName: values.fatherName,
  //         businessName: values.businessName,
  //         nameOfBusinessOwner: values.businessOwner,
  //         legalNameOfBusiness: values.legalName,
  //         dateOfIncorporation: values.incorporationDate,
  //         ntnNumber: values.ntnNumber,
  //         purposeOfAccount: values.purposeOfAccount,
  //         emailAddress: values.emailAddress,
  //         city: values.city,
  //         businessAddress: values.businessAddress,
  //         correspondenceAddress: values.correspondenceAddress,
  //         primaryPhoneNumber: values.primaryPhoneNumber,
  //         otherPhoneNumber: values.otherPhoneNumber,
  //         status: 'partial',
  //         terrorFinancing: values.terrorFinancing,
  //         politicallyExposed: values.politicallyExposed,
  //         accountHolder: values.accountHolder,
  //         gender: values.gender,
  //         citizenship: values.citizenship,
  //         countryOfResidency: values.residency,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${userData.jwt}` },
  //       },
  //     );

  //     if (response.data.responseCode === '000') {
  //       console.log(response, 'Activity Information');
  //       router.push('/business-details');
  //     } else {
  //       router.push('/login');
  //       console.log('Data submission failure');
  //     }
  //   } catch (e) {
  //     console.log(e, 'Error');
  //   }

  //   setSubmitting(false);
  // };

  console.log('endpointArray[nextIndex]?.name', endpointArray);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('Submitted form values:', values);

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'Current Index');

      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      // ✅ Extract valid page names from fieldData
      const validPages = fieldData.pages.page.map((p) => p.pageName);
      console.log('valid pages', validPages);

      const transformedData = {
        status: 'Completed',
        // businessNature,
        managerMobile: userData.managerMobile,
        page: {
          pageName: 'Activity Information',
          categories: ActivityInformationFormData.categories
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
          const response = await apiClient.post(finalEndpoint, requestBody, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
              Username: userData?.email,
            },
          });

          console.log('api response', response.data);
          if (response?.data?.responseCode === '009') {
            let nextIndex = currentIndex + 1;
            console.log('nextIndex', nextIndex);
            console.log(
              'endpointArray[nextIndex]?.name',
              endpointArray[1]?.name,
            );

            //  Ensure nextIndex is within bounds and valid
            while (
              nextIndex < endpointArray.length &&
              (!endpointArray[nextIndex]?.name ||
                !validPages.includes(endpointArray[nextIndex]?.name ?? ''))
            ) {
              nextIndex += 1;
            }

            //  Ensure nextIndex is valid before accessing tab
            if (
              nextIndex < endpointArray.length &&
              endpointArray[nextIndex]?.tab
            ) {
              const nextTab = endpointArray[nextIndex]?.tab as string; // Type assertion ensures it's a string
              console.log('next tab', nextTab);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              router.push(`/merchant/home/request-revision/review-form`);
              // setTitle(response?.data?.responseMessage);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              // dispatch(setLogout());
              // setNavRoute('/login');
              console.log('Form submission completed.');
            }
          } else {
            setTitle('Error Occurred');
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

  const handleCheckboxChange = (name: string, formik: any) => {
    const newChecked = !isChecked;
    console.log(newChecked, 'NEW CHECKED', isChecked, 'ISCHECKED');
    if (formik.values.businessAddress) {
      setIsChecked(newChecked);
    }
    if (newChecked && formik.values.businessAddress) {
      formik.setFieldValue(name, formik.values.businessAddress);
    } else {
      formik.setFieldValue(name, '');
    }
  };

  console.log('Initial Values: ', initialValuesState);
  console.log('Validation Schema: ', validationSchemaState);
  console.log('Filtered Data: ', filteredData);
  console.log('formik', Formik);

  return (
    <>
      {/* Custom Modal for displaying messages */}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={navRoute}
        // routeName="/merchant/home"
      />

      {/* Formik Form for handling form state and submission */}
      <Formik
        enableReinitialize
        initialValues={initialValuesState || {}}
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
              {filteredData.length > 0 ? (
                filteredData?.map((pageItem: any) => {
                  // console.log('Page Item: ', pageItem); // Debug Page Item

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
                            // console.log('Category Item: ', item); // Debug Category Item

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
                                          desclaimer: string | undefined;
                                          type:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<
                                                any,
                                                | string
                                                | React.JSXElementConstructor<any>
                                              >
                                            | Iterable<React.ReactNode>
                                            | React.ReactPortal
                                            | React.PromiseLikeOfReactNode
                                            | null
                                            | undefined;
                                          label: string;
                                          name: string;
                                          placeholder: any;
                                          validation: {
                                            errorMessage:
                                              | string
                                              | string[]
                                              | undefined;
                                            options: unknown;
                                          };
                                          required: any;
                                          options: {
                                            label: string;
                                            value: string;
                                          }[];
                                        },
                                        fieldIndex:
                                          | React.Key
                                          | null
                                          | undefined,
                                      ) => {
                                        // console.log('Field Item: ', field); // Debug Field Item

                                        switch (field?.type) {
                                          case 'text':
                                            return (
                                              <Input
                                                key={fieldIndex}
                                                label={field.label}
                                                name={field.name}
                                                placeholder={
                                                  field.placeholder ||
                                                  'Enter value'
                                                }
                                                type="text"
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                                desclaimer={field?.desclaimer}
                                              />
                                            );
                                          case 'disabledInput':
                                            return (
                                              <DisabledField
                                                data={[
                                                  {
                                                    label:
                                                      field.name ===
                                                      'primaryPhoneNo'
                                                        ? 'Primary Phone No'
                                                        : 'Email Address',
                                                    value:
                                                      field.name ===
                                                      'primaryPhoneNo'
                                                        ? userData?.managerMobile
                                                        : userData?.email,
                                                  },
                                                ]}
                                              />
                                            );
                                          case 'dropdown':
                                            return (
                                              <DropdownNew
                                                key={fieldIndex}
                                                label={
                                                  field.label || 'Missing Label'
                                                }
                                                name={
                                                  field.name ||
                                                  `field-${fieldIndex}`
                                                }
                                                options={
                                                  field?.options?.map(
                                                    (option: {
                                                      label: string;
                                                      value: string;
                                                    }) => ({
                                                      label: option.label,
                                                      value: option.value,
                                                    }),
                                                  ) || []
                                                }
                                                formik={formik}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage || ''
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );

                                          case 'date':
                                            return (
                                              <DateInputNew
                                                key={fieldIndex}
                                                formik={formik}
                                                label={field.label}
                                                name={field.name}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );
                                          case 'checkItem':
                                            return (
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
                                            );
                                          case 'checkBoxInput':
                                            return (
                                              <CheckboxInput
                                                key={fieldIndex}
                                                name={field.name}
                                                options={
                                                  field?.validation?.options
                                                }
                                                form={formik}
                                                setSelectedCheckValue={
                                                  setSelectedCheckValue
                                                }
                                              />
                                            );
                                          default:
                                            return (
                                              <p key={fieldIndex}>
                                                Unsupported field: {field?.type}
                                              </p>
                                            );
                                        }
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

export default ActivityInformationReqRevision;
