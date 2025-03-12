import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import B2 from '@/components/UI/Body/B2';
import type { IMerchantNavDropdownProps } from '@/interfaces/interface';

function ConfigurationDropDown({
  className,
  hoveredMenu,
  data,
}: IMerchantNavDropdownProps) {
  const pathname = usePathname();

  const handleClickItem = () => {
    if (hoveredMenu) {
      console.log('hi');
    }
  };
  return (
    <>
      {hoveredMenu !== null && (
        <div
          // onMouseLeave={handleClickItem}
          className={`absolute ${className} top-[127px] z-10 flex flex-col items-start justify-start gap-[24px] rounded-lg bg-neutral-white-base p-6 shadow-[0px_4px_16px_0px_rgba(51,_51,_51,_0.08)]`}
        >
          {data?.map((item, index) => (
            <Link key={index} href={`/merchant/merchant-portal/${item.link}`}>
              <div
                key={index}
                onClick={handleClickItem}
                className={`flex flex-row items-start gap-4 hover:text-primary-base ${
                  pathname === `${item.link}` ? 'text-primary-base' : ''
                }`}
              >
                {/* <Image src={item.icon} width={24} height={24} alt="icon" /> */}
                <B2 textColor="hover:text-primary-base">{item.title}</B2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ConfigurationDropDown;
