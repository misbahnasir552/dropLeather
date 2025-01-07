import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AdditionalFormInfo } from '@/interfaces/interface';
import type { RootState } from '@/redux/store/store'; // Adjust the path as per your project structure
import { AdditionalInfoInitialValues } from '@/validations/merchant/onBoarding/additionalInfo';

const initialState: AdditionalFormInfo = AdditionalInfoInitialValues;

// Define the slice
const additionalFormSlice = createSlice({
  name: 'additionalForm',
  initialState,
  reducers: {
    // Define reducers to update each field of the form
    addForm: (state, action: PayloadAction<Partial<AdditionalFormInfo>>) => {
      console.log('ACTION ADD FORM from redux: ', action.payload);
      Object.assign(state, action.payload);
    },
  },
});

// Export action creators
export const { addForm } = additionalFormSlice.actions;

// Export reducer
export default additionalFormSlice.reducer;

// Export selector if needed
export const selectAddForm = (state: RootState) => state.addForm;
