'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import arrowDown from '@/assets/icons/arrow-down.svg';
import CrossIconDark from '@/assets/icons/crossIconDark.svg';
import EditIcon from '@/assets/icons/Edit-Table-Icon.svg';
import TickIcon from '@/assets/icons/tick-icon-table-checkbox.svg';
import TickIconDark from '@/assets/icons/tickIconDark.svg';
import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userUpdateSuccess } from '@/redux/features/adminSlices/updateUserSlice/updateUserSlice';
import { generateMD5Hash } from '@/utils/helper';

// import arrowUp from '@/assets/icons/arrow-up.svg';
import {
  // adminTableHeadings,
  manageProfilesHeadings,
  // tableHeadings,
} from './TableHeadings/tableHeadings';

function MerchantRecordTable({
  response,
  title,
  onApprove,
}: {
  response: any;
  title: string;
  onApprove?: (profileName: string) => void;
}) {
  const router = useRouter();
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;
  const { managerMobile } = adminData;
  const { apiSecret } = adminData;
  const { jwt } = adminData;
  console.log('response hiii is', response);
  // console.log('title is', title);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  // const [showPages, setShowPages] = useState<boolean>(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // const merchantData = useAppSelector((state: any) => state.merchantDetails);
  const dispatch = useAppDispatch();

  const updateUser = (email: any, status: any, index: any) => {
    console.log('index is', index, email, status);

    console.log('index is', response);
    const selectedMerchantData = response[index];
    console.log('Selected user data:', selectedMerchantData);
    dispatch(userUpdateSuccess(selectedMerchantData));
    router.push(`/admin/admin-portal/manage-users/update-user/?email=${email}`);
  };

  const approveUser = async (email: any) => {
    const req = {
      managerMobile,
      username: email,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response = await apiClient.post(
        '/admin/approveUser',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      if (response?.data?.responseCode === '009') {
        console.log('status has been updated');
      }
    } catch {
      console.log('hello');
    }
  };

  console.log('response is', response);

  const rejectUser = async (email: string) => {
    const req = {
      managerMobile,
      username: email,
      rejectedBy: adminData.name,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response = await apiClient.post(
        '/admin/rejectUser',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      if (response?.data?.responseCode === '009') {
        console.log('status has been updated');
      }
    } catch {
      console.log('hello');
    }
  };

  const approveProfile = async (profileName: string) => {
    console.log('I am in approve profile', profileName);

    const req = {
      managerMobile,
      profileName,
      approvedBy: adminData.name,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);

    try {
      const response = await apiClient.post(
        'admin/approveProfile',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );
      if (response?.data?.responseCode === '009') {
        console.log('Profile approved successfully');
        if (onApprove) {
          onApprove(response?.data?.responseMessage); // Invoke the callback
        }
      }
    } catch (error) {
      console.log('error fro approve profile is', error);
    }
  };

  const rejectProfile = async (profileName: string) => {
    console.log('I am in approve profile', profileName);

    const req = {
      managerMobile,
      profileName,
      rejectedBy: adminData.name,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);

    try {
      const response = await apiClient.post(
        'admin/rejectProfile',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );
      if (response?.data?.responseCode === '009') {
        console.log('Profile approved successfully');
        if (onApprove) {
          onApprove(response?.data?.responseMessage); // Invoke the callback
        }
      }
    } catch (error) {
      console.log('error fro approve profile is', error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(response?.response.map((_: any, index: any) => index));
    }
    setSelectAll(!selectAll);
  };

  // Function to toggle select/deselect individual row
  const handleRowClick = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    const newSelectedRows = [...selectedRows];
    if (selectedIndex === -1) {
      newSelectedRows.push(index);
    } else {
      newSelectedRows.splice(selectedIndex, 1);
      setSelectAll(false);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === response?.response.length);
  };

  // const showPagesData=(index:any)=>{
  //   console.log("index is", index)
  // setShowPages(prev => !prev)
  // }

  const togglePagesVisibility = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <>
      {title === 'admin' ? (
        <table className="flex w-full flex-col">
          <thead>
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              {/* <th>
                <div
                  onClick={handleSelectAll}
                  className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-[1.5px] border-border-dark ${
                    selectAll && 'bg-primary-base'
                  }`}
                >
                  {selectAll && (
                    <Image src={TickIcon} alt="tick" height={8} width={10} />
                  )}
                </div>
              </th> */}
              {/* {adminTableHeadings.map((heading, i) => (
                <th
                  key={i}
                  className={`${heading === '#' ? 'w-1/8' : 'w-1/2'
                    } py-[17px] text-center`}
                >
                  <H7>{heading}</H7>
                </th>
              ))} */}
            </tr>
          </thead>
          <tbody>
            {response?.map((item: any, i: any) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                {/* <td className="py-[18px] text-center">
                  <div
                    onClick={() => handleRowClick(i)}
                    className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-[1.5px] border-border-dark ${
                      selectedRows.includes(i) && 'bg-primary-base'
                    }`}
                  >
                    {selectedRows.includes(i) && (
                      <Image src={TickIcon} alt="tick" height={8} width={10} />
                    )}
                  </div>
                </td> */}
                <td className="w-1/8 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">{i + 1}</B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">{item.firstName}</B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">{item.lastName}</B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">{item.email}</B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">{item.role}</B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3
                    textColor={`${
                      item.status === 'Pending'
                        ? 'text-warning-base'
                        : item.status === 'Approved'
                        ? 'text-primary-base'
                        : item.status === 'Rejected'
                        ? 'text-danger-950'
                        : 'text-secondary-base'
                    }`}
                  >
                    {item.status}
                  </B3>
                </td>
                <td className="flex w-1/2 items-center justify-center gap-4 py-[18px]">
                  {adminRole == 'super' || adminRole == 'maker' ? (
                    <div onClick={() => updateUser(item.email, item.status, i)}>
                      <Image src={EditIcon} height={20} width={20} alt="eye" />
                    </div>
                  ) : null}

                  {(adminRole == 'checker' || adminRole == 'super') &&
                  item.status === 'Pending' ? (
                    <>
                      <div className="" onClick={() => approveUser(item.email)}>
                        <Image
                          src={TickIconDark}
                          height={20}
                          width={18}
                          alt="tick"
                        />
                      </div>
                      <div className="" onClick={() => rejectUser(item.email)}>
                        <Image
                          src={CrossIconDark}
                          height={20}
                          width={18}
                          alt="cross"
                        />
                      </div>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : title === 'manageProfiles' ? (
        <table className="flex w-full flex-col">
          <thead>
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              {manageProfilesHeadings.map((heading, i) => (
                <th
                  key={i}
                  className={`${
                    heading === '#' ? 'w-1/8' : 'w-1/2'
                  } py-[17px] text-center`}
                >
                  <H7>{heading}</H7>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {response?.map((item: any, i: any) => (
              <>
                <tr
                  key={i}
                  className="flex w-full items-center justify-between border-b border-border-light px-6"
                >
                  <td className="w-1/8 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{i + 1}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.profileName}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.profileType}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.createdBy}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.modifiedBy}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3
                      textColor={`${
                        item.status === 'Pending'
                          ? 'text-warning-base'
                          : item.status === 'Approved'
                          ? 'text-primary-base'
                          : item.status === 'Rejected'
                          ? 'text-danger-950'
                          : 'text-secondary-base'
                      }`}
                    >
                      {item.status}
                    </B3>
                  </td>
                  {/* <td className="flex w-1/2 items-center justify-center gap-4 py-[18px]">
                  {(adminRole == 'checker' || adminRole == 'super') &&
                  item.status === 'Pending' ? (
                    <div className="" onClick={() => approveUser(item.email)}>
                    <Image
                    src={TickIconDark}
                      height={20}
                      width={18}
                      alt="tick"
                    />
                    </div>
                ) : null}
              </td> */}
                  {/* <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.createdAt}</B3>
                  </td>
                  <td className="w-1/2 py-[18px] text-center">
                    <B3 textColor="text-secondary-base">{item.updatedAt}</B3>
                  </td> */}
                  <td className="flex w-1/2 justify-center py-[18px] text-center">
                    {/* <B3 textColor="text-secondary-base">
                    {item.pages[0].pageName}
                  </B3> */}
                    <td
                      className="flex h-[20px] cursor-pointer items-center justify-center gap-1 rounded-lg border-[2px] border-border-dark bg-screen-grey px-1 "
                      onClick={() => togglePagesVisibility(i)}
                    >
                      <div className="place-items-center text-xs font-semibold text-secondary-base">
                        View Pages
                      </div>
                      <Image
                        src={arrowDown}
                        alt={'arrow down'}
                        height={7}
                        width={12}
                      />
                    </td>
                  </td>
                  <td className="flex w-1/2 items-center justify-center gap-4 py-[18px]">
                    {(adminRole == 'maker' || adminRole == 'super') &&
                    item.status === 'Pending' ? (
                      <>
                        <div
                          className=""
                          onClick={() => approveProfile(item.profileName)}
                        >
                          <Image
                            src={TickIconDark}
                            height={20}
                            width={18}
                            alt="tick"
                          />
                        </div>

                        <div
                          className=""
                          onClick={() => rejectProfile(item.profileName)}
                        >
                          <Image
                            src={CrossIconDark}
                            height={20}
                            width={18}
                            alt="cross"
                          />
                        </div>
                      </>
                    ) : (
                      <td className="">
                        <B3 textColor="text-secondary-base">NA</B3>
                      </td>
                    )}
                  </td>
                </tr>
                {expandedIndex === i && (
                  <tr className="flex w-full items-center border-b border-border-light pl-6">
                    {item.pages?.map((page: any) => (
                      <td key={page.id} className="">
                        <B3 textColor="text-secondary-base">{page.pageName}</B3>
                      </td>
                    ))}
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="flex w-full flex-col">
          <thead>
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              <th>
                <div
                  onClick={handleSelectAll}
                  className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-[1.5px] border-border-dark ${
                    selectAll && 'bg-primary-base'
                  }`}
                >
                  {selectAll && (
                    <Image src={TickIcon} alt="tick" height={8} width={10} />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {response?.map((item: any, i: any) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                <td className="py-[18px] text-center">
                  <div
                    onClick={() => handleRowClick(i)}
                    className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-[1.5px] border-border-dark ${
                      selectedRows.includes(i) && 'bg-primary-base'
                    }`}
                  >
                    {selectedRows.includes(i) && (
                      <Image src={TickIcon} alt="tick" height={8} width={10} />
                    )}
                  </div>
                </td>

                <td className="w-1/2 py-[18px] text-center">
                  <B3
                    textColor={`${
                      item.requestStatus === 'Approved'
                        ? 'text-primary-base'
                        : item.requestStatus === 'Rejected'
                        ? 'text-danger-base'
                        : 'text-warning-base'
                    }`}
                  >
                    {item.requestStatus}
                  </B3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default MerchantRecordTable;
