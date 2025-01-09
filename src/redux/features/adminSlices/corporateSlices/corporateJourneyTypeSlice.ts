import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TCorporateJourneyType = {
  journeyType: string;
};

const initialState: TCorporateJourneyType = {
  journeyType: '',
};

const corporateJourneyTypeSlice = createSlice({
  name: 'corporateJourneyType',
  initialState,
  reducers: {
    // setJourneyType: (state, action: PayloadAction<Partial<TCorporateJourneyType>>) => {
    //   console.log('corporate journey success', action.payload);
    //   state.journeyType = action.payload;
    // },

    setJourneyType: (state, action: PayloadAction<string>) => {
      console.log('corporate journey success', action.payload);
      state.journeyType = action.payload;
    },
    setJourneyTypeEmpty: (state) => {
      state.journeyType = '';
    },
  },
});

export const { setJourneyType, setJourneyTypeEmpty } =
  corporateJourneyTypeSlice.actions;
export default corporateJourneyTypeSlice.reducer;

// dispatch(setJourneyTycorporateJourneyType
