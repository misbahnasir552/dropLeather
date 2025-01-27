import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import apiClient from '@/api/apiClient';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import {
  getNavMenu,
  getOnBoardingNavMenu,
} from '@/components//Navbar/Utils/utils';
import Button from '@/components/UI/Button/PrimaryButton';
import NavMobileViewLayout from '@/components/UI/Wrappers/NavMobileViewLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';

interface INavMobileMenu {
  setIsMobileSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMobileMenu = ({
  setIsMobileSubMenu,
  setIsOpenMenu,
}: INavMobileMenu) => {
  const userData = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  let navMenu;
  if (userData?.email !== '') {
    navMenu = getOnBoardingNavMenu();
  } else {
    navMenu = getNavMenu();
  }
  // const navMenu = getNavMenu();
  const logOut = async () => {
    console.log("here i'm to log out >");

    try {
      const response = await apiClient.get(
        `/auth/expireJwt?email=${userData?.email}`,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );

      if (response.data.responseCode === '000') {
        dispatch(setLogout());
        router.push('/login');

        // setTimeout(() => {
        //   dispatch(clearCredentials());
        //   dispatch(setLogoutOnboarding());
        //   dispatch(resetFields());
        // }, 5000);
      } else {
        console.error('logout Error:', response);
      }
    } catch (error) {
      console.error('logout Error:', error);
    }
  };
  return (
    <NavMobileViewLayout>
      <>
        <div className="flex flex-col items-start gap-8 border-y-2 border-border-light px-6 py-8">
          {navMenu.map((item, index) => (
            <div key={index} className="w-full flex-col ">
              {item.name === 'accept-payments' ? (
                <div
                  className="flex w-full cursor-pointer items-center justify-between"
                  onClick={() => {
                    setIsMobileSubMenu(true);
                    // setIsOpenMenu(false);
                  }}
                >
                  <div className="text-sm leading-tight text-secondary-base transition duration-300 hover:text-primary-base">
                    {item.title}
                  </div>
                  <Image
                    src={ChevronRight}
                    alt="Chevronright"
                    width={24}
                    height={24}
                    id="Chevronright"
                  />
                </div>
              ) : (
                <Link key={index} href={item.link}>
                  <div
                    className="cursor-pointer text-sm leading-tight text-secondary-base transition duration-300 hover:text-primary-base"
                    onClick={() => {
                      setIsOpenMenu(false);
                    }}
                  >
                    {item.title}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4 border-b border-solid border-border-light px-6 py-8">
          {/* <div
            onClick={() => {
              setIsOpenMenu(false);
            }}
          >
            <Button
              label="Sign up"
              routeName="/sign-up"
              className="button-primary w-24 px-2 py-[11px] text-xs leading-tight"
            />
          </div>
          <div
            onClick={() => {
              setIsOpenMenu(false);
            }}
          >
            <Button
              label="Login"
              routeName="/login"
              className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
            />
          </div> */}
          <Button
            label="Logout"
            // routeName="/login"
            onClickHandler={logOut}
            className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
          />
        </div>
      </>
    </NavMobileViewLayout>
  );
};

export default NavMobileMenu;
