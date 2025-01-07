'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Logo from '@/assets/icons/logo.svg';
import B2 from '@/components/UI/Body/B2';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setAdminLogout } from '@/redux/features/adminSlices/adminLoginSlice';

function AdminPortalNav() {
  const [clickedItem, setClickedItem] = useState(null);
  const adminData = useAppSelector((state: any) => state.adminAuth);
  // const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  // const [capitalLetter, setCapitalLetter]=useState<string | null>('')

  useEffect(() => {
    console.log('hi');

    // // Function to capitalize the first letter
    // const capitalizeFirstLetter = (name: string) => {
    //   if (!name) return '';
    //   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    // };

    // const name = adminData?.firstName || '';  // or adminData?.name
    // const capitalized = capitalizeFirstLetter(name);

    // setCapitalLetter(capitalized);  // Set the capitalized value in state
  }, [adminData]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const adminJwt = adminData.jwt;
  // const name=adminData.firstName

  const adminPortalNavMenu = [
    {
      title: 'Home',
      link: '/admin/admin-portal/home',
    },
    {
      title: 'Manage Users',
      link: '/admin/admin-portal/manage-users/search-user',
    },
    {
      title: 'Manage Merchants',
      link: '/admin/home',
    },
    {
      title: 'Manage Profiles',
      link: '/admin/admin-portal/manage-profiles',
    },
    {
      title: 'Bulk Registration',
      link: '/admin/admin-portal/bulk-register',
    },
    {
      title: 'Configuration',
      link: '',
    },
    {
      title: 'Reports',
      link: '',
    },
    {
      title: 'Settlement Module',
      link: '',
    },
    {
      title: 'Work Queue',
      link: '',
    },
  ];

  const handleAdminLogout = () => {
    dispatch(setAdminLogout());
    Cookies.remove('jwt', { path: '/admin' });
    Cookies.remove('adminRole', { path: '/admin' });
    router.push('/admin/admin-portal/auth/login');
  };

  const handleAdminNav = (title: any, link: any) => {
    setClickedItem(title);
    router.push(link);
  };

  const handleAdminDetails = () => {
    router.push('/admin/admin-portal/admin-details/');
  };

  console.log('admin data', adminData);
  return (
    <div>
      <div className="flex h-[68px] px-[150px] shadow-[0px_2px_6px_0px_rgba(51,_51,_51,_0.08)] sm:hidden md:flex md:items-center md:justify-between">
        <div>
          <Image src={Logo} width={173} height={36} alt="logo" className="" />
        </div>
        {adminJwt !== '' ? (
          <div className="flex flex-row items-center gap-6">
            <div onClick={handleAdminLogout}>Logout</div>
            <div
              className="flex h-9 w-9  items-center justify-center rounded-full bg-secondary-base"
              onClick={handleAdminDetails}
            >
              <div className="flex text-base font-semibold leading-tight text-screen-white">
                F
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {adminJwt !== '' ? (
        <div className="flex w-full justify-between overflow-auto shadow-[0px_2px_6px_0px_rgba(51,_51,_51,_0.08)] sm:px-6 md:px-[150px]">
          {adminPortalNavMenu.map((item, index, arr) => (
            <React.Fragment key={index}>
              <div className="item-center flex">
                <div
                  className="flex cursor-pointer items-center justify-center py-5"
                  // onMouseEnter={() => setHoveredMenu(item.title)}
                  // onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div onClick={() => handleAdminNav(item.title, item.link)}>
                    <B2
                      textColor={
                        clickedItem === item.title
                          ? 'text-primary-base'
                          : 'text-secondary-base'
                      }
                      additionalClass="hover:text-primary-base"
                    >
                      {item.title}
                    </B2>
                  </div>
                  {/* {item.dropdown && hoveredMenu === item.title && (
                  <ConfigurationDropDown
                  className={item.className}
                  data={item.dropdown}
                    hoveredMenu={hoveredMenu}
                    setHoveredMenu={setHoveredMenu}
                  />
                )} */}
                </div>
              </div>
              {index < arr.length - 1 && (
                <div className="flex items-center">
                  <div className="h-[10px] w-[1px] bg-border-dark" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AdminPortalNav;
