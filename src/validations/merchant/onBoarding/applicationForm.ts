import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { ApplicationFormInfo } from '@/interfaces/interface';

// export const ApplicationFormInfoInitialValues: any = {

const restrictedNames = [
  'Government',
  'sex',
  'massage',
  'Army',
  'ISI',
  'Ministry',
  'Parco',
  'Jeeto',
  'Zong',
  'Telenor',
  'Jazz',
  'Ufone',
  'EasyPaisa',
  'Statelife',
  'Youtube',
  'Saudiarab',
  'Sabroso',
  'PSO',
  'Shell',
  'Company',
  'Faisal Movers',
  'TikTok',
  'JazzCash',
  'Nadra',
  'Netflix',
  'Limited',
  'ltd',
  'amazon',
  'HBL',
  'airlift',
  'crypto',
  'careem',
  'pmln',
  'pti',
  'ppp',
  'Bigo',
  'coin seller',
  'crypto',
  'Binance',
  'Octa Fx',
  'Fx',
  'Gun',
  'Navy',
  'PUBG',
  'seller',
  'VISA',
  'Private limited company',
  'Government employee',
  'Netflix',
  'Mastercard',
  'Soldier',
  'Captain',
  'Major',
  'General',
  'ubl omni plus',
  'bahria town',
  'careem',
  'NTN',
  'Trade',
  'Group',
  'advocate',
  'express',
  'WHO',
  'samsung',
  '1Rs Game',
  'corporation',
  'jeeto pakistan',
  'Prime minister',
  'chief minister',
  'ngo',
  'fund',
  'company',
  'inc.',
  'Barwaqt',
  'UdharPaisa',
  'ZarooratCash',
  'SmartQarza',
  'PaisaYaar',
  'EasyLoan',
  'Barwakt',
  'Barwaqtz',
  'Bar waqt',
  'Barwakat',
  'Barwahqt',
  'Udhar Paisa',
  'Udhaar Peisa',
  'Udhaar',
  'Pesa',
  'Udhhaar',
  'Udhaarr',
  'Uddhaar',
  'paysa',
  'zarurat cash',
  'zarourat',
  'zaroorath zaruurat',
  'qarza qarzah karza karzah',
  'smrt smaart smmart',
  'Paisa Yaar',
  'paisa yar',
  'paisayaar',
  'paisa yaar',
  'paisayar',
  'paisa',
  'yaar',
  'paysayaar',
  'paysa yar',
  'paisa yaarr',
  'PaisaYar',
  'Paisa Yar',
  'Paisa Yarr',
  'PaisaYarr',
  'eze loan',
  'ezeloan',
  'easyloans',
  'easyloanz',
  'easy loans',
  'easy loanz',
  'ezy easey',
  'easey',
  '4sight',
  'SmartQarza',
  'smartqarza',
  'smart qarza',
  'Aitemaad',
  'aitemaad',
  'aitemad',
  'Walee',
  'Hakeem',
  'hakeem',
  'hakem',
  'Fori cash',
  'foricash',
  'barwaqt',
  'Barwaqt',
  'Fauri cash',
  'fauricash',
  'Smart Qarza',
  'Goldlion',
  'Gold lion',
  'goldlion',
  'gold lion',
  '4sfs',
  'Sarmaya',
  'sarmaya',
  'PK Loan',
  'pk loan',
  'pkloan',
  'Pkloan',
  'PKloan',
  'PK loan',
  'Easy Cash',
  'Seedcred',
  'Visioncred',
  'visioncred',
  'Vision cred',
];

