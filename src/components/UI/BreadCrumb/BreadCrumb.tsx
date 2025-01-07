'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import home from '@/assets/icons/home-2.svg';
import B3 from '@/components/UI/Body/B3';
import { convertSlugToTitle } from '@/services/urlService/slugServices';

function BreadCrumb() {
  const location = usePathname();
  const pathnames: string[] = location.split('/').filter((x) => x);
  // console.log(pathnames, 'PATHNAMESSSS');

  return (
    <nav>
      <ul className="flex w-auto gap-1 ">
        <Image src={home} alt={home} width={15} height={15} className="pt-px" />
        {pathnames.map((value, index) => {
          const lastItem = index === pathnames.length - 1;
          const url = `/${pathnames.slice(0, index + 1).join('/')}`;
          const title = convertSlugToTitle(value);

          if (value === 'admin' || (value === 'merchant' && !lastItem)) {
            return null;
          }
          return (
            <li key={url} className=" flex items-center justify-center">
              <div className="">
                {lastItem ? (
                  <B3 textColor="text-secondary-400">{title}</B3>
                ) : (
                  <Link href={url} className="">
                    <B3 textColor="text-secondary-base">{title}</B3>
                  </Link>
                )}
              </div>
              {!lastItem && (
                <span className="px-2 pt-[4px] text-[10px] font-medium leading-[15px] text-border-dark">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BreadCrumb;
