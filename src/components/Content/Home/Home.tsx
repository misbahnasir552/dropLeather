'use client';

import Link from 'next/link';
import React from 'react';

import HeroBanner from '@/components/Content/HeroBanner/HeroBanner';
import MerchantMethods from '@/components/Content/MerchantMethods/MerchantMethods';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import OnBoardingNavbar from '@/components/Navbar/OnBoardingNavbar/page';
import Card from '@/components/UI/Card/Card';
import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
import { useAppSelector } from '@/hooks/redux';
import { cards } from '@/utils/data';

const Home = (): JSX.Element => {
  const userData = useAppSelector((state: any) => state.auth);
  const isLoggedIn = !!userData?.email;
  return (
    <>
      {isLoggedIn ? <OnBoardingNavbar /> : <Navbar />}
      <HeroBanner />
      {/* <Info
        cardsArray={cards}
      //  title={'home'}
      /> */}
      <UIWrapper>
        <Header
          title={{ main: 'Designed for', sub: 'Entrepreneurs (deployed)' }}
          description={
            'Our portal accelerates your financial journey. Experience hasslle-free payments and sieze new opportunities.'
          }
        />
        <div className="flex flex-row gap-5 sm:max-md:flex-col">
          {cards?.map((item, index) => {
            return (
              <Link key={index} href={item.link}>
                <Card
                  key={index}
                  logo={item.logo}
                  label={item.label}
                  description={item.description}
                />
              </Link>
            );
          })}
        </div>
      </UIWrapper>
      <MerchantMethods />
      <Footer />
    </>
  );
};

export default Home;
