'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { setupApiClient } from '@/api/apiClient';
import { useAppDispatch } from '@/hooks/redux';

const ApiClientProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch(); // Your Redux dispatch
  const router = useRouter(); // Next.js router

  useEffect(() => {
    // Setup the API client with dispatch and router
    console.log('API CLIENT PROVIDER');

    setupApiClient(dispatch, router);
  }, [dispatch, router]);

  return <>{children}</>;
};

export default ApiClientProvider;
