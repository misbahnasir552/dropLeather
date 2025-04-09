'use client';

import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

// import arrowUp from '@/assets/icons/arrow-up.svg';
import {
  merchantPortalTableHeadings,
  merchantPortalTransactionTableHeadings,
} from './TableHeadings/tableHeadings';

function MerchantPortalProfileTable({
  response,
  title,
}: {
  response: any;
  title: string;
  onApprove?: (profileName: string) => void;
}) {
  console.log('response ', response);

  return (
    <>
      {title === 'merchantPortalProfile' ? (
        <table className="flex w-full flex-col">
          <thead>
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              {merchantPortalTableHeadings.map((heading, i) => (
                <th
                  key={i}
                  className={`${
                    // heading === '#' ? 'w-1/8' : 'w-1/2'
                    heading === '#' ? 'w-1/8' : ''
                  } py-[17px] `}
                >
                  <H7>{heading}</H7>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(response?.merchantStores
              ? response?.merchantStores
              : response?.merchantTransactionPoints
            )?.map((item: any, i: any) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                {/* <td className="w-1/2 py-[18px] text-center"> */}
                <td className=" py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.storeId ? item?.storeId : ''}
                  </B3>
                  {/* <B3 textColor="text-secondary-base">{i + 1}</B3> */}
                </td>
                {/* <td className="w-1/2 py-[18px] text-center"> */}
                <td className="py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.storeName ? item?.storeName : ''}
                  </B3>
                </td>
                {/* <td className="w-1/2 py-[18px] text-center"> */}
                <td className="py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.webSiteUrl ? item?.webSiteUrl : ''}
                  </B3>
                </td>
                {/* <td className="w-1/2 py-[18px] text-center"> */}
                <td className="py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.paymentEnabled ? item?.paymentEnabled : ''}
                  </B3>
                </td>
                <td className="py-[18px] text-center">
                  {/* <td className="w-1/2 py-[18px] text-center"> */}
                  <B3
                    textColor={`${
                      item.status === 'Non-Active'
                        ? 'text-warning-base'
                        : item.status === 'Active'
                        ? 'text-primary-base'
                        : 'text-secondary-base'
                    }`}
                  >
                    {item.status}
                  </B3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : title === 'merchantPortalTransactionProfile' ? (
        <table className="flex w-full flex-col">
          <thead>
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              {merchantPortalTransactionTableHeadings.map((heading, i) => (
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
            {response?.merchantTransactionPoints?.map((item: any, i: any) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.tpId ? item?.tpId : ''}
                  </B3>
                  {/* <B3 textColor="text-secondary-base">{i + 1}</B3> */}
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.tpNumber ? item?.tpNumber : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.storeName ? item?.storeName : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.smsNotificationNumber
                      ? item?.smsNotificationNumber
                      : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.qr ? item?.qr : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3
                    textColor={`${
                      item.status === 'Non-Active'
                        ? 'text-warning-base'
                        : item.status === 'Active'
                        ? 'text-primary-base'
                        : 'text-secondary-base'
                    }`}
                  >
                    {item.status}
                  </B3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="flex w-full flex-col">
          <thead>
            {/* <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6"> */}
            <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
              {merchantPortalTableHeadings.map((heading, i) => (
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
            {(response?.merchantStores
              ? response?.merchantStores
              : response?.merchantTransactionPoints
            )?.map((item: any, i: any) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.storeId ? item?.storeId : ''}
                  </B3>
                  {/* <B3 textColor="text-secondary-base">{i + 1}</B3> */}
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.storeName ? item?.storeName : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.webSiteUrl ? item?.webSiteUrl : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3 textColor="text-secondary-base">
                    {item?.paymentEnabled ? item?.paymentEnabled : ''}
                  </B3>
                </td>
                <td className="w-1/2 py-[18px] text-center">
                  <B3
                    textColor={`${
                      item.status === 'Non-Active'
                        ? 'text-warning-base'
                        : item.status === 'Active'
                        ? 'text-primary-base'
                        : 'text-secondary-base'
                    }`}
                  >
                    {item.status}
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

export default MerchantPortalProfileTable;
