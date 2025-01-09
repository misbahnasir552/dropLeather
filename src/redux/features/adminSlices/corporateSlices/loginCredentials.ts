import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TCredentialsLogin = {
  username: '',
  password: '',
  email: '',
};

const credentialSlice = createSlice({
  name: 'loginCredentials',
  initialState,
  reducers: {
    setLoginCredentials: (state, action: PayloadAction<any>) => {
      console.log('setLoginCredentials success', state, action.payload);

      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    clearCredentials: () => {
      return { ...initialState };
    },
  },
});

export const { setLoginCredentials, clearCredentials } =
  credentialSlice.actions;
export default credentialSlice.reducer;
