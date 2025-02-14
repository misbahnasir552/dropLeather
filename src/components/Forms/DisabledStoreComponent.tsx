import React from 'react';

import H6 from '@/components/UI/Headings/H6';

interface DisabledInputProps {
  data: any;
  removeStore: (index: number) => void;
}

const DisabledInput: React.FC<DisabledInputProps> = ({ data, removeStore }) => {
  return (
    <div className="flex flex-col gap-4">
      {data?.map((item: any, index: number) => (
        <div key={index}>
          <div className="mt-4 h-[1px] w-full border-border-light"></div>
          <div className="flex items-center justify-between">
            <H6>Store {index + 1}</H6>
            <div className="cursor-pointer" onClick={() => removeStore(index)}>
              <H6 textColor="text-danger-base">Cancel</H6>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(item)
              .filter(([_, value]) => value !== '')
              .map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[10px]"
                >
                  <div className="text-sm font-normal leading-tight text-secondary-200">
                    {key}
                  </div>
                  {typeof value === 'string' || typeof value === 'number' ? (
                    <div>{value}</div>
                  ) : Array.isArray(value) ? (
                    <div>{value.join(', ')}</div>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisabledInput;
