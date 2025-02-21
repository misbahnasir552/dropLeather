import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState: TLogin = {
  responseCode: '',
  responseMessage: '',
  jwt: '',
  apiSecret: '',
  apiKey: '',
  name: '',
  email: '',
  managerMobile: '',
  expiry: '',
  userType: '',
  isrequestRevision: false,
  lastLogin: '',
  temp: false,
  onboardingCompleted: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Partial<TLogin>>) => {
      console.log('redux login success', action.payload);
      state.responseMessage = action.payload?.responseMessage;
      state.onboardingCompleted = action.payload?.onboardingCompleted || false;
      state.email = action.payload?.email;
      state.name = action.payload?.name;
      state.jwt = action.payload?.jwt;
      state.apiSecret = action.payload?.apiSecret;
      state.apiKey = action.payload?.apiKey;
      state.managerMobile = action.payload?.managerMobile;
      state.expiry = action.payload?.expiry;
      state.userType = action.payload?.userType;
      state.temp = action.payload?.temp || false;
      state.responseCode = action?.payload?.responseCode;
      state.isrequestRevision = action?.payload?.isrequestRevision || false;
    },
    setRequestRevision: (state, action) => {
      console.log('REVISION TEST TEST 2', action.payload);

      state.isrequestRevision = action.payload;
    },
    setLogout: (state) => {
      // clear cache and local storgae as well.
      Cookies.remove('jwt', { path: '/' });
      Cookies.remove('username', { path: '/' });
      Cookies.remove('browser_number', { path: '/' });
      state.responseMessage = '';
      state.email = '';
      state.name = '';
      state.jwt = '';
      state.apiSecret = '';
      state.apiKey = '';
      state.managerMobile = '';
      state.onboardingCompleted = false;
      state.expiry = '';
      state.userType = '';
      state.temp = false;
      state.responseCode = '';
      state.isrequestRevision = false;
    },
  },
});

export const { loginSuccess, setLogout, setRequestRevision } =
  authSlice.actions;
export default authSlice.reducer;
