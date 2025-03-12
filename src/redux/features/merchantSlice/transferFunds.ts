import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { fundsTransferInitialValues } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/funds-transfer';
import type { IFundsTransfer } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';

const transferFundsSlice = createSlice({
  name: 'transferFunds',
  initialState: fundsTransferInitialValues,
  reducers: {
    transferFundsData: (
      state,
      action: PayloadAction<Partial<IFundsTransfer>>,
    ) => {
      Object.assign(state, action.payload);
    },
    resetTransferFundsFormData: (state) => {
      console.log(state);
      state = fundsTransferInitialValues;
    },
  },
});
export const { transferFundsData, resetTransferFundsFormData } =
  transferFundsSlice.actions;
export default transferFundsSlice.reducer;
