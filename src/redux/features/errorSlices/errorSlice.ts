import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TApiError = {
  apiError: string;
};

const initialState: TApiError = {
  apiError: '',
};

const apiErrorSlice = createSlice({
  name: 'apiError',
  initialState,
  reducers: {
    setApiError: (state, action: PayloadAction<TApiError>) => {
      console.log('api error', action.payload);
      state.apiError = action.payload?.apiError;
    },
    clearApiError: (state) => {
      state.apiError = '';
    },
  },
});

export const { setApiError, clearApiError } = apiErrorSlice.actions;
export default apiErrorSlice.reducer;
