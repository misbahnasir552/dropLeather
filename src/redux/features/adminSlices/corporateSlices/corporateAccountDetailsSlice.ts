import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TCorporateAccountDetails = {
  accountTitle: '',
  applicantName: '',
  corporateEntity: '',
  emailAddress: '',
  mobileNumber: '',
  requestStatus: '',
  ticketId: '',
  loading: false,
  success: false,
  isAuthenticated: false,
};

const corporateAccountDetailsSlice = createSlice({
  name: 'corporateAccountDetails',
  initialState,
  reducers: {
    corporateAccountDetailSuccess: (
      state,
      action: PayloadAction<Partial<TCorporateAccountDetails>>,
    ) => {
      // console.log("redux view/get details success", action.payload);
      state.accountTitle = action.payload?.accountTitle;
      state.applicantName = action.payload?.applicantName;
      state.corporateEntity = action.payload?.corporateEntity;
      state.emailAddress = action.payload?.emailAddress;
      state.mobileNumber = action.payload?.mobileNumber;

      state.requestStatus = action.payload?.requestStatus;
      state.ticketId = action.payload?.ticketId;
    },
    setcorporateAccountDetailEmpty: (state) => {
      state.accountTitle = '';
      state.applicantName = '';
      state.corporateEntity = '';
      state.emailAddress = '';
      state.mobileNumber = '';
      state.requestStatus = '';
      state.ticketId = '';
    },
  },
});

export const { corporateAccountDetailSuccess, setcorporateAccountDetailEmpty } =
  corporateAccountDetailsSlice.actions;
export default corporateAccountDetailsSlice.reducer;
