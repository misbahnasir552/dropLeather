'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import {
  getAccountSettingsDropDownMenu,
  getConfigurationDropDownMenu,
  getMerchantFundsTransferDropDownMenu,
  getQRPaymentsDropDownMenu,
  getReversalModuleDropDownMenu,
} from '@/components/Navbar/Utils/utils';
import B2 from '@/components/UI/Body/B2';
import { useAppSelector } from '@/hooks/redux';

import ConfigurationDropDown from '../NavDropDowns/MerchantPortalNav/ConfigurationDropDown';

const MerchantPortalNavbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const configurationList = getConfigurationDropDownMenu();
  const accountSettingsList = getAccountSettingsDropDownMenu();
  const qrList = getQRPaymentsDropDownMenu();
  const otpSuccess = useAppSelector((state: any) => state.fundsTransfer);

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
      className: 'md:top-[17%] top-[15%] left-[24%]',
      link: '/merchant/merchant-portal/home',
      dropdown: configurationList,
    },
    {
      title: 'Account Settings',
      className: 'left-[32%] md:top-[17%] top-[15%]',
      link: '/merchant/merchant-portal/home',
      dropdown: accountSettingsList,
    },
    // {
    //   title: 'Integration Guide',
    //   link: '/merchant/merchant-portal/home',
    // },
    {
      title: 'QR Payments',
      // link: '/merchant/merchant-portal/qr-payments',
      dropdown: qrList,
      className: 'md:top-[17%] top-[15%]',
    },
    {
      title: 'Settlement Module',
      // link: '/merchant/merchant-portal/home',
    },
    {
      title: 'Reversal Module',
      // link: '/merchant/merchant-portal/reversal-module',
      dropdown: getReversalModuleDropDownMenu(),
      className: 'md:top-[17%] top-[15%]',
    },
    {
      title: 'Merchant Funds Transfer',
      dropdown: getMerchantFundsTransferDropDownMenu(
        otpSuccess?.isAuthenticated,
      ),
      className: 'md:top-[17%] top-[15%]',
    },
  ];
  return (
    <>
      <nav className="flex w-full justify-between gap-2 overflow-auto shadow-[0px_2px_6px_0px_rgba(51,_51,_51,_0.08)] sm:px-6 md:px-[150px]">
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
                    <B2 textColor={`hover:text-primary-base`}>
                      {item?.title.replace(/ /g, '\u00A0')}
                    </B2>
                  </Link>
                ) : (
                  <B2 textColor={`hover:text-primary-base`}>
                    {item?.title.replace(/ /g, '\u00A0')}
                  </B2>
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
