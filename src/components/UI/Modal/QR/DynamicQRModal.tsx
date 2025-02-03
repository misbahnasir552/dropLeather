'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import React from 'react';

import closeIcon from '@/assets/icons/close-icon.svg';
import Button from '@/components/UI/Button/PrimaryButton';

import B1 from '../../Body/B1';
import H1 from '../../Headings/H1';
import H3 from '../../Headings/H3';
import H6 from '../../Headings/H6';
// import H2 from '../../Headings/H2';

interface QRModalProps {
  title: string;
  description: string;
  show: boolean;
  setShowModal: (show: boolean) => void;
  routeName?: string;
  imageUrl: string; // The QR code URL passed as a prop
  amount?: string;
  expirationTime?: number;
}

const DynamicQRModal: React.FC<QRModalProps> = ({
  title,
  description,
  show,
  setShowModal,
  routeName,
  imageUrl,
  amount,
  expirationTime,
}) => {
  const router = useRouter();

  const handleDownload = () => {
    if (!imageUrl) {
      console.error('Image URL is not available for download.');
      return;
    }

    const link = document.createElement('a'); // Create a temporary anchor element
    link.href = imageUrl; // Set the href to the image URL
    link.download = 'QRCode.jpg'; // Set the download attribute (filename)
    link.click(); // Programmatically trigger a click on the anchor element
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
          <div className="flex h-[90%] w-[40%] flex-col gap-12 rounded-2xl border-[1px] border-border-dark bg-screen-white p-2">
            <div className="flex flex-col gap-8">
              <div
                className="flex cursor-pointer justify-end"
                onClick={handleClose}
              >
                <Image src={closeIcon} alt="close-icon" />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 sm:px-6 md:px-8">
                {/* <H2>Product</H2> */}
                <H3>{title}</H3>
                <B1 className="text-center">{description}</B1>
              </div>
              <div className="md:px-12 md:py-2">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-center">
                    <Image
                      src={imageUrl}
                      alt="QR code"
                      width={300}
                      height={300}
                    />{' '}
                    {/* QR code */}
                  </div>
                  {amount && (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <H1 textColor="text-primary-base">Rs. {amount}</H1>

                      {expirationTime && (
                        <div className="flex w-full flex-row items-center justify-center gap-2">
                          <B1>Expiry time would be : </B1>
                          <H6 textColor="text-primary-base">
                            {expirationTime} seconds
                          </H6>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button
                      label="Download"
                      onClickHandler={handleDownload}
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

export default DynamicQRModal;
