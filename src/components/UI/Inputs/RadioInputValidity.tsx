'use client';

import Image from 'next/image';
import React from 'react';

import TickIcon from '@/assets/icons/tick-icon.svg';
import H7 from '@/components/UI/Headings/H7';

interface IRadioInputValidity {
  label: string;
  value?: string | boolean | null;
  onChange?: () => void;
  title?: string;
  displayValue?: string | null;
  employee?: boolean;
  settlement?: boolean;
}

export const RadioInputValidity = ({
  label,
  value,
  title,
  onChange,
  displayValue,
  employee,
  settlement,
}: IRadioInputValidity) => {
  // Conditional rendering based on the title prop
  if (title === 'dap') {
    return (
      <div className="flex items-center gap-4">
        {value == 'Success' ? (
          <div
            className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2"
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        ) : (
          <div
            className={`flex h-6 w-6 justify-center rounded-full border-[1px] border-border-dark ${
              typeof displayValue === 'boolean' && employee
                ? 'bg-secondary-200'
                : 'bg-screen-white'
            } px-[7px] py-2`}
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        )}
        <div>
          <H7>{label}</H7>
        </div>
      </div>
    );
  }
  // ................................Employee.............................................//
  if (title === 'employee') {
    return (
      <div className="flex items-center gap-4">
        <div
          className={`flex h-6 w-6 justify-center rounded-full border-[1px] border-border-dark ${
            employee ? 'bg-secondary-200' : 'bg-screen-white'
          } px-[7px] py-2`}
          onClick={onChange}
        >
          <div className="h-[8px] w-[10px]">
            <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <H7>{label}</H7> &nbsp;
          {displayValue && (
            <>
              <span>{` . `}</span>&nbsp;
              <span
                className={
                  displayValue == 'Success'
                    ? 'text-primary-base'
                    : 'text-danger-base'
                }
              >
                {displayValue}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
  // ...................................CIF....................................................//
  if (title === 'cif') {
    return (
      <div className="flex items-center gap-4">
        {value == 'Success' ? (
          <div
            className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2"
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        ) : (
          <div
            className={`flex h-6 w-6 justify-center rounded-full border-[1px] border-border-dark bg-screen-white
               px-[7px] py-2`}
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        )}
        <div>
          <H7>{label}</H7>
        </div>
      </div>
    );
  }

  // Default case for all other titles
  return (
    <div className="flex items-center gap-4">
      {!settlement ? (
        value ? (
          <div
            className={`flex h-6 w-6 justify-center rounded-full ${
              displayValue && employee ? 'bg-secondary-200' : 'bg-primary-base'
            } px-[7px] py-2`}
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        ) : (
          <div
            className={`flex h-6 w-6 justify-center rounded-full border-[1px] border-border-dark ${
              typeof displayValue === 'boolean' && employee
                ? 'bg-secondary-200'
                : 'bg-screen-white'
            } px-[7px] py-2`}
            onClick={onChange}
          >
            <div className="h-[8px] w-[10px]">
              <Image src={TickIcon} width={10} height={10} alt="tick-icon" />
            </div>
          </div>
        )
      ) : null}

      <div>
        <H7>{label}</H7>
        {displayValue !== null && (
          <>
            <span>{` . `}</span>
            <span
              className={
                displayValue ? 'text-primary-base' : 'text-danger-base'
              }
            >
              {displayValue ? 'Success' : 'Failure'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
