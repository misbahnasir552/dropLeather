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
import additionalFormReducer from '@/redux/features/formSlices/additionalFormSlice';
import onBoardingFormsReducer from '@/redux/features/formSlices/onBoardingForms';
import signupReducer from '@/redux/features/signUpSlice';

import loginCredentialsReducer from '../features/corporateSlices/loginCredentials';
import fieldReducer from '../features/formSlices/fieldSlice';
import lastTabReducer from '../features/formSlices/lastTabSlice';
import addBeneficiaryReducer from '../features/merchantSlice/addBeneficiary';
import fundsTransferReducer from '../features/merchantSlice/FundsTransfer';
import merchantDetailsReducer from '../features/merchantSlice/merchantDetails';
import merchantIntegrationReducer from '../features/merchantSlice/merchantIntegration';
import transferFundsReducer from '../features/merchantSlice/transferFunds';
// import sessionSliceReducer from '../features/sessionSlice/sessionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    'signup',
    'auth',
    'additionalForm',
    'onBoardingForms',
    'merchantDetails',
    'merchantIntegration',
    'fundsTransfer',
    'fields',
    'addBeneficiary',

    // 'session',
    'loginCredentials',
    'transferFunds',
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  signup: signupReducer,
  additionalForm: additionalFormReducer,
  onBoardingForms: onBoardingFormsReducer,
  merchantDetails: merchantDetailsReducer,
  merchantIntegration: merchantIntegrationReducer,
  fundsTransfer: fundsTransferReducer,
  fields: fieldReducer,
  addBeneficiary: addBeneficiaryReducer,
  // session: sessionSliceReducer,
  loginCredentials: loginCredentialsReducer,
  lastTab: lastTabReducer,
  transferFunds: transferFundsReducer,
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
