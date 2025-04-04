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

type TAdminLogin = {
  // user: TLoginUser | null;
  apiKey: string | undefined;
  apiSecret: string | undefined;
  email: null | undefined | string;
  jwt: string | undefined;
  managerMobile: string | undefined;
  expiry: string | undefined;
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
  profileType: string | undefined;
  name: string | undefined;
  pages: [] | undefined;
  adminRole: string | undefined;
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
type TCorporateAccountDetails = {
  accountTitle: null | undefined | string;
  applicantName: null | undefined | string;
  corporateEntity: null | undefined | string;
  emailAddress: null | undefined | string;
  mobileNumber: string | undefined;
  requestStatus: string | undefined;
  ticketId: string | undefined;
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
};

type TUpdateUser = {
  category: null | undefined | string;
  // email: null | undefined | string;
  firstName: string | undefined;
  lastName: string | undefined;
  role: string | undefined;
  profileName: string | undefined;
  // requestStatus: string | undefined;
  loading: boolean;
  success: boolean;
  isAuthenticated: boolean;
};

type TMerchantIntegration = {
  dap: string | null | undefined;
  employee: string | null | undefined;
  cif: string | null | undefined;
  aml: string | null | undefined;
  internalId: string | null | undefined;
  suspendAccount: string | null | undefined;
  emailStatus: string | null | undefined;
  accountTitle: string | null | undefined;
  sellerCode: string | null | undefined;
};
