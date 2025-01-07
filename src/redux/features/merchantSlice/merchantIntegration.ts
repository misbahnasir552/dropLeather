import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TMerchantIntegration = {
  dap: null,
  employee: null,
  cif: null,
  aml: null,
  internalId: null,
  suspendAccount: null,
  emailStatus: null,
  accountTitle: null,
  sellerCode: null,
  // isAuthenticated: false,
};

const merchantIntegrationSlice = createSlice({
  name: 'merchantIntegration',
  initialState,
  reducers: {
    merchantIntegrationSuccess: (
      state,
      action: PayloadAction<Partial<TMerchantIntegration>>,
    ) => {
      console.log('merchant integration success', action.payload);
      state.dap = action.payload?.dap;
      state.employee = action.payload?.employee;
      state.cif = action.payload?.cif;
      state.aml = action.payload?.aml;
      state.internalId = action.payload?.internalId;
      state.suspendAccount = action.payload?.suspendAccount;
      state.emailStatus = action.payload?.emailStatus;
      state.accountTitle = action.payload?.accountTitle;
      state.sellerCode = action.payload?.sellerCode;
    },
    setMerchantIntegrationLogout: (state) => {
      state.dap = null;
      state.employee = null;
      state.cif = null;
      state.aml = null;
      state.internalId = null;
      state.suspendAccount = null;
      state.emailStatus = null;
      state.accountTitle = null;
      state.sellerCode = null;
    },
  },
});

export const { merchantIntegrationSuccess, setMerchantIntegrationLogout } =
  merchantIntegrationSlice.actions;
export default merchantIntegrationSlice.reducer;
