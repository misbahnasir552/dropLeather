'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import closeIcon from '@/assets/icons/close-icon.svg';
import ScanImage from '@/assets/images/Scan.png';
import Button from '@/components/UI/Button/PrimaryButton';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

import B1 from '../../Body/B1';
import H1 from '../../Headings/H1';
import H6 from '../../Headings/H6';

interface QRModalProps {
  title: string;
  description: string;
  show: boolean;
  setShowModal: (show: boolean) => void;
  routeName?: string;
  imageUrl: string; // The QR code URL passed as a prop
  amount?: string;
  expirationTime?: any;
  tilNum?: string;
  qrString?: string;
  isStatic?: boolean;
  isDynamic?: boolean;
  generateDynamicQr?: boolean;
}

const QRModal: React.FC<QRModalProps> = ({
  title,
  // description,
  show,
  setShowModal,
  routeName,
  imageUrl,
  amount,
  expirationTime,
  tilNum,
  qrString,
  isStatic,
  isDynamic,
  generateDynamicQr,
}) => {
  const router = useRouter();
  const userData = useAppSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const downloadQR = async () => {
    setIsLoading(true);
    try {
      const additionalValues = {
        qr: qrString,
        storeName: title,
        tillNo: tilNum || '',
        ...((isDynamic || generateDynamicQr) && {
          amount,
          expireTime: expirationTime,
        }),
        managerMobile: userData?.managerMobile,
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };

      const response = await apiClient.post(
        `/qrcode/${isStatic ? 'printQR' : 'downloadDynamicQR'}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData?.jwt}`,
          },
          responseType: 'blob', // Important
        },
      );

      // Create a URL for the blob and initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${isStatic ? 'Static QR.png' : 'Dynamic QR.png'}`,
      ); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching image:', error);
    }
  };

  const handleClose = () => {
    if (routeName) {
      router.push(routeName);
    } else {
      setShowModal(!show);
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };
  return (
    <>
      {show && (
        <div
          className="overlay fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-secondary-base/75 sm:px-6 md:px-12"
          onClick={handleOverlayClick}
        >
          <div className="flex w-[95%] flex-col gap-12 rounded-2xl border-[1px] border-border-dark bg-screen-white p-2 md:w-[60%]">
            <div className="flex flex-col gap-8">
              <div
                className="flex cursor-pointer justify-end"
                onClick={handleClose}
              >
                <Image src={closeIcon} alt="close-icon" />
              </div>
              <div className="md:px-12 md:py-2">
                <div className="flex flex-col gap-6">
                  <div className="bg-[#00BD5F] px-12 py-6">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                      <div>
                        <Image
                          src={ScanImage}
                          alt="QR code"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="w-[100%] rounded-[60px] bg-[#FDD70A] px-8 py-3 text-center text-2xl font-bold text-[#fff]">
                          {title}
                        </span>
                        <div className="flex items-center justify-center">
                          <Image
                            src={imageUrl}
                            alt="QR code"
                            width={250}
                            height={250}
                          />{' '}
                        </div>
                        {tilNum ? (
                          <div className="flex flex-col gap-2">
                            <span className="text-center text-[#fff] ">
                              Merchant Till Number
                            </span>
                            <div className="flex space-x-2">
                              {tilNum?.split('')?.map((digit, index) => (
                                <div
                                  key={index}
                                  className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#000] text-[14px] text-[#fff]"
                                >
                                  {digit}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {amount && (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <H1 textColor="text-primary-base">Rs. {amount}</H1>

                      {expirationTime && (
                        <div className="flex w-full flex-row items-center justify-center gap-2">
                          <B1>Expiry time would be : </B1>
                          <H6 textColor="text-primary-base">
                            {expirationTime}{' '}
                            {(isDynamic || generateDynamicQr) && 'seconds'}
                          </H6>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button
                      label={isLoading ? 'Downloading...' : 'Download'}
                      onClickHandler={downloadQR}
                      disable={isLoading}
                      className="button-primary w-[270px] px-3 py-[19px] text-sm leading-tight"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRModal;