export const ApplicationFormInfoInitialValues: ApplicationFormInfo = {
  // accountTitle: '',
  // businessNtnNumber: '',
  // requiredBusiness: '',
  // applicantFullName: '',
  // fatherFullName: '',
  // dateOfBirth: '',
  // gender: '',
  // // identificationNumberCnic: '',
  // mobileAccountNumber: '',
  // contactNumber: '',
  // city: '',
  // mailingAddress: '',
  // relationship: '',
  // fullName: '',
  // typeOfIdentificationNextOfKin: '',
  // identificationNumberNextOfKin: '',
  // contactNumberNextOfKin: '',
  // addressNextOfKin: '',
  // primaryNationality: '',
  // secondaryNationality: '',
  // passportNumber: '',
  // taxpayerIdentificationNumber: '',
  // residentStatusInPakistan: '',
  // isUsCitizen: '',
  // bornCityUs: '',
  // haveUsAddress: '',
  // hasAssigningAuthorityForSignatory: '',
  // hasAssigningAuthorityForStandingInstructions: '',
  // taxResidencyCountry: '',
  // taxJurisdictionForResidency: '',
  // taxJurisdictionForTin: '',
  // taxIdentificationNumber: '',
  // noTinReason: '',
  // status: '',

  // countryCode: '',
  // hasAssigningAuthority: '',
  // hasStandingInstructions: '',
  // homeAddressOther: '',
  // taxJurisdiction: '',
  // taxTinJurisdiction: '',
  // homeAddress: '',
  // identificationNumberCnic: '',
  // address: '',

  applicantFullName: '',
  fatherFullName: '',
  dateOfBirth: '',
  gender: '',
  identificationNumberCnic: '',
  mobileAccountNumber: '',
  contactNumber: '',
  city: '',
  mailingAddress: '',
  relationship: '',
  fullName: '',
  identificationNumberNextOfKin: '',
  contactNumberNextOfKin: '',
  addressNextOfKin: '',
  primaryNationality: '',
  secondaryNationality: '',
  // passportNumber: '',
  taxpayerIdentificationNumber: '',
  residentStatusInPakistan: '',
  isUsCitizen: '',
  bornCityUs: '',
  haveUsAddress: '',
  hasAssigningAuthorityForSignatory: '',
  hasAssigningAuthorityForStandingInstructions: '',
  taxResidencyCountry: '',
  taxJurisdictionForResidency: '',
  taxJurisdictionForTin: '',
  taxIdentificationNumber: '',
  noTinReason: '',
  accountTitle: '',
  businessNtnNumber: '',
  requiredBusiness: '',
  homeAddressOther: '',
  contactNumberOtherThanPakistan: '',
};

export const GetApplicationForm = () => {
  const applicationFormInfoDetails = useAppSelector(
    (state: any) => state.onBoardingForms.applicationForm,
  );
  const updatedValues = {
    accountTitle: applicationFormInfoDetails?.accountTitle,
    businessNtnNumber: applicationFormInfoDetails?.businessNtnNumber,
    requiredBusiness: applicationFormInfoDetails?.requiredBusiness,
    applicantFullName: applicationFormInfoDetails?.applicantFullName,
    fatherFullName: applicationFormInfoDetails?.fatherFullName,
    dateOfBirth: applicationFormInfoDetails?.dateOfBirth,
    gender: applicationFormInfoDetails?.gender,
    identificationNumber: applicationFormInfoDetails?.identificationNumber,
    mobileAccountNumber: applicationFormInfoDetails?.mobileAccountNumber,
    contactNumber: applicationFormInfoDetails?.contactNumber,
    city: applicationFormInfoDetails?.city,
    mailingAddress: applicationFormInfoDetails?.mailingAddress,
    relationship: applicationFormInfoDetails?.relationship,
    fullName: applicationFormInfoDetails?.fullName,
    typeOfIdentificationNextOfKin:
      applicationFormInfoDetails?.typeOfIdentificationNextOfKin,
    identificationNumberNextOfKin:
      applicationFormInfoDetails?.identificationNumberNextOfKin,
    contactNumberNextOfKin: applicationFormInfoDetails?.contactNumberNextOfKin,
    addressNextOfKin: applicationFormInfoDetails?.addressNextOfKin,
    primaryNationality: applicationFormInfoDetails?.primaryNationality,
    secondaryNationality: applicationFormInfoDetails?.secondaryNationality,
    // passportNumber: applicationFormInfoDetails?.passportNumber,
    taxpayerIdentificationNumber:
      applicationFormInfoDetails?.taxpayerIdentificationNumber,
    residentStatusInPakistan:
      applicationFormInfoDetails?.residentStatusInPakistan,
    isUsCitizen: applicationFormInfoDetails?.isUsCitizen,
    bornCityUs: applicationFormInfoDetails?.bornCityUs,
    haveUsAddress: applicationFormInfoDetails?.haveUsAddress,
    hasAssigningAuthorityForSignatory:
      applicationFormInfoDetails?.hasAssigningAuthorityForSignatory,
    hasAssigningAuthorityForStandingInstructions:
      applicationFormInfoDetails?.hasAssigningAuthorityForStandingInstructions,
    taxResidencyCountry: applicationFormInfoDetails?.taxResidencyCountry,
    taxJurisdictionForResidency:
      applicationFormInfoDetails?.taxJurisdictionForResidency,
    taxJurisdictionForTin: applicationFormInfoDetails?.taxJurisdictionForTin,
    taxIdentificationNumber:
      applicationFormInfoDetails?.taxIdentificationNumber,
    noTinReason: applicationFormInfoDetails?.noTinReason,
    status: applicationFormInfoDetails?.status,
    countryCode: applicationFormInfoDetails?.countryCode,
    hasAssigningAuthority: applicationFormInfoDetails?.hasAssigningAuthority,
    hasStandingInstructions:
      applicationFormInfoDetails?.hasStandingInstructions,
    homeAddressOther: applicationFormInfoDetails?.homeAddressOther,
    taxJurisdiction: applicationFormInfoDetails?.taxJurisdiction,
    taxTinJurisdiction: applicationFormInfoDetails?.taxTinJurisdiction,
    homeAddress: applicationFormInfoDetails?.homeAddress,
    identificationNumberCnic:
      applicationFormInfoDetails?.identificationNumberCnic,
    address: applicationFormInfoDetails?.address,
    contactNumberOtherThanPakistan:
      applicationFormInfoDetails?.contactNumberOtherThanPakistan,
  };

  return updatedValues;
};
const today = new Date();
const minAgeDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);
const maxAgeDate = new Date(
  today.getFullYear() - 120,
  today.getMonth(),
  today.getDate(),
);

