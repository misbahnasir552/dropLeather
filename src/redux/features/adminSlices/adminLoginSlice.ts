import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TAdminLogin = {
  name: '',
  email: '',
  apiKey: '',
  apiSecret: '',
  jwt: '',
  managerMobile: '',
  expiry: '',
  loading: false,
  success: false,
  pages: [],
  profileType: '',
  adminRole: '',
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLoginSuccess: (state, action: PayloadAction<Partial<TAdminLogin>>) => {
      console.log('redux admin login success', action.payload);
      state.isAuthenticated = true;
      state.email = action.payload?.email;
      state.name = action.payload?.name;
      state.jwt = action.payload?.jwt;
      state.apiSecret = action.payload?.apiSecret;
      state.apiKey = action.payload?.apiKey;
      state.managerMobile = action.payload?.managerMobile;
      state.pages = action.payload?.pages;
      state.expiry = action.payload?.expiry;
      state.profileType = action.payload?.profileType;
      state.adminRole = action.payload?.adminRole;
    },
    setAdminLogout: (state) => {
      state.isAuthenticated = false;
      state.email = '';
      state.name = '';
      state.jwt = '';
      state.apiSecret = '';
      state.apiKey = '';
      state.managerMobile = '';
      state.pages = [];
      state.expiry = '';
      state.profileType = '';
      state.adminRole = '';
    },
  },
});

export const { adminLoginSuccess, setAdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
