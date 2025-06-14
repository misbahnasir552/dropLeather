// type TLoginUser = {
//   name: string;
//   email: string;
// };

type TLogin = {
  responseCode: string | undefined;
  responseMessage: string | undefined;
  jwt: string | undefined;
  apiSecret: string | undefined;
  apiKey: string | undefined;
  name: string | undefined;
  email: string | undefined;
  managerMobile: string | undefined;
  expiry: string | undefined;
  userType: string | undefined;
  isrequestRevision: boolean;
  lastLogin: string | undefined;
  temp: boolean;
  onboardingCompleted: boolean;
};

type TCredentialsLogin = {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  mobileNumber?: string | undefined;
};

type TMerchantDetails = {
  cnic: null | undefined | string;
  emailAddress: null | undefined | string;
  merchantName: string | undefined;
  mobileNumber: string | undefined;
  requestStatus: string | undefined;
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
};
type TFundsTransfer = {
  isAuthenticated: boolean;
  navbarRoute?: string;
};
