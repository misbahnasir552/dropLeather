import Image from 'next/image';
import React from 'react';

import statusPendingIcon from '@/assets/icons/empty-dot-icon.svg';
import statusCompletedIcon from '@/assets/icons/green-dot-icon.svg';
import statusRejectedIcon from '@/assets/icons/red-dot-icon.svg';
import statusInProgressIcon from '@/assets/icons/yellow-dot-icon.svg';

import type { StepType } from '../../interfaces/interface';

type StepProps = {
  step: StepType;
  isLast: boolean;
};

const Step: React.FC<StepProps> = ({ step, isLast }) => {
  // console.log('STEPPP ', step);
  // console.log('isLast ', isLast);

  const { title, content, status } = step;

  return (
    <>
      <div className="flex gap-3">
        <div className="mt-[5px] flex flex-col items-center ">
          {status.includes('Approved') ? (
            <Image
              src={statusCompletedIcon}
              alt="completed"
              className="h-[11px] w-[11px]"
              // className="left-[170px] top-[306px]  h-[20px] w-[20px] gap-[12px]"
            />
          ) : status.includes('PENDING') ? (
            // ): status === 'In-Progress' ? (
            <Image
              src={statusInProgressIcon}
              alt="inprogress"
              className="h-[11px] w-[11px]"
              // className="h-[20px] w-[20px]"
            />
          ) : status.includes('Rejected') ? (
            // ): status === 'In-Progress' ? (
            <Image
              src={statusRejectedIcon}
              alt="rejected"
              className="h-[11px] w-[11px]"
              // className="h-[20px] w-[20px]"
            />
          ) : (
            <Image
              src={statusPendingIcon}
              alt="pending"
              className="h-[11px] w-[11px]"
              //  className="h-[11px] w-[11px]"
            />
          )}
          {/* </div> */}

          {!isLast && (
            <div
              className=" h-full w-[1px] bg-[#DDDDDD] transition-all"

              // className="absolute w-px h-[290px] left-[6px] top-[44px] bg-[#DDDDDD] -scale-x-100"
            />
          )}
        </div>
        <div>
          <h3 className="text-gray-800 text-sm font-medium">{title}</h3>
          <p className="text-gray-500 mb-6 text-sm">{content}</p>
        </div>
      </div>
    </>
  );
};

export default Step;
