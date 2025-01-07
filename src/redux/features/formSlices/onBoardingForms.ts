import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  ActivityFormInfo,
  AdditionalFormInfo,
  AttachmentFormInfo,
  BusinessFormInfo,
  IntegrationFormInfo,
  SettlementFormInfo,
} from '@/interfaces/interface';
// import type { RootState } from '@/redux/store/store'; // Adjust the path as per your project structure
import { ActivityFormInfoInitialValues } from '@/validations/merchant/onBoarding/activityInfo';
import { AdditionalInfoInitialValues } from '@/validations/merchant/onBoarding/additionalInfo';
import { AttachmentFormInfoInitialValues } from '@/validations/merchant/onBoarding/attachmentInfo';
import { BusinessInfoInitialValues } from '@/validations/merchant/onBoarding/businessInfo';
import { IntegrationFormInfoInitialValues } from '@/validations/merchant/onBoarding/integrationInfo';
import { SettlementFormInfoInitialValues } from '@/validations/merchant/onBoarding/settlementInfo';

const initialState: any = {
  activityForm: ActivityFormInfoInitialValues,
  additionalForm: AdditionalInfoInitialValues,
  businessForm: BusinessInfoInitialValues,
  settlementForm: SettlementFormInfoInitialValues,
  integrationForm: IntegrationFormInfoInitialValues,
  attachmentForm: AttachmentFormInfoInitialValues,
};

// Define the slice
const onBoardingFormSlice = createSlice({
  name: 'onBoardingForms',
  initialState,
  reducers: {
    // Define reducers to update each field of the form
    setActivityForm: (
      state,
      action: PayloadAction<Partial<ActivityFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL activity form,', action.payload);

      state.activityForm = action.payload;
    },
    setAdditionalForm: (
      state,
      action: PayloadAction<Partial<AdditionalFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL,', action.payload);

      state.additionalForm = action.payload;
    },
    setBusinessForm: (
      state,
      action: PayloadAction<Partial<BusinessFormInfo>>,
    ) => {
      console.log('REDUX TESTING SUCCESSFUL,', action.payload);

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
    resetForms: (initialState) => {
      return initialState;
    },
  },
});

// Export action creators
export const {
  setAdditionalForm,
  setAttachmentForm,
  setBusinessForm,
  setSettlementForm,
  setIntegrationForm,
  setActivityForm,
  resetForms,
} = onBoardingFormSlice.actions;

// Export reducer
export default onBoardingFormSlice.reducer;

// Export selector if needed
// export const selectAddForm = (state: RootState) => state.setAdditionalForm;
