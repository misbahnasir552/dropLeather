import React from 'react';

import H6 from '@/components/UI/Headings/H6';
import H7 from '@/components/UI/Headings/H7';

interface DisabledInputProps {
  data: any;
  removeStore: (index: number) => void;
}

const DisabledInput: React.FC<DisabledInputProps> = ({ data, removeStore }) => {
  console.log('itemssssssss areeeeeeeeeeee', data);
  return (
    <div className="flex flex-col gap-4">
      {data?.map((item: any, index: number) => (
        <div key={index}>
          <div className="flex flex-col gap-4">
            <div className="mt-4 h-[1px] w-full bg-border-light"></div>
            <div className="flex items-center justify-between">
              <H6>Store {index + 1}</H6>
              <div
                className="cursor-pointer"
                onClick={() => removeStore(index)}
              >
                <H6 textColor="text-danger-base">Cancel</H6>
              </div>
            </div>
            <div
              key={index}
              className="sm:grid sm:grid-cols-1 sm:gap-6 md:grid md:grid-cols-2 md:gap-6 "
            >
              {Object.entries(item).map(([key, value]) => {
                // Convert key from camelCase to Title Case)
                const formattedKey = key
                  .replace(/([a-z])([A-Z])/g, '$1 $2')
                  .replace(/^./, (str) => str.toUpperCase());
                if (key === 'storeType') {
                  return (
                    <div
                      key={key}
                      className="rounded-lg border-[1px] border-border-light bg-screen-grey px-5 py-4"
                    >
                      <div>{formattedKey}</div>
                      {Array.isArray(value) ? (
                        <div className="flex">
                          {value.length > 0 ? (
                            value.map((item: any, index: number, arr: any) => (
                              <>
                                <H7 key={index}>{item}</H7>
                                {arr.length - 1 !== index && <H7>/</H7>}
                              </>
                            ))
                          ) : (
                            <H7>N/A</H7>
                          )}
                        </div>
                      ) : (
                        <H7>
                          {value && typeof value !== 'object'
                            ? String(value)
                            : 'N/A'}
                        </H7>
                      )}
                    </div>
                  );
                }
                return (
                  <div
                    key={key}
                    className={`rounded-lg border-[1px] border-border-light ${
                      value !== '' ? 'bg-screen-grey' : 'bg-screen-white'
                    }  px-5 py-4`}
                  >
                    <H7>{formattedKey}</H7>
                    {/* <H7>


                      
                      {value && typeof value !== 'object'
                        ? String(value)
                        : 'N/A'}
                    </H7> */}

                    <H7>
                      {key === 'category'
                        ? typeof value === 'object' &&
                          value !== null &&
                          'label' in value
                          ? (value as { label: string }).label
                          : String(value || 'N/A')
                        : Array.isArray(value)
                        ? value.length > 0
                          ? value.map((val: any, idx: number) => (
                              <React.Fragment key={idx}>
                                <H7>{val}</H7>
                                {idx < value.length - 1 && <H7>/</H7>}
                              </React.Fragment>
                            ))
                          : 'N/A'
                        : value && typeof value !== 'object'
                        ? String(value)
                        : 'N/A'}
                    </H7>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisabledInput;
