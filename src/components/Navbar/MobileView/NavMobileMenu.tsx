import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ChevronRight from '@/assets/icons/chevron-right.svg';
import { getNavMenu } from '@/components//Navbar/Utils/utils';
import Button from '@/components/UI/Button/PrimaryButton';
import NavMobileViewLayout from '@/components/UI/Wrappers/NavMobileViewLayout';

interface INavMobileMenu {
  setIsMobileSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMobileMenu = ({
  setIsMobileSubMenu,
  setIsOpenMenu,
}: INavMobileMenu) => {
  const navMenu = getNavMenu();
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
          <div
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
          </div>
        </div>
      </>
    </NavMobileViewLayout>
  );
};

export default NavMobileMenu;
