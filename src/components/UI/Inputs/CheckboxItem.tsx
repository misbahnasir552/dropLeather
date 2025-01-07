import Image from 'next/image';
import React from 'react';

import TickIcon from '@/assets/icons/tick-icon.svg';

interface ICheckboxItem {
  description: string;
  isChecked: boolean;
  handleCheckboxChange: () => void;
}

function CheckboxItem({
  description,
  isChecked,
  handleCheckboxChange,
}: ICheckboxItem) {
  return (
    <>
      <div className="flex gap-2">
        {isChecked ? (
          <div
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-[1px] border-border-dark bg-primary-base"
            onClick={handleCheckboxChange}
          >
            <Image
              src={TickIcon}
              alt="checkbox"
              height={10}
              width={8}
              className="bg-primary-base"
            />
          </div>
        ) : (
          <div
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-[1px] border-border-dark bg-neutral-white-base"
            onClick={handleCheckboxChange}
          />
        )}
        <p className="text-xs font-semibold leading-tight text-secondary-base">
          {/* I agree to easypaisa Terms & Conditions */}
          {description}
        </p>
      </div>
    </>
  );
}

export default CheckboxItem;
