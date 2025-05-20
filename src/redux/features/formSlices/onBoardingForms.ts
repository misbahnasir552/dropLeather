import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  AttachmentFormInfo,
  BusinessFormInfo,
  IntegrationFormInfo,
  SettlementFormInfo,
} from '@/interfaces/interface';

const initialState: any = {
  businessNature: '',
  limitCategory: '',
};

// Define the slice
const onBoardingFormSlice = createSlice({
  name: 'onBoardingForms',
  initialState,
  reducers: {
    // Define reducers to update each field of the form
    setBusinessNature: (state, action: PayloadAction<string>) => {
      console.log('businessNature redux ', action.payload);

      state.businessNature = action.payload;
      // state.businessEndpoint = action.payload;
    },
    setLimitCategory: (state, action: PayloadAction<string>) => {
      console.log('limitCategory redux ', action.payload);

      state.limitCategory = action.payload;
      // state.businessEndpoint = action.payload;
    },
    setBusinessForm: (
      state,
      action: PayloadAction<Partial<BusinessFormInfo>>,
    ) => {
      state.businessForm = action.payload;
    },
    setSettlementForm: (
      state,
      action: PayloadAction<Partial<SettlementFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL,', action.payload);

      state.settlementForm = action.payload;
    },

    setIntegrationForm: (
      state,
      action: PayloadAction<Partial<IntegrationFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL,', action.payload);

      state.integrationForm = action.payload;
    },
    setAttachmentForm: (
      state,
      action: PayloadAction<Partial<AttachmentFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL,', action.payload);

      state.attachmentForm = action.payload;
    },
    setLogoutOnboarding: (state) => {
      console.log('ONBOARD LOGOUT', state, state.onBoardingForms);

      // Reset the state to the initial state
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    },
    resetForms: (initialState) => {
      return initialState;
    },
  },
});

// Export action creators
export const {
  setBusinessNature,
  setLimitCategory,
  setAttachmentForm,
  setBusinessForm,
  setSettlementForm,
  setIntegrationForm,
  resetForms,
  setLogoutOnboarding,
} = onBoardingFormSlice.actions;

// Export reducer
export default onBoardingFormSlice.reducer;

// Export selector if needed
// export const selectAddForm = (state: RootState) => state.setAdditionalForm;
