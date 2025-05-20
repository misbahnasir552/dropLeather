import type { FormikProps } from 'formik';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import type React from 'react';

import type {
  TCard,
  TMerchantNavDropdown,
  // TSelect,
} from '@/types/static/static';
// import exp from 'constants';

export default interface IHome {
  image: {
    src: StaticImageData;
    alt: string;
  };
  label: {
    main: string;
    sub: string;
  };
  id: string;
  heading?: {
    head1: string;
    head2: string;
    head3: string;
  };
  description: string | Record<string, string>;
  className: string;
}

export interface ILayouts {
  children: React.ReactNode;
}

export interface IButton {
  label: string;
  type?: 'button' | 'submit';
  id?: string;
  className?: string;
  isDisabled?: boolean;
  routeName?: string;
  onClickHandler?: (values?: any) => void;
  disable?: boolean;
}

export interface IFormLayout {
  children: ReactNode;
  className?: string;
  formHeading?: string;
}

export interface IReviewFormDataGrid {
  children?: ReactNode;
  heading?: string;
  active?: string;
  isEditable?: boolean;
}

export interface IHeaderWrapper {
  heading: string;
  description?: string;
  show?: boolean;
}

export interface IInputPrimary {
  name: string;
  label: string;
  type: string;
  className?: string;
  hasImage?: boolean;
  isDisabled?: boolean;
  image: StaticImageData;
}

export interface IInput {
  desclaimer?: string;
  asterik?: boolean;
  name: string;
  label: string;
  subString?: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
  hasImage?: boolean;
  image?: StaticImageData | string;
  error?: string | undefined | string[];
  touched?: boolean | undefined;
  eyeinput?: boolean;
  value?: any;
  onBlur?: any;
  formik?: FormikProps<any>;
  placeholder?: any;
  onKeyDown?: (event: any) => void;
}

export interface IComment {
  name: string;
  placeholder: string;
  className?: string;
  isDisabled?: boolean;
  error?: string | undefined;
  touched?: boolean | undefined;
}

export interface IDate {
  asterik?: boolean;
  name: string;
  label: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
  error?: string | undefined | string[];
  touched?: boolean | undefined;
  formik?: FormikProps<any>;
  minDate?: any;
}

export interface ICheckboxInput {
  name: string;
  options: { value: string; label: string }[];
  form: FormikProps<any>; // FormikProps with any type
  isMulti?: boolean;
  logo?: StaticImageData;
}

export interface ICheckboxData {
  value: string;
  label: string;
  logo?: string | boolean | any;
}

export interface ISuccessModalProps {
  title?: string;
  description?: string;
  show: boolean;
  setShowModal?: (value: boolean) => void;
}
export interface IErrorModalProps {
  title?: string;
  description?: string;
  show: boolean;
  setShow: (value: boolean) => void;
  routeName?: string;
}
export interface ICustomModalProps {
  title?: string;
  description?: string;
  show: boolean;
  setShowModal: (value: boolean) => void;
  routeName?: string | (() => void);
  image?: any;
  isVisible?: boolean;
  type?: string;
}

// export  interface ICustomModalHookProps{
//     modalTitle:string,
//     modalDescription:string
//   }

export interface IInfoProp {
  title?: string;
  cardsArray?: TCard[];
}

export interface IMerchantNavDropdownProps {
  className?: string;
  data: TMerchantNavDropdown[] | undefined;
  hoveredMenu: string | null;
  setHoveredMenu?: React.Dispatch<React.SetStateAction<string | null>> | null;
}

export interface IDropdownProps {
  isHovered: boolean;
  setIsHovered?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ICardProps {
  label: string;
  logo: { image1: StaticImageData; image2: StaticImageData };
  className?: string;
  children?: React.ReactNode;
  description?: string;
}

export interface IModalProps {
  isSuccess: boolean;
  showModal: boolean;
  children: React.ReactNode;
  setShowModal: (showModal: boolean) => void;
}

export interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  className: string;
}

export interface IAcceptPaymentBanner {
  title: { main: string; sub: string };
  description: string;
  banner: StaticImageData | string;
  //   className?: string;
}

export interface LoginForm {
  Username: string;
  Password: string;
}

export interface ILoginCard {
  title: string;
  description: string;
  routeName?: string;
  isDisabled?: boolean;
  type?: string;
  onClick?: () => void;
}

export interface IHeaderProps {
  title: { main: string; sub: string };
  description?: string;
  centerTitle?: boolean;
  // routeName: string;
}

export interface IDropdownInputProps {
  label: string;
}

export interface IFormPageProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface SettlementFormInfo {
  accounts: string;
  // hasBankAccount?: boolean;
  bankName?: string;
  accountNumber?: string;
  accountTitle?: string;
  status?: string;
}

export interface AttachmentFormInfo {
  accountMaintainanceCertificate: File | null;
  externalBank: File | null;
  livePicture: File | null;
  cnicFront: File | null;
  cnicBack: File | null;
  // status?: string;
}

