import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '@/redux/features/authSlice';
import loginCredentialsReducer from '@/redux/features/corporateSlices/loginCredentials';
import fieldReducer from '@/redux/features/formSlices/fieldSlice';
import lastTabReducer from '@/redux/features/formSlices/lastTabSlice';
import onBoardingFormsReducer from '@/redux/features/formSlices/onBoardingForms';
import addBeneficiaryReducer from '@/redux/features/merchantSlice/addBeneficiary';
import fundsTransferReducer from '@/redux/features/merchantSlice/FundsTransfer';
import transferFundsReducer from '@/redux/features/merchantSlice/transferFunds';
import signupReducer from '@/redux/features/signUpSlice';
// import sessionSliceReducer from '../features/sessionSlice/sessionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    'signup',
    'auth',
    'onBoardingForms',
    'fundsTransfer',
    'addBeneficiary',
    'fields',

    // 'session',
    'loginCredentials',
    'transferFunds',
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  signup: signupReducer,
  onBoardingForms: onBoardingFormsReducer,
  fundsTransfer: fundsTransferReducer,
  addBeneficiary: addBeneficiaryReducer,
  // session: sessionSliceReducer,
  loginCredentials: loginCredentialsReducer,
  lastTab: lastTabReducer,
  transferFunds: transferFundsReducer,
  fields: fieldReducer,
});

const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
