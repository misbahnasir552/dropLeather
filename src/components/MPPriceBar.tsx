import React from 'react';

const MPPriceBar = ({ accountBalance }: { accountBalance: string }) => {
  return (
    <div className="flex  items-center justify-between bg-screen-grey py-[16px] sm:px-6 ">
      <div className="text-base font-normal leading-10 text-secondary-base">
        Mobile Account Balance
      </div>
      <div className="text-2xl font-semibold leading-[30px]">
        PKR {accountBalance || 0}
      </div>
    </div>
  );
};

export default MPPriceBar;
