import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { addBeneficiaryInitialValues } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/add-beneficiary';
import type { IAddBeneficiary } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';

const addBeneficiarySlice = createSlice({
  name: 'addBeneficiary',
  initialState: addBeneficiaryInitialValues,
  reducers: {
    addBeneficiaryData: (
      state,
      action: PayloadAction<Partial<IAddBeneficiary>>,
    ) => {
      console.log('ACTION ADD FORM: ', action.payload);
      Object.assign(state, action.payload);
    },
    resetBeneficiaryFormData: (state) => {
      console.log('dispatch workingggg');
      console.log(state);
      state = addBeneficiaryInitialValues;
    },
  },
});

export const { addBeneficiaryData, resetBeneficiaryFormData } =
  addBeneficiarySlice.actions;
export const selectFormData = (state: { addBeneficiary: IAddBeneficiary }) =>
  state.addBeneficiary;
export default addBeneficiarySlice.reducer;
