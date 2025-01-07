import Link from 'next/link';
import React from 'react';

import { getDropDownMenu } from '@/components//Navbar/Utils/utils';
import NavMobileViewLayout from '@/components/UI/Wrappers/NavMobileViewLayout';

interface INavMobileSubMenu {
  setIsMobileSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMobileSubMenu = ({
  setIsMobileSubMenu,
  setIsOpenMenu,
}: INavMobileSubMenu) => {
  const dropDownList = getDropDownMenu();

  return (
    <NavMobileViewLayout>
      <div className="flex flex-col items-start gap-8 border-y-2 border-border-light px-6 py-8">
        {dropDownList.map((item, index) => (
          <Link key={index} href={`/accept-payments/${item.link}`}>
            <div
              className="cursor-pointer text-sm leading-tight text-secondary-base transition duration-300 hover:text-primary-base"
              key={index}
              onClick={() => {
                setIsMobileSubMenu(false);
                setIsOpenMenu(false);
              }}
            >
              <div className="cursor-pointer text-base leading-tight text-secondary-base transition duration-300 hover:text-primary-base">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </NavMobileViewLayout>
  );
};

export default NavMobileSubMenu;
