'use client';

import React, { useEffect } from 'react';

import apiClient from '@/api/apiClient';
import Timeline from '@/components/Timeline/Timeline';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess } from '@/redux/features/authSlice';

const Layout = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);
  useEffect(() => {
    const refreshToken = async () => {
      try {
        // const response=  await apiClient.post('auth/refreshJwt',
        //   // await apiClient.post('auth/refreshJwt', requestBody, {

        //     headers: {
        //       // Authorization: `Bearer ${userData.jwt}`,
        //       Username: "kjskj"
        //       // userData?.email,
        //     ,
        //   });

        const response: any = await apiClient.post(
          'auth/refreshJwt',
          {},
          {
            headers: {
              username: userData.email,
            },
          },
        );
        console.log('JWT refreshed');
        if (response?.data?.responseCode === '000') {
          dispatch(loginSuccess({ ...userData, jwt: response.data.jwt }));
          // dispatch(loginSuccess(response.data.jwt));
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    // Call once on mount
    refreshToken();

    // Set interval for 15 minutes
    const interval = setInterval(refreshToken, 15 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 pb-[120px]">
        <Timeline />
        {children}
      </div>
    </>
  );
};

export default Layout;