export interface BusinessFormInfo {
  businessDocumentationType: string;
  merchantCategory: string;
  businessMode: string;
  establishedSince: string;
  paymentModesRequired: string[];
  businessType: string;
  isBusinessRegistered: string;
  isSpecialCustomer: string;
  natureOfActivity: string;
  isIncomeFromSalary: string;
  currentDailyTransactionsInPkr: string;
  associationToHighRiskBusiness: string;
  status: string;
  sourceOfFunds: string;
  currentMonthlyTransactionsInPkr: string;
  expectedNumberOfTransactions: string;
  expectedSalesVolume: string;
  // status?: string;
}
export interface ISearchBulk {
  batchId: string;
  file: string;
  fromDate: string;
  toDate: string;
  status: string;
}
export interface ActivityFormInfo {
  fatherName: string;
  businessOwner: string;
  businessName: string;
  legalName: string;
  incorporationDate: string;
  ntnNumber: string;
  emailAddress: string;
  city: string;
  businessAddress: string;
  correspondenceAddress: string;
  primaryPhoneNumber: string;
  otherPhoneNumber: string;
  status: string;
  accountHolder: string;
  gender: string;
  purposeOfAccount: string;
  citizenship: string;
  residency: string;
  terrorFinancing: string;
  politicallyExposed: string;
  // status?: string;
}

export interface AddStoreInfo {
  storeType: string[];
  storeName: string;
  websiteName: string;
  websiteURL: string;
  category: string;
  city: string;
  streetAddress: string;
  // countryCode: string;
  state: string;
  posCountryCode: string;
}

// export interface IntegrationFormInfo {
//   fullName: string;
//   emailAddress: string;
//   mobileNumber: string;
//   integrationPlatform: string[];
//   // selectedOption: string;
//   // plugin: string;
//   // fbPage: string;
//   // website: string;
// }
export interface FormDataArray {
  page: string;
  color: string;
  isPrev: boolean;
  isActive: boolean;
  isNext: boolean;
}

export interface IntegrationFormInfo {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  integrationPlatform: string;
  integrationMethod: string;
  status?: string;
}

export interface IDropdownInput {
  asterik?: boolean;
  name: string;
  options: any;
  error?: string | undefined | string[];
  touched?: boolean | undefined;
  label: string;
  formik?: FormikProps<any>;
  onClick?: any;
  setSelectedDropDownValue?: any;
  resetGraphFilter?: boolean;
}

export interface BusinessNatureForm {
  businessNature: string;
  // corporateProducts: string;
  // managedDisbursementProducts: string;
  // othersProducts: string;
  // selfServeProducts: string;
  // chequeBookRequired: string;
}

export interface ApprovalDecisionForm {
  approvalDecision: string;
  reason: string;
  comment?: string;
}

export interface IHeadingElementProps {
  medium?: boolean;
  children: React.ReactNode;
  textColor?: string;
  className?: string;
}

// Merchant Portal
export interface SearchTransactionsForm {
  paymentMethod: string;
  customerEmail: string;
  otcExpirationDate: string;
  customerCellPhone: string;
  otcToken: string;
  orderDate: string;
  customerName: string;
  merchantName: string;
  authId: string;
  batch: string;
  paymentDate: string;
  creditCard: string;
  currency: string;
  integratingBankName: string;
  amount: string;
  bankTransactionId: string;
  orderID: string;
  ddGateway: string;
  ccOrderId: string;
  ddBankName: string;
  transactionReference: string;
  status: string;
  escrowStatus: string;
  settlementtransactionStatus: string;
  value3d: string;
  threeDSecureEnabled: string;
  escrow: string;
  transactionPoint: string;
  channel: string;
  storeID: string;
  fromDate: string;
  toDate: string;
  storeName: string;
}

export interface AddOutletForm {
  outletName: string;
  region: string;
  city: string;
  address: string;
  managerName: string;
  managerMobile: string;
  outletPocName: string;
  outletPocContactNumber: string;
  outletPocEmail: string;
  outletLongitude: number;
  outletLatitude: number;
  outletImage: File | null;
  // numberOfTillsRequired: string;
  categoryCode: string;
  storeType: string[];
}

export interface AddTransactionPointForm {
  outletName: string;
  // transactionPointNumber: string;
  smsNotificationNumber1: string;
  smsNotificationNumber2: string;
  smsNotificationNumber3: string;
  smsNotificationNumber4: string;
  smsNotificationNumber5: string;
  letterHeadImage: File | null;
}

export interface MerchantPortalHomePage {
  graphType: string;
  graphDuration: string;
  from: string;
  to: string;
}

export interface StepType {
  title: string;
  content: string;
  status: string;
  active: boolean;
}

export const stepsData: StepType[] = [
  {
    title: 'Shipping Information',
    content:
      'Enter your shipping address to ensure prompt delivery of your items.',
    status: 'Complete',
    active: true,
  },
  {
    title: 'Request Submitted',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore',

    status: 'In-Progress',
    active: false,
  },
  {
    title: 'Verification In-Progress',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore',
    status: 'Pending',
    active: false,
  },
  {
    title: 'Lorem ipsum dolor',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore',

    status: 'Pending',
    active: false,
  },
  {
    title: 'Lorem ipsum dolor',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore',

    status: 'Pending',
    active: false,
  },
  {
    title: 'Lorem ipsum dolor',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore',

    status: 'Pending',
    active: false,
  },
];
