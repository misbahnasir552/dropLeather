'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import React from 'react';

import closeIcon from '@/assets/icons/close-icon.svg';
import Button from '@/components/UI/Button/PrimaryButton';

interface QRModalProps {
  title: string;
  description: string;
  show: boolean;
  setShowModal: (show: boolean) => void;
  routeName?: string;
  imageUrl: string; // The QR code URL passed as a prop
}

const DynamicQRModal: React.FC<QRModalProps> = ({
  title,
  description,
  show,
  setShowModal,
  routeName,
  imageUrl,
}) => {
  const router = useRouter();

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
          className="overlay fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-secondary-base/75 sm:px-6"
          onClick={handleOverlayClick}
        >
          <div className="flex w-[600px] flex-col gap-12 rounded-2xl border-[1px] border-border-dark bg-screen-white p-5">
            <div className="flex flex-col">
              <div className="flex justify-end" onClick={handleClose}>
                <Image src={closeIcon} alt="close-icon" />
              </div>
              <div className="md:px-[78px] md:py-[40px]">
                <div className="flex flex-col gap-12">
                  <div className="flex justify-center">
                    <Image
                      src={imageUrl}
                      alt="QR code"
                      width={300}
                      height={300}
                    />{' '}
                    {/* QR code */}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-2xl font-semibold leading-tight text-secondary-base">
                      {title}
                    </p>
                    <p className="text-base leading-tight text-secondary-600">
                      {description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      label="Continue"
                      onClickHandler={handleClose}
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
