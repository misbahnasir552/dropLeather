import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import bellIcon from '@/assets/icons/bell-icon.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import downSmall from '@/assets/icons/downSmall.svg';
import {
  getNavMenu,
  getOnBoardingNavMenu,
} from '@/components//Navbar/Utils/utils';
import Button from '@/components/UI/Button/PrimaryButton';
import NavMobileViewLayout from '@/components/UI/Wrappers/NavMobileViewLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';
import { resetForms } from '@/redux/features/formSlices/onBoardingForms';

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
  const [istoggle, setIstoggle] = useState<boolean>(false);
  console.log(istoggle);
  let navMenu;
  if (userData?.email !== '') {
    navMenu = getOnBoardingNavMenu();
  } else {
    navMenu = getNavMenu();
  }

  const showLogout = () => {
    setIstoggle((prev) => !prev);
  };

  const logOut = async () => {
    console.log("here i'm to log out >");

    try {
      const response = await apiClient.get(
        `/auth/expireJwt?email=${userData?.email}`,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );

      if (response.data.responseCode === '000') {
        dispatch(setLogout());
        dispatch(resetForms());
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
                  <div className="flex items-center">
                    <Image src={downSmall} alt={'arrow down'} />
                  </div>
                </div>
                <div className="relative flex items-center rounded-2xl border-[1px] border-border-light px-2 py-3">
                  <Image
                    src={bellIcon}
                    alt={'bell icon'}
                    height={32}
                    width={32}
                    onClick={showLogout}
                  />
                </div>
                <Button
                  label="Logout"
                  onClickHandler={logOut}
                  className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
                />
              </div>
            ) : (
              <>
                <Button
                  label="Login"
                  routeName="/login"
                  onClickHandler={() => setIsOpenMenu(false)}
                  className="button-secondary w-24 px-2 py-[11px] text-xs leading-tight"
                />
                <Button
                  label="Sign up"
                  routeName="/sign-up"
                  onClickHandler={() => setIsOpenMenu(false)}
                  className="button-primary w-24 px-2 py-[11px] text-xs leading-tight"
                />
              </>
            )}
          </div>
        </div>
      </>
    </NavMobileViewLayout>
  );
};

export default NavMobileMenu;
