'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import bellIcon from '@/assets/icons/bell-icon.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import CloseIcon from '@/assets/icons/close-icon-nav.svg';
// import downSmall from '@/assets/icons/downSmall.svg';
import Logo from '@/assets/icons/logo.svg';
import Menu from '@/assets/icons/menu-button.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setLogout } from '@/redux/features/authSlice';
import { clearCredentials } from '@/redux/features/corporateSlices/loginCredentials';
import { resetFields } from '@/redux/features/formSlices/fieldSlice';
import { setLogoutOnboarding } from '@/redux/features/formSlices/onBoardingForms';

import NavMobileMenu from '../MobileView/NavMobileMenu';
import NavMobileSubMenu from '../MobileView/NavMobileSubMenu';
import {
  getDropDownMenu,
  getNavMenu,
  getOnBoardingNavMenu,
} from '../Utils/utils';

const Navbar = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  let navMenu;

  if (userData?.email !== '') {
    navMenu = getOnBoardingNavMenu();
  } else {
    navMenu = getNavMenu();
  }
  const dropDownList = getDropDownMenu();
  const router = useRouter();

  const { currentTab } = useCurrentTab();
  // const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isMobileSubMenu, setIsMobileSubMenu] = useState<boolean>(false);
  const [istoggle, setIstoggle] = useState<boolean>(false);
  console.log(istoggle);

  const isCurrentTabNotInNavMenu = !navMenu.some(
    (item) => item.name === currentTab,
  );

  const isCurrentTabNotInSubMenu = !dropDownList.some(
    (item) => item.link === currentTab,
  );

  const handleBackButton = () => {
    setIsOpenMenu(true);
    setIsMobileSubMenu(false);
  };

  const showLogout = () => {
    setIstoggle((prev) => !prev);
  };

  // console.log ("userdata from navvvvvvvvvvvvvv",userData)
  const logOut = async () => {
    console.log("here i'm to log out >");

    if (userData?.email) {
      try {
        const response = await apiClient.get(
          `/auth/expireJwt?email=${userData.email}`,
          { headers: { Authorization: `Bearer ${userData.jwt}` } },
        );

        if (response.data.responseCode === '000') {
          dispatch(setLogout());
          router.push('/login');

          setTimeout(() => {
            dispatch(clearCredentials());
            dispatch(setLogoutOnboarding());
            dispatch(resetFields());
          }, 5000);
        } else {
          console.error('logout Error:', response);
        }
      } catch (error) {
        console.error('logout Error:', error);
      }
    } else {
      dispatch(setLogout());
      router.push('/login');
    }
  };

  return (
    <nav
      className={`relative z-10 flex h-[84px] -translate-y-0 items-center justify-between bg-neutral-white-base px-[150px] shadow-[0px_2px_6px_0px_rgba(51,_51,_51,_0.08)] sm:max-md:px-6 
    sm:max-md:py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="sm:hidden md:flex md:items-center md:justify-between">
          <Image src={Logo} width={173} height={36} alt="logo" className="" />
        </div>
        {isOpenMenu && !isMobileSubMenu ? (
          <div className="w-min text-xl font-semibold leading-tight text-secondary-base md:hidden">
            Menu
          </div>
        ) : !isOpenMenu && !isMobileSubMenu ? (
          <div className="w-full text-xl font-semibold leading-tight text-secondary-base md:hidden">
            {isCurrentTabNotInNavMenu && isCurrentTabNotInSubMenu ? (
              <Image
                src={Logo}
                width={116}
                height={24}
                alt="logo"
                className="md:hidden"
              />
            ) : !isCurrentTabNotInNavMenu ? (
              navMenu.map((item, index) => {
                return (
                  currentTab === item.name &&
                  (!item.name ? (
                    <Image
                      key={index}
                      src={Logo}
                      width={116}
                      height={24}
                      alt="logo"
                      className="md:hidden"
                    />
                  ) : (
                    <div
                      key={index}
                      className="w-full text-xl font-semibold leading-tight text-secondary-base md:hidden"
                    >
                      {item.title}
                    </div>
                  ))
                );
              })
            ) : (
              !isCurrentTabNotInSubMenu &&
              dropDownList.map((item, index) => {
                return (
                  currentTab === item.link && (
                    <span key={index}>{item.title}</span>
                  )
                );
              })
            )}
          </div>
        ) : (
          isMobileSubMenu && (
            <div className="flex gap-2 md:hidden" onClick={handleBackButton}>
              <Image
                src={ChevronLeft}
                height={24}
                width={24}
                alt="chevron-right"
              />
            </div>
          )
        )}
      </div>
      <div className="flex h-full items-center justify-between">
        <ul className="h-full items-center gap-6 sm:hidden md:flex">
          {navMenu.map((item, index) => (
            <div
              key={index}
              className="flex h-full items-center justify-center space-x-6"
            >
              <Link href={item.link}>
                <li className="cursor-pointer text-sm leading-tight text-secondary-base transition duration-300 hover:text-primary-base">
                  {item.title}
                </li>
              </Link>

              <div key={index} className="h-[10px] w-[1px] bg-border-dark" />
            </div>
          ))}
          <div className="flex flex-row gap-6">
            {userData.jwt ? (
              <div className="flex gap-4">
                <div className="flex gap-4 rounded-2xl border-[1px] border-border-light px-4 py-2">
                  <div>
                    <div className="text-base font-semibold text-secondary-base">
                      {userData.name}
                    </div>
                    <div className="text-xs font-normal text-secondary-600">
                      {userData.email}
                    </div>
                  </div>
                  {/* <div className="flex items-center">
                    <Image
                      src={downSmall}
                      alt={'arrow down'}
                      // height={24}
                      // width={24}
                      // onClick={() => handleToggle(index)}
                    />
                  </div> */}
                </div>
                <div className="relative flex items-center rounded-2xl border-[1px] border-border-light px-2 py-3">
                  {/* <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-danger-base text-[10px] leading-tight text-neutral-white-base">
                    5
                  </div> */}
                  <Image
                    src={bellIcon}
                    alt={'bell icon'}
                    height={32}
                    width={32}
                    // onClick={() => handleToggle(index)}
                    onClick={showLogout}
                  />
                </div>
                {/* {istoggle ? <div onClick={logOut}>Logout</div> : null} */}
                <Button
                  label="Logout"
                  // routeName="/login"
                  onClickHandler={logOut}
                  className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
                />
              </div>
            ) : (
              <>
                <Button
                  label="Login"
                  routeName="/login"
                  className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
                />
                <Button
                  label="Sign up"
                  routeName="/sign-up"
                  className="button-primary w-24 px-2 py-[11px] text-xs leading-tight"
                />
              </>
            )}
          </div>
        </ul>
        <div
          className="md:hidden"
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
            setIsMobileSubMenu(false);
          }}
        >
          {isOpenMenu ? (
            <Image src={CloseIcon} width={24} height={24} alt="closeIcon" />
          ) : (
            <Image src={Menu} alt="menu" width={24} height={24} />
          )}
        </div>
      </div>
      {isOpenMenu &&
        (!isMobileSubMenu ? (
          <NavMobileMenu
            setIsMobileSubMenu={setIsMobileSubMenu}
            setIsOpenMenu={setIsOpenMenu}
          />
        ) : (
          <NavMobileSubMenu
            setIsMobileSubMenu={setIsMobileSubMenu}
            setIsOpenMenu={setIsOpenMenu}
          />
        ))}
    </nav>
  );
};

export default Navbar;
