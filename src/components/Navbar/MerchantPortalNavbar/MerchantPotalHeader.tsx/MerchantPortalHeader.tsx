'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import apiClient from '@/api/apiClient';
// import Link from "next/link";
import Logo from '@/assets/icons/logo.svg';
import B2 from '@/components/UI/Body/B2';
import H6 from '@/components/UI/Headings/H6';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';
import { resetForms } from '@/redux/features/formSlices/onBoardingForms';
import { setFundsTransferLogout } from '@/redux/features/merchantSlice/FundsTransfer';

function MerchantPortalHeader() {
  const userData = useAppSelector((state: any) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logOut = async () => {
    try {
      const response = await apiClient.get(
        `/auth/expireJwt?email=${userData.email}`,
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );

      if (response.data.responseCode === '000') {
        dispatch(setLogout());
        dispatch(setFundsTransferLogout());
        dispatch(resetForms());

        router.push('/login');
      } else {
        console.error('logout Error:', response);
      }
    } catch (error) {
      console.error('logout Error:', error);
    }
    dispatch(setLogout());
    dispatch(setFundsTransferLogout());
    dispatch(resetForms());
    router.push('/login');
  };
  return (
    <div className="flex w-full border-b-2 border-border-light py-4 sm:px-6 md:px-[150px]">
      <div className="flex w-full items-center justify-between ">
        <Image
          src={Logo}
          width={173}
          height={28}
          alt="logo"
          className="cursor-pointer"
        />
        <div className="flex cursor-pointer items-center gap-6">
          <div onClick={logOut}>
            <B2 textColor="text-secondary-base cursor-pointer">Logout</B2>
          </div>
          <div className="h-[10px] w-[1px] bg-border-dark" />
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 bg-secondary-base p-[10px]">
            <H6 textColor="text-screen-white">
              {userData?.name?.charAt(0) || ''}
            </H6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantPortalHeader;
