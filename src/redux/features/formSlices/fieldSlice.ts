import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Validation {
  required: boolean;
  minLength: number;
  maxLength: number;
  options: string[] | null;
  pattern: string;
  errorMessage: string;
}

interface Field {
  type: string;
  label: string;
  name: string;
  image: string | null;
  placeholder: string;
  priority: number;
  validation: Validation;
}

interface Category {
  categoryName: string;
  fields: Field[];
}

interface Page {
  name: string;
  categories: Category[];
}

interface InitialState {
  pages: Page[];
  loading: boolean;
  success: boolean;
}

const initialState: InitialState = {
  pages: [
    {
      name: 'Activity Information',
      categories: [
        {
          categoryName: 'Contact Details',
          fields: [],
        },
        {
          categoryName: "Merchant's Details",
          fields: [],
        },
      ],
    },
    {
      name: 'Settlement Details',
      categories: [
        {
          categoryName:
            'Settlement Details(Select the account you would like to have)',
          fields: [],
        },
      ],
    },
  ],
  loading: false,
  success: false,
};

const dataSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setPageData: (state, action: PayloadAction<Page[]>) => {
      console.log('SET PAGE DATA', action.payload);

      state.pages = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    resetFields: () => {
      return { ...initialState };
    },
  },
});

export const { setPageData, setLoading, setSuccess, resetFields } =
  dataSlice.actions;
export default dataSlice.reducer;
