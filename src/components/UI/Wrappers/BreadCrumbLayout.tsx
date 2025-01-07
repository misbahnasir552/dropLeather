'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import home from '@/assets/icons/home-2.svg';
import B3 from '@/components/UI/Body/B3';
import { convertSlugToTitle } from '@/services/urlService/slugServices';

function BreadCrumbLayout() {
  const location = usePathname();
  const pathnames: string[] = location.split('/').filter((x) => x);
  console.log(pathnames, 'PATHNAMESSSS');

  return (
    <nav>
      <ul className="flex w-auto gap-1 pt-6 ">
        <Image src={home} alt={home} width={15} height={15} className="pt-px" />
        {pathnames.map((value, index) => {
          const lastItem = index === pathnames.length - 1;
          const url = `/${pathnames.slice(0, index + 1).join('/')}`;
          const title = convertSlugToTitle(value);
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

export default BreadCrumbLayout;

// "use client";
// import { usePathname } from 'next/navigation';
// import React from 'react';

// import { getHeaderTextForSegment } from '@/utils/helper';
// import Link from 'next/link';

// interface IBreadsCrumbLayout {
//   show: boolean;
// }

// const BreadCrumbLayout = ({ show = false }: IBreadsCrumbLayout) => {
//   const pathName = usePathname();
//   const currentURL: string[] = pathName.split('/');

//   const getHeaderText = (urlSegments: string[]) => {
//     return urlSegments.map((url, index, arr) => (
//       <div key={index}>
//         {url && index > 0 && (
//           <div key={index} className="flex gap-2">
//             <Link href={`/${url}`}>

//             <span
//               className={`${
//                 index !== arr.length - 3
//                   ? 'text-secondary-base'
//                   : 'text-secondary-400'
//               }`}
//             >
//               {getHeaderTextForSegment(url)}
//             </span>
//             </Link>
//             {index > 0 && index !== arr.length - 3 && (
//               <span className="text-[10px] text-border-dark">/</span>
//             )}
//           </div>
//         )}
//       </div>
//     ));
//   };
//   return (
//     <div className="">
//       {show ? (
//         <header className="text-secondary-base">
//           <div className="flex gap-2 pt-6 text-xs font-normal">
//             {getHeaderText(currentURL)}
//           </div>
//         </header>
//       ) : null}
//     </div>
//   );
// };

// export default BreadCrumbLayout;
