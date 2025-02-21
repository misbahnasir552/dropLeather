'use client';

// import Image from "next/image";
// import Link from "next/link";
import Link from 'next/link';
import React, { useState } from 'react';

import {
  getAccountSettingsDropDownMenu,
  getConfigurationDropDownMenu,
  getQRPaymentsDropDownMenu,
} from '@/components/Navbar/Utils/utils';
// import Logo from "@/assets/icons/logo.svg";
import B2 from '@/components/UI/Body/B2';

// import H6 from "@/components/UI/Headings/H6";
import ConfigurationDropDown from '../NavDropDowns/MerchantPortalNav/ConfigurationDropDown';

const MerchantPortalNavbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const configurationList = getConfigurationDropDownMenu();
  const accountSettingsList = getAccountSettingsDropDownMenu();
  const qrList = getQRPaymentsDropDownMenu();

  const merchantPortalNavMenu = [
    {
      title: 'Home',
      link: '/merchant/merchant-portal/home',
    },
    {
      title: 'Transaction History',
      link: '/merchant/merchant-portal/configuration/transactions-history',
    },
    {
      title: 'Configuration',
      className: 'left-[24%]',
      link: '/merchant/merchant-portal/home',
      dropdown: configurationList,
    },
    {
      title: 'Account Settings',
      className: 'left-[32%]',
      link: '/merchant/merchant-portal/home',
      dropdown: accountSettingsList,
    },
    {
      title: 'Integration Guide',
      link: '/merchant/merchant-portal/home',
    },
    {
      title: 'QR Payments',
      // link: '/merchant/merchant-portal/qr-payments',
      dropdown: qrList,
    },
    {
      title: 'Settlement Module',
      // link: '/merchant/merchant-portal/home',
    },
    {
      title: 'Reversal Module',
      link: '/merchant/merchant-portal/reversal-module',
    },
    {
      title: 'Merchant Funds Transfer',
      link: '/merchant/merchant-portal/merchant-funds-transfer',
    },
  ];
  return (
    <>
      <nav className="flex w-full justify-between overflow-auto shadow-[0px_2px_6px_0px_rgba(51,_51,_51,_0.08)] sm:px-6 md:px-[150px]">
        {merchantPortalNavMenu.map((item, index, arr) => (
          <React.Fragment key={index}>
            <div className="item-center flex">
              <div
                className="flex cursor-pointer items-center justify-center py-5"
                onMouseEnter={() => setHoveredMenu(item.title)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {item.link ? (
                  <Link href={item.link}>
                    <B2 textColor={`hover:text-primary-base`}>{item.title}</B2>
                  </Link>
                ) : (
                  <B2 textColor={`hover:text-primary-base`}>{item.title}</B2>
                )}
                {item.dropdown && hoveredMenu === item.title && (
                  <ConfigurationDropDown
                    className={item.className}
                    data={item.dropdown}
                    hoveredMenu={hoveredMenu}
                    setHoveredMenu={setHoveredMenu}
                  />
                )}
              </div>
            </div>
            {index < arr.length - 1 && (
              <div className="flex items-center">
                <div className="h-[10px] w-[1px] bg-border-dark" />
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default MerchantPortalNavbar;
