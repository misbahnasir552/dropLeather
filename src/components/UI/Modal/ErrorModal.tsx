'use client';

import Image from 'next/image';
import type { MouseEvent } from 'react';
import React from 'react';

import closeIcon from '@/assets/icons/close-icon.svg';
import ErrorIcon from '@/assets/icons/errorIcon.png';
import Button from '@/components/UI/Button/PrimaryButton';
import type { IErrorModalProps } from '@/interfaces/interface';

const ErrorModal = ({
  title,
  description,
  show,
  setShow,
}: IErrorModalProps) => {
  const handleClose = (_e: MouseEvent<HTMLDivElement>) => {
    setShow(false);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };
  return (
    <>
      {show ? (
        <div
          className="overlay fixed left-0 top-0 z-50 flex h-full w-full place-items-center justify-center bg-secondary-base/75 "
          onClick={handleOverlayClick}
        >
          {/* // overlay fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-secondary-base /75 bg-opacity-75 */}
          <div className="flex w-[600px] flex-col gap-12 rounded-2xl border-[1px] border-border-dark bg-screen-white p-5">
            <div className="flex flex-col">
              <div className="flex justify-end" onClick={handleClose}>
                <Image src={closeIcon} alt="close-icon" />
              </div>
              <div className="px-[78px] py-[40px]">
                <div className="flex flex-col gap-12">
                  <div>
                    <div className="flex flex-col gap-9">
                      <div className="flex justify-center">
                        <Image
                          src={ErrorIcon}
                          alt="bitmap-icon"
                          className="h-[80px] w-[80px]"
                        />
                      </div>
                      <div>
                        <div className="flex flex-col gap-2 ">
                          <p className="flex justify-center text-2xl font-semibold text-secondary-base">
                            {title}{' '}
                          </p>
                          <p className="m-auto flex text-center text-base text-secondary-600">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      label="Close"
                      onClickHandler={() => setShow(false)}
                      className="button-primary w-[270px] px-3 py-[19px] text-[14px] leading-tight"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorModal;
