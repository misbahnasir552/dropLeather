// import type { PayloadAction } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';

// interface SessionState {
//   expiry: number | null; // Expiry timestamp in milliseconds
// }

// const initialState: SessionState = {
//   expiry: null,
// };

// const sessionSlice = createSlice({
//   name: 'session',
//   initialState,
//   reducers: {
//     setSessionExpiry: (state, action: PayloadAction<number>) => {
//       state.expiry = action.payload; // Store expiry time
//     },
//     clearSession: (state) => {
//       state.expiry = null; // Clear session state
//     },
//   },
// });

// export const { setSessionExpiry, clearSession } = sessionSlice.actions;
// export default sessionSlice.reducer;
