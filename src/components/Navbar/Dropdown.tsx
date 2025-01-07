// Dropdown.tsx

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { IDropdownProps } from '@/interfaces/interface';

import { getDropDownMenu } from './Utils/utils';

const Dropdown = ({ isHovered }: IDropdownProps) => {
  const dropDownList = getDropDownMenu();
  const pathname = usePathname();
  return (
    <>
      {isHovered && (
        <div className="absolute left-[-20px] top-[52px] z-10 flex w-[225px] flex-col items-start justify-start gap-[24px] rounded-lg bg-neutral-white-base p-6 shadow-[0px_4px_16px_0px_rgba(51,_51,_51,_0.08)]">
          {dropDownList.map((item, index) => (
            <Link key={index} href={`/accept-payments/${item.link}`}>
              <div
                key={index}
                className={`flex flex-row items-start gap-4 duration-300 hover:text-primary-base hover:transition ${
                  pathname === `/accept-payments/${item.link}`
                    ? 'text-primary-base'
                    : ''
                }`}
              >
                <Image src={item.icon} width={24} height={24} alt="icon" />
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;
