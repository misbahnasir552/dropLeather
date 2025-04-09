import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TFundsTransfer = {
  isAuthenticated: false,
  navbarRoute: '',
};

const fundsTransferSlice = createSlice({
  name: 'fundsTransfer',
  initialState,
  reducers: {
    otpSuccess: (state, action: PayloadAction<Partial<TFundsTransfer>>) => {
      state.isAuthenticated = action.payload?.isAuthenticated || false;
    },
    setNavbarRoute: (state, action: PayloadAction<any>) => {
      state.navbarRoute = action.payload?.navbarRoute || '';
    },
    setFundsTransferLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { otpSuccess, setFundsTransferLogout, setNavbarRoute } =
  fundsTransferSlice.actions;
export default fundsTransferSlice.reducer;
