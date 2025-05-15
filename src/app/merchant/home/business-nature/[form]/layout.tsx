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

    refreshToken();

    const interval = setInterval(refreshToken, 15 * 60 * 1000);

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
