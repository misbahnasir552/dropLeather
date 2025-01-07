import Image from 'next/image';
import React from 'react';

import TickIcon from '@/assets/icons/tick-icon.svg';
// import type { ICheckboxInput3 } from "@/interfaces/interface";

function CheckboxInput3({ label, logo, selected, onSelect, decision }: any) {
  return (
    <>
      {/* {revision ? (
        <div
          className="flex flex-row items-center justify-between gap-2 rounded-[36px] bg-neutral-white-base px-5 py-[18px]"
          onClick={onSelect}
        >
          {selected ? (
            <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
              <div className="h-[8px] w-[10px]">
                <Image
                  src={TickIcon}
                  width={100}
                  height={100}
                  alt="tick-icon"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
              <div className="h-[8px] w-[10px]"></div>
            </div>
          )}
          {logo && <Image width={24} height={24} src={logo} alt="left-icon" />}
          <label
            htmlFor="checkbox"
            className="w-full text-sm font-medium text-secondary-base"
          >
            {label}
          </label>
        </div>
      ) :  */}
      {decision ? (
        <div
          className="flex flex-row items-center justify-between gap-2 rounded-lg"
          onClick={onSelect}
        >
          {selected ? (
            <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
              <div className="h-[8px] w-[10px]">
                <Image
                  src={TickIcon}
                  width={100}
                  height={100}
                  alt="tick-icon"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
              <div className="h-[8px] w-[10px]"></div>
            </div>
          )}
          {logo && <Image width={24} height={24} src={logo} alt="left-icon" />}
          <label
            htmlFor="checkbox"
            className="w-full text-sm font-medium text-secondary-base"
          >
            {label}
          </label>
        </div>
      ) : (
        <div
          className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"
          onClick={onSelect}
        >
          {logo && <Image width={24} height={24} src={logo} alt="left-icon" />}
          <label
            htmlFor="checkbox"
            className="w-full text-sm font-medium text-secondary-base"
          >
            {label}
          </label>
          {selected ? (
            <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
              <div className="h-[8px] w-[10px]">
                <Image
                  src={TickIcon}
                  width={100}
                  height={100}
                  alt="tick-icon"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
              <div className="h-[8px] w-[10px]"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CheckboxInput3;
