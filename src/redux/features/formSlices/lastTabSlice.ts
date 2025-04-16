// src/redux/lastTabSlice.ts

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Initial state for `isLastTab`
interface LastTabState {
  isLastTab: boolean;
}

const initialState: LastTabState = {
  isLastTab: false, // Default value, can be changed later
};

const lastTabSlice = createSlice({
  name: 'lastTab',
  initialState,
  reducers: {
    setIsLastTab: (state, action: PayloadAction<boolean>) => {
      state.isLastTab = action.payload; // This will update the state with the passed value
    },
  },
});

export const { setIsLastTab } = lastTabSlice.actions;
export default lastTabSlice.reducer;
