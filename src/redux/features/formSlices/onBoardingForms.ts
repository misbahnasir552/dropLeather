import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  ActivityFormInfo,
  AdditionalFormInfo,
  ApplicationFormInfo,
  AttachmentFormInfo,
  BusinessFormInfo,
  CorporateAttachmentFormInfo,
  IntegrationFormInfo,
  SettlementFormInfo,
} from '@/interfaces/interface';
// import type { RootState } from '@/redux/store/store'; // Adjust the path as per your project structure
import { ActivityFormInfoInitialValues } from '@/validations/merchant/onBoarding/activityInfo';
import { AdditionalInfoInitialValues } from '@/validations/merchant/onBoarding/additionalInfo';
import { ApplicationFormInfoInitialValues } from '@/validations/merchant/onBoarding/applicationForm';
import { AttachmentFormInfoInitialValues } from '@/validations/merchant/onBoarding/attachmentInfo';
import { BusinessInfoInitialValues } from '@/validations/merchant/onBoarding/businessInfo';
import { CorporateChecklistFormInitialValues } from '@/validations/merchant/onBoarding/checklist';
import { IntegrationFormInfoInitialValues } from '@/validations/merchant/onBoarding/integrationInfo';
import { SettlementFormInfoInitialValues } from '@/validations/merchant/onBoarding/settlementInfo';

const initialState: any = {
  businessNature: '',
  corporateProducts: '',
  managedDisbursementProducts: '',
  othersProducts: '',
  selfServeProducts: '',
  chequeBookRequired: '',
  soleName: '',
  corporateEntity: '',

  activityForm: ActivityFormInfoInitialValues,
  additionalForm: AdditionalInfoInitialValues,
  businessForm: BusinessInfoInitialValues,
  settlementForm: SettlementFormInfoInitialValues,
  integrationForm: IntegrationFormInfoInitialValues,
  attachmentForm: AttachmentFormInfoInitialValues,
  addApplicants: [],
  applicationForm: ApplicationFormInfoInitialValues,
  checklistForm: CorporateChecklistFormInitialValues,
  corporateChecklistStatus: '',
  CorporateAttachmentsStatus: '',
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
    },
    setCorporateEntity: (state, action: PayloadAction<string>) => {
      state.corporateEntity = action.payload;
    },
    setCorporateChecklistStatus: (state, action: PayloadAction<string>) => {
      state.corporateChecklistStatus = action.payload;
    },
    setCorporateAttachmentStatus: (state, action: PayloadAction<string>) => {
      state.corporateAttachmentsStatus = action.payload;
    },
    setSoleName: (state, action: PayloadAction<string>) => {
      state.soleName = action.payload;
    },
    setApplicationForm: (
      state,
      // action: PayloadAction<Partial<any>>,
      action: PayloadAction<Partial<ApplicationFormInfo>>,
    ) => {
      state.applicationForm = action.payload;
      // state.applicationForm = action.payload?.applicationForm;
    },
    // setApplicants: (
    //   state,
    //   action: PayloadAction<any>, // Accept an array of applicant objects
    // ) => {
    //   if (!Array.isArray(state.addApplicants)) {
    //     state.addApplicants = []; // Ensure it's an array if not initialized
    //   }
    //   console.log(action.payload, 'SET APPLICANT REDUX DATA');

    //   state.addApplicants = [...state.addApplicants, action.payload]; // Append new objects to the applicants array
    // },

    setApplicants: (
      state,
      action: PayloadAction<any>, // Accept a single object or an array of objects
    ) => {
      if (!Array.isArray(state.addApplicants)) {
        state.addApplicants = []; // Ensure it's an array if not initialized
      }
      console.log('APPLICANT REDUX ', action.payload);

      const newApplicants = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      // const existingIds = new Set(
      //   state.addApplicants.map((applicant: { id: any }) => applicant.id),
      // );

      // const uniqueApplicants = newApplicants.filter(
      //   (newApplicant) => !existingIds.has(newApplicant.id),
      // );

      // console.log("NEW CHECK ", action.payload, uniqueApplicants);

      // state.addApplicants = [...state.addApplicants, ...uniqueApplicants];

      const existingApplicantsMap = new Map(
        state.addApplicants.map((applicant: { id: any }) => [
          applicant.id,
          applicant,
        ]),
      );

      // Iterate through the new applicants
      newApplicants.forEach((newApplicant) => {
        if (existingApplicantsMap.has(newApplicant.id)) {
          // Replace the existing applicant with the new one
          existingApplicantsMap.set(newApplicant.id, newApplicant);
        } else {
          // Add the new applicant if it doesn't already exist
          existingApplicantsMap.set(newApplicant.id, newApplicant);
        }
      });

      // Update the state with the updated list of applicants
      state.addApplicants = Array.from(existingApplicantsMap.values());
    },

    clearApplicants: (state) => {
      state.addApplicants = []; // Clear the applicants array
    },
    setChecklistForm: (
      state,
      action: PayloadAction<Partial<CorporateAttachmentFormInfo>>,
    ) => {
      state.checklistForm = action.payload;
    },
    setActivityForm: (
      state,
      action: PayloadAction<Partial<ActivityFormInfo>>,
    ) => {
      state.activityForm = action.payload;
    },
    setAdditionalForm: (
      state,
      action: PayloadAction<Partial<AdditionalFormInfo>>,
    ) => {
      state.additionalForm = action.payload;
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
  setSoleName,
  setCorporateEntity,
  setAdditionalForm,
  setAttachmentForm,
  setBusinessForm,
  setSettlementForm,
  setApplicants,
  clearApplicants,
  setIntegrationForm,
  setActivityForm,
  setChecklistForm,
  setApplicationForm,
  setCorporateChecklistStatus,
  setCorporateAttachmentStatus,
  resetForms,
  setLogoutOnboarding,
} = onBoardingFormSlice.actions;

// Export reducer
export default onBoardingFormSlice.reducer;

// Export selector if needed
// export const selectAddForm = (state: RootState) => state.setAdditionalForm;
