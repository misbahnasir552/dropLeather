import React from 'react';

import paymentLinkBG from '@/assets/images/payment-link.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Footer from '@/components/Footer/Footer';
// import Header from '@/components/Header/Header';
// import Card from '@/components/UI/Card/Card';
// import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
// import { cards } from '@/utils/data';

const PaymentLink = () => {
  return (
    <>
      <AcceptPaymentBanner
        banner={paymentLinkBG}
        title={{
          main: 'Coming Soon!',
          sub: '',
        }}
        description=""
      />

      {/* <AcceptPaymentBanner
        banner={paymentLinkBG}
        title={{
          main: 'Collect Online Payments',
          sub: 'from anywhere in Pakistan',
        }}
        description="   A Feature Rich Ecosystem for Your Brand Showcase your Products and
              Services to Pakistan Largest online Audience."
      /> */}
      {/* <div className="flex flex-col">
        <UIWrapper>
          <Header
            title={{
              main: '6 powerful reasons to chose Easypaisa ',
              sub: 'Payment Gateway',
            }}
            description={
              ''
              // 'Lorem ipsum dolor sit amet consectetur adipiscing elitsed doeiusmodtempor incididunt ut labore et dolore'
            }
          />
          <div className="flex flex-row gap-5 sm:max-md:flex-col">
            {cards?.map((item, index) => {
              return (
                <Card
                  key={index}
                  logo={item.logo}
                  label={item.label}
                  description={item.description}
                />
              );
            })}
          </div>
        </UIWrapper>
      </div> */}

      <Footer />
    </>
  );
};

export default PaymentLink;
