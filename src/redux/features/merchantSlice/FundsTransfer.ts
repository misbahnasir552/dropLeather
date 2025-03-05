import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TFundsTransfer = {
  isAuthenticated: false,
};

const fundsTransferSlice = createSlice({
  name: 'fundsTransfer',
  initialState,
  reducers: {
    otpSuccess: (state, action: PayloadAction<Partial<TFundsTransfer>>) => {
      state.isAuthenticated = action.payload?.isAuthenticated || false;
    },
    setFundsTransferLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { otpSuccess, setFundsTransferLogout } =
  fundsTransferSlice.actions;
export default fundsTransferSlice.reducer;
