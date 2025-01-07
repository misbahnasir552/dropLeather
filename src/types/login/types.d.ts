// type TLoginUser = {
//   name: string;
//   email: string;
// };

type TLogin = {
  // user: TLoginUser | null;
  apiKey: string | undefined;
  apiSecret: string | undefined;
  email: null | undefined | string;
  jwt: string | undefined;
  managerMobile: string | undefined;
  loading: boolean;
  success: boolean;

  isAuthenticated: boolean;
  name: string | undefined;
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
