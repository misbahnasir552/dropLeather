import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TMerchantDetails = {
  cnic: '',
  emailAddress: '',
  merchantName: '',
  mobileNumber: '',
  requestStatus: '',
  loading: false,
  success: false,
  isAuthenticated: false,
};

const merchantDetailsSlice = createSlice({
  name: 'merchantDetails',
  initialState,
  reducers: {
    merchantSuccess: (
      state,
      action: PayloadAction<Partial<TMerchantDetails>>,
    ) => {
      // console.log("redux view/get details success", action.payload);
      state.cnic = action.payload?.cnic;
      state.emailAddress = action.payload?.emailAddress;
      state.merchantName = action.payload?.merchantName;
      state.mobileNumber = action.payload?.mobileNumber;
      state.requestStatus = action.payload?.requestStatus;
    },
    setLogout: (state) => {
      state.cnic = '';
      state.emailAddress = '';
      state.merchantName = '';
      state.mobileNumber = '';
      state.requestStatus = '';
    },
  },
});

export const { merchantSuccess, setLogout } = merchantDetailsSlice.actions;
export default merchantDetailsSlice.reducer;
