import React from 'react';

const MobileDropDown = () => {
  return (
    <div className="bg-white flex h-[292px] w-full flex-col items-start justify-between border-y border-solid border-[#e7e7e7] py-8 pl-6 font-['SF_Pro_Display']">
      <div id="PaymentGateway" className="leading-[20px] text-[#322c3c]">
        Payment Gateway
        {'  '}
      </div>
      <div className="leading-[20px] text-[#322c3c]">QR Payment</div>
      <div className="leading-[20px] text-[#322c3c]">Mini Apps</div>
      <div className="leading-[20px] text-[#322c3c]">Payment Link</div>
      <div className="leading-[20px] text-[#322c3c]">Subscription</div>
    </div>
  );
};

export default MobileDropDown;