export const ApplicationFormSchema = Yup.object().shape({
  // accountTitle: Yup.string().required('Please fill the field'),
  // businessNtnNumber: Yup.string().required('Please fill the field'),
  // requiredBusiness: Yup.string().required('Please fill the field'),
  // applicantFullName: Yup.string().required('Applicant Name is required'),
  // fatherFullName: Yup.string().required('Father Name is required'),
  // dateOfBirth: Yup.string().required('Date Of Birth is required'),
  // gender: Yup.string().required('Gender is required'),
  // // typeOfIdentification: Yup.string().required(
  // //   'Type Of Identification is required',
  // // ),
  // // identificationNumber: Yup.string().required(
  // //   'Identification Number is required',
  // // ),
  // mobileAccountNumber: Yup.string().required(
  //   'Mobile Account Number is required',
  // ),
  // contactNumber: Yup.string().required('Contact Number is required'),
  // city: Yup.string().required('City is required'),
  // mailingAddress: Yup.string().required('Mailing Address is required'),
  // relationship: Yup.string().required('Relationship is required'),
  // fullName: Yup.string().required('Name is required'),
  // typeOfIdentificationNextOfKin: Yup.string().required(
  //   'Type Of Identification of Next of Kin is required',
  // ),
  // identificationNumberNextOfKin: Yup.string().required(
  //   'Identification Number of Next Of Kin is required',
  // ),
  // contactNumberNextOfKin: Yup.string().required(
  //   'Contact Number of Next Of Kin is required',
  // ),
  // addressNextOfKin: Yup.string().required('Address Next Of Kin is required'),
  // primaryNationality: Yup.string().required('Primary Nationality is required'),
  // secondaryNationality: Yup.string().required(
  //   'Secondary Nationality is required',
  // ),
  // passportNumber: Yup.string().required('Passport Number is required'),
  // taxpayerIdentificationNumber: Yup.string().required(
  //   'Tax Payer Identification Number is required',
  // ),
  // residentStatusInPakistan: Yup.string().required(
  //   'Resident Status In Pakistan is required',
  // ),
  // isUsCitizen: Yup.string().required('Citizenship is required'),
  // bornCityUs: Yup.string().required('Residency is required'),
  // haveUsAddress: Yup.string().required('Us Address is required'),
  // hasAssigningAuthorityForSignatory: Yup.string().required(
  //   'Assigning Authority For Signatory is required',
  // ),
  // hasAssigningAuthorityForStandingInstructions: Yup.string().required(
  //   'Assigning Authority For Standing Instructions is required',
  // ),
  // taxResidencyCountry: Yup.string().required(
  //   'Tax Residency Country is required',
  // ),
  // taxJurisdictionForResidency: Yup.string().required(
  //   'Tax Jurisdiction For Residency is required',
  // ),
  // taxJurisdictionForTin: Yup.string().required(
  //   'Tax Jurisdiction For Tin is required',
  // ),
  // taxIdentificationNumber: Yup.string().required(
  //   'Tax Identification Number is required',
  // ),
  // noTinReason: Yup.string().required('No Tin Reason is required'),
  // status: Yup.string().required('Status is required'),

  // countryCode: Yup.string().required('Country code is required'),
  // hasAssigningAuthority: Yup.string().required('Please fill the field'),
  // hasStandingInstructions: Yup.string().required('Please fill the field'),
  // homeAddressOther: Yup.string().required('Other home address is required'),
  // taxJurisdiction: Yup.string().required('Please fill the field'),
  // taxTinJurisdiction: Yup.string().required('Please fill the field'),
  // homeAddress: Yup.string().required('Home address is required'),
  // identificationNumberCnic: Yup.string().required('Please fill the field'),
  // address: Yup.string().required('Address is required'),

  applicantFullName: Yup.string()
    .required('Please fill the field')
    .matches(
      /^(?![-'’.\s]+$)[a-zA-ZÀ-ÿ'’\-.\s]+$/,
      'Must contain letters and cannot consist only of special characters',
    ),
  fatherFullName: Yup.string()
    .required('Please fill the field')
    .matches(
      /^(?![-'’.\s]+$)[a-zA-ZÀ-ÿ'’\-.\s]+$/,
      'Must contain letters and cannot consist only of special characters',
    ),
  // dateOfBirth: Yup.string().required('Please fill the field'),
  dateOfBirth: Yup.date()
    .required('Please fill the field')
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(maxAgeDate, 'Date of birth cannot be more than 120 years ago')
    .max(minAgeDate, 'You must be at least 18 years old'),

  gender: Yup.string().required('Please fill the field'),
  identificationNumberCnic: Yup.string()
    .required('Identification Number is required')
    .matches(
      /^\d{13}$/,
      'Identification Number must be a 13-digit numeric value',
    ),
  mobileAccountNumber: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^0\d{10}$/,
      'Contact Number must start with 0 and be 11 digits long',
    ),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^0\d{10}$/,
      'Contact Number must start with 0 and be 11 digits long',
    ),
  city: Yup.string().required('Please fill the field'),
  mailingAddress: Yup.string().required('Please fill the field'),
  relationship: Yup.string().required('Please fill the field'),
  fullName: Yup.string().required('Please fill the field'),
  identificationNumberNextOfKin: Yup.string()
    .required('Please fill the field')
    .matches(
      /^\d{13}$/,
      'Identification Number must be a 13-digit numeric value',
    ),
  contactNumberNextOfKin: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^0\d{10}$/,
      'Contact Number must start with 0 and be 11 digits long',
    ),
  addressNextOfKin: Yup.string().required('Please fill the field'),
  primaryNationality: Yup.string().required('Please fill the field'),
  secondaryNationality: Yup.string().required('Please fill the field'),
  // passportNumber: Yup?.string()
  //   .matches(
  //     /^[A-Z]{2}\d{7}$/,
  //     'Invalid passport number. Must be 2 uppercase letters followed by 7 digits.',
  //   )
  //   .required('Passport number is required'),

  // taxpayerIdentificationNumber: Yup.string()
  //   .required('Please fill the field')
  //   .matches(/^\d+$/, 'TIN must contain only numbers')
  //   .min(9, 'TIN must be at least 9 digits')
  //   .max(15, 'TIN must be at most 15 digits'),

  taxpayerIdentificationNumber: Yup.string().when(
    'secondaryNationality',
    (secondaryNationality, schema) => {
      console.log('secondaryNationality2 ', secondaryNationality[0]);

      console.log(
        'secondaryNationality222>> ',
        secondaryNationality[0] === 'None',
      );
      console.log(
        'secondaryNationality111>> ',
        secondaryNationality[0] !== 'None',
      );

      if (secondaryNationality[0] !== 'None') {
        console.log('here ifff schema ', secondaryNationality);

        return schema
          .required('Please fill the field')
          .matches(/^\d+$/, 'TIN must contain only numbers')
          .min(9, 'TIN must be at least 9 digits')
          .max(15, 'TIN must be at most 15 digits');
      }
      return schema;
    },
  ),

  residentStatusInPakistan: Yup.string().required('Please fill the field'),
  isUsCitizen: Yup.string().required('Please fill the field'),
  bornCityUs: Yup.string().required('Please fill the field'),
  haveUsAddress: Yup.string().required('Please fill the field'),
  hasAssigningAuthorityForSignatory: Yup.string().required(
    'Please fill the field',
  ),
  hasAssigningAuthorityForStandingInstructions: Yup.string().required(
    'Please fill the field',
  ),

  taxResidencyCountry: Yup.string().required('Please fill the field'),
  taxIdentificationNumber: Yup.string()
    .matches(/^\d+$/, 'TIN must be a valid number')
    .min(9, 'TIN must be at least 9 digits long')
    .max(12, 'TIN must be at most 12 digits long'),
  // accountTitle: Yup.string().required('Please fill the field'),
  accountTitle: Yup.string()
    .required('Please fill the field')
    .matches(
      /^(?![-'’.\s]+$)[a-zA-Z0-9'’\-.\s]{1,40}$/,
      'Must be less than 40 characters long and cannot consist only of special characters',
    )
    .test(
      'not-restricted',
      'This Account title is not allowed.',
      (value: any) => {
        if (!value) return true; // If the field is empty, it's handled by the `required` rule
        const lowerCaseValue = value.toLowerCase();
        return !restrictedNames.some((name) =>
          lowerCaseValue.includes(name.toLowerCase()),
        );
      },
    ),
  businessNtnNumber: Yup.string().required('Please fill the field'),
  requiredBusiness: Yup.string().required('Please fill the field'),
  // homeAddressOther: Yup.string().required('Please fill the field'),

  taxJurisdictionForResidency: Yup.string().when(
    'taxResidencyCountry',
    (taxResidencyCountry, schema) => {
      if (taxResidencyCountry[0] === 'Yes') {
        return schema.required(
          'Country / Jurisdiction of Tax Residence is required',
        );
      }

      return schema;
    },
  ),

  taxJurisdictionForTin: Yup.string().when(
    'taxResidencyCountry',
    (taxResidencyCountry, schema) => {
      if (taxResidencyCountry[0] === 'Yes') {
        return schema.required(
          'TIN / Jurisdiction of Tax Residence is required',
        );
      }
      return schema;
    },
  ),

  noTinReason: Yup.string().when(
    'taxIdentificationNumber',
    (taxIdentificationNumber, schema) => {
      if (
        taxIdentificationNumber[0] === '' ||
        taxIdentificationNumber[0] === null ||
        taxIdentificationNumber[0] === undefined
      ) {
        return schema.required('No TIN Reason is required');
      }
      return schema;
    },
  ),
  // contactNumberOtherThanPakistan: Yup.string()
  //   .matches(
  //     /^\+?[0-9]*$/,
  //     'Contact number must only contain numbers and may start with a + sign',
  //   )
  //   .nullable(),

  contactNumberOtherThanPakistan: Yup.string().when(
    'secondaryNationality',
    (secondaryNationality, schema) => {
      console.log('secondaryNationality3 ', secondaryNationality);

      if (secondaryNationality[0] !== 'None') {
        return schema
          .required('Please fill the field')
          .matches(
            /^\+?[0-9]*$/,
            'Contact number must only contain numbers and may start with a + sign',
          )
          .nullable();
      }
      return schema;
    },
  ),
});
