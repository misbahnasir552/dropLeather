import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TUpdateUser = {
  category: '',
  // email: '',
  firstName: '',
  lastName: '',
  role: '',
  profileName: '',
  // profileName:''
  // requestStatus: '',
  loading: false,
  success: false,
  isAuthenticated: false,
};

const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    userUpdateSuccess: (state, action: PayloadAction<Partial<TUpdateUser>>) => {
      console.log('redux user details success', action.payload);
      state.category = action.payload?.category;
      // state.email = action.payload?.email;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.role = action.payload?.role;
      state.profileName = action.payload?.profileName;
      // state.requestStatus = action.payload?.requestStatus;
    },
    setLogout: (state) => {
      state.category = '';
      // state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.role = '';
      state.profileName = '';
      // state.requestStatus = '';
    },
  },
});

export const { userUpdateSuccess, setLogout } = updateUserSlice.actions;
export default updateUserSlice.reducer;
