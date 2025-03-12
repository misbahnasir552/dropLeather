'use client';

import React from 'react';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import OnBoardingNavbar from '@/components/Navbar/OnBoardingNavbar/page';
import { useAppSelector } from '@/hooks/redux';

function Layout({ children }: { children: React.ReactNode }) {
  const userData = useAppSelector((state: any) => state.auth);
  const isLoggedIn = !!userData?.email;
  return (
    <div>
      {isLoggedIn ? <OnBoardingNavbar /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
