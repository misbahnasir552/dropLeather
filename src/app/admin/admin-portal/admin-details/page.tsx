'use client';

import { useRouter } from 'next/navigation';

import H1 from '@/components/UI/Headings/H1';
import { useAppSelector } from '@/hooks/redux';

const AdminDetail = () => {
  const router = useRouter();
  const adminData = useAppSelector((state: any) => state.adminAuth);

  const handleNavigation = () => {
    router.push('/admin/admin-portal/auth/change-password/');
  };

  return (
    <div className="flex flex-col gap-10 px-[150px] pt-12">
      <div className="flex flex-col">
        <H1>{adminData.name}</H1>
      </div>
      <div className="flex w-full flex-row border-[1px] border-border-light "></div>
      <div className="flex flex-row items-center gap-6">
        <div className="flex h-[10px] w-[1px] bg-border-dark" />
        <div className="w-[246px]">{adminData.managerMobile}</div>
        <div className="flex h-[10px] w-[1px] bg-border-dark" />
        <div className="w-[246px]">{adminData.email}</div>
        <div className="flex h-[10px] w-[1px] bg-border-dark" />
        <div className="w-[246px]">{adminData.adminRole}</div>
      </div>
      <div className="flex w-full border-[1px] border-border-light "></div>
      <div className="flex flex-row gap-6">
        {/* <div>Login ID: Nbcjkashkjhas@xyz.plo.com</div>
        <div>Last Login: DD/MM/YYYY HH:MM:SS</div> */}
        {/* <div>Change Password: Click Here</div> */}
        <div className="flex h-[10px] w-[1px] bg-border-dark" />
        <div>
          Change Password:
          <span className="text-primary-base" onClick={handleNavigation}>
            Click Here
          </span>
        </div>
      </div>
      <div className="flex w-full border-[1px] border-border-light "></div>
    </div>
  );
};

export default AdminDetail;
