import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TLogin = {
  name: '',
  email: '',
  apiKey: '',
  apiSecret: '',
  jwt: '',
  managerMobile: '',
  loading: false,
  success: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Partial<TLogin>>) => {
      // console.log('redux login success', action.payload);
      state.isAuthenticated = true;
      state.email = action.payload?.email;
      state.name = action.payload?.name;
      state.jwt = action.payload?.jwt;
      state.apiSecret = action.payload?.apiSecret;
      state.apiKey = action.payload?.apiKey;
      state.managerMobile = action.payload?.managerMobile;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.email = '';
      state.name = '';
      state.jwt = '';
      state.apiSecret = '';
      state.apiKey = '';
      state.managerMobile = '';
    },
  },
});

export const { loginSuccess, setLogout } = authSlice.actions;
export default authSlice.reducer;
