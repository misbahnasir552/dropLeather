import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SignupForm = {
  firstName: '',
  lastName: '',
  merchantName: '',
  email: '',
  managerMobile: '',
  website: '',
  password: '',
  merchantType: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<Partial<SignupForm>>) => {
      console.log('ACTION ADD FORM: ', action.payload);

      Object.assign(state, action.payload);
    },
    resetFormData: (state) => {
      console.log('dispatch workingggg');
      console.log(state);
      state = initialState;
    },
  },
});

export const { addFormData, resetFormData } = signupSlice.actions;
export const selectFormData = (state: { signup: SignupForm }) => state.signup;
export default signupSlice.reducer;
