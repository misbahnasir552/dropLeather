// 'use client';

// import { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import apiClient from '@/api/apiClient';
// import { useAppDispatch, useAppSelector } from './redux';
// import { setLogout } from '@/redux/features/authSlice';
// import { clearCredentials } from '@/redux/features/corporateSlices/loginCredentials';
// import { setLogoutOnboarding } from '@/redux/features/formSlices/onBoardingForms';
// import { resetFields } from '@/redux/features/formSlices/fieldSlice';

// const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes in milliseconds

// const useInactivityHandler = () => {
//   const userData = useAppSelector((state: any) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   let timeoutId: NodeJS.Timeout;
//   if (!userData?.email) {
//     return null;
//   }

//   const handleInactivity = async () => {
//     console.log("handleInactivity");

//     try {
//       const response = await apiClient.get(
//         `/auth/expireJwt?email=${userData.email}`,
//         { headers: { Authorization: `Bearer ${userData.jwt}` } },
//       );
//       // eslint-disable-next-line no-alert
//       alert('Session expired due to inactivity. Please log in again.');

//       // Redirect the user to the login page

//       if (response.data.responseCode === '000') {
//         dispatch(setLogout());
//         router.push('/login');

//         setTimeout(() => {
//           dispatch(clearCredentials());
//           dispatch(setLogoutOnboarding());
//           dispatch(resetFields());
//         }, 5000);
//       } else {
//         console.error('logout Error:', response);
//       }
//     } catch (error) {
//       console.error('Error expiring JWT:', error);
//     }
//     // try {
//     //   // Make an API call to expire the JWT
//     //   await axios.post('/api/auth/expire-jwt'); // Replace with your API endpoint
//     //   alert('Session expired due to inactivity. Please log in again.');

//     //   // Redirect the user to the login page
//     //   Router.push('/login');
//     // } catch (error) {
//     //   console.error('Error expiring JWT:', error);
//     // }
//   };

//   const resetInactivityTimer = useCallback(() => {
//     console.log("resetInactivityTimer");

//     // Clear the existing timer
//     clearTimeout(timeoutId);

//     // Start a new timer
//     timeoutId = setTimeout(() => {
//       handleInactivity();
//     }, INACTIVITY_LIMIT);
//   }, []);

//   useEffect(() => {
//     // Reset the inactivity timer on user interaction
//     console.log("USEEFFECT OF INACTIVLITY HANDLER");

//     const events = ['mousemove', 'keydown', 'click'];
//     events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

//     // Set the initial inactivity timer
//     resetInactivityTimer();

//     return () => {
//       // Cleanup listeners and timer
//       events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
//       clearTimeout(timeoutId);
//     };
//   }, [resetInactivityTimer]);

//   return null;
// };

// export default useInactivityHandler;

'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import apiClient from '@/api/apiClient';
import { setAdminLogout } from '@/redux/features/adminSlices/adminLoginSlice';
import { setcorporateAccountDetailEmpty } from '@/redux/features/adminSlices/corporateSlices/corporateAccountDetailsSlice';
import { setLogout } from '@/redux/features/authSlice';
import { clearCredentials } from '@/redux/features/corporateSlices/loginCredentials';
import { resetFields } from '@/redux/features/formSlices/fieldSlice';
import {
  resetForms,
  setLogoutOnboarding,
} from '@/redux/features/formSlices/onBoardingForms';

import { useAppDispatch, useAppSelector } from './redux';

const INACTIVITY_LIMIT = 2 * 60 * 1000; // 15 minutes in milliseconds

const useInactivityHandler = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const adminData = useAppSelector((state: any) => state.adminAuth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleInactivity = useCallback(async () => {
    console.log('handleInactivity');
    try {
      if (userData?.email) {
        console.log('RUNNING USER EMAIL CASE');

        const response = await apiClient.get(
          `/auth/expireJwt?email=${userData?.email}`,
          { headers: { Authorization: `Bearer ${userData?.jwt}` } },
        );
        console.log('MErchant PORTAL TEST 1');

        if (response?.data.responseCode === '000') {
          console.log('Merchant PORTAL TEST 2');

          // Alert the user about session expiration
          // eslint-disable-next-line no-alert
          alert('Session expired due to inactivity. Please log in again.');

          // Handle logout actions
          dispatch(setLogout());
          dispatch(resetForms());

          // Clear additional state after logout
          // setTimeout(() => {
          dispatch(clearCredentials());
          dispatch(setLogoutOnboarding());
          dispatch(resetFields());
          router.push('/login');
          // }, 5000);
        } else {
          console.error('Logout error:', response);
        }
      } else {
        console.log('RUNNING ADMIN EMAIL CASE');

        const response = await apiClient.get(
          `/auth/expireJwt?email=${adminData?.email}`,
          { headers: { Authorization: `Bearer ${adminData?.jwt}` } },
        );
        console.log('ADMIN PORTAL TEST 1');

        if (response?.data.responseCode === '000') {
          console.log('ADMIN PORTAL TEST 2');

          // eslint-disable-next-line no-alert
          alert('Session expired due to inactivity. Please log in again.');

          // Handle logout actions
          dispatch(setAdminLogout());
          dispatch(resetForms());
          dispatch(clearCredentials());
          dispatch(setcorporateAccountDetailEmpty());
          router.push('/admin-auth/login');
        } else {
          console.log('ADMIN PORTAL TEST 3');
          console.error('Logout error:', response);
        }
      }
    } catch (error) {
      console.error('Error expiring JWT:', error);
    }
  }, [
    dispatch,
    router,
    adminData.email,
    adminData.jwt,
    userData.email,
    userData.jwt,
  ]);

  const resetInactivityTimer = useCallback(() => {
    console.log('resetInactivityTimer');

    // Clear the existing timer
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Start a new timer
    timeoutIdRef.current = setTimeout(() => {
      handleInactivity();
    }, INACTIVITY_LIMIT);
  }, [handleInactivity]);

  useEffect(() => {
    console.log(
      'USEEFFECT OF INACTIVITY HANDLERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    );

    if (!userData?.email && !adminData?.email) {
      console.log('RUN for userdata:', userData, 'admin data:', adminData);
      return;
    }

    // Events to track user activity
    const events = ['mousemove', 'keydown', 'click'];

    // Attach event listeners
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer),
    );

    // Set the initial inactivity timer
    resetInactivityTimer();

    return () => {
      // Cleanup listeners and timer
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer),
      );
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [userData?.email, adminData?.email, resetInactivityTimer]);

  return null;
};

export default useInactivityHandler;
