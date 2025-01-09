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

import adminAuthReducer from '@/redux/features/adminSlices/adminLoginSlice';
import corporateAccountDetailsReducer from '@/redux/features/adminSlices/corporateSlices/corporateAccountDetailsSlice';
import corporateJourneyTypeReducer from '@/redux/features/adminSlices/corporateSlices/corporateJourneyTypeSlice';
import updateUserReducer from '@/redux/features/adminSlices/updateUserSlice/updateUserSlice';
import authReducer from '@/redux/features/authSlice';
import additionalFormReducer from '@/redux/features/formSlices/additionalFormSlice';
import onBoardingFormsReducer from '@/redux/features/formSlices/onBoardingForms';
import signupReducer from '@/redux/features/signUpSlice';

import loginCredentialsReducer from '../features/corporateSlices/loginCredentials';
import fieldReducer from '../features/formSlices/fieldSlice';
import addBeneficiaryReducer from '../features/merchantSlice/addBeneficiary';
import merchantDetailsReducer from '../features/merchantSlice/merchantDetails';
import merchantIntegrationReducer from '../features/merchantSlice/merchantIntegration';
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
    'fields',
    'adminAuth',
    'corporateAccountDetails',
    'updateUser',
    'addBeneficiary',
    'corporateJourneyType',
    // 'session',
    'loginCredentials',
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  signup: signupReducer,
  additionalForm: additionalFormReducer,
  onBoardingForms: onBoardingFormsReducer,
  merchantDetails: merchantDetailsReducer,
  corporateAccountDetails: corporateAccountDetailsReducer,
  merchantIntegration: merchantIntegrationReducer,
  fields: fieldReducer,
  adminAuth: adminAuthReducer,
  updateUser: updateUserReducer,
  addBeneficiary: addBeneficiaryReducer,
  corporateJourneyType: corporateJourneyTypeReducer,
  // session: sessionSliceReducer,
  loginCredentials: loginCredentialsReducer,
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
