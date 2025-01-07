import React from 'react';

import paymentgatewaybg from '@/assets/images/payment-gateway.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Partners from '@/components/Content/Partners/Partners';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Card from '@/components/UI/Card/Card';
import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
import { paymentGatewayCards } from '@/utils/data';

const PaymentGateway = () => {
  return (
    <>
      <AcceptPaymentBanner
        banner={paymentgatewaybg}
        title={{
          main: ' Trusted Payment Technology',
          sub: 'by Pakistan’s leading businesses & entrepreneurs',
        }}
        description="Grow your business with Payment Gateway that powers Pakistan’s
                  largest brands and even through easypaisa app authorization."
      />
      <div className="flex flex-col pb-[120px] sm:max-md:pb-[80px]">
        <UIWrapper>
          <Header
            title={{
              main: '6 powerful reasons to chose Easypaisa ',
              sub: 'Payment Gateway',
            }}
            description={
              'Experience the Future of Payments with easypaisa Payment Gateway.'
            }
          />
          <div className="flex flex-row gap-5 sm:max-md:flex-col">
            {paymentGatewayCards?.map((item, index) => {
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
        <Partners />
      </div>

      <Footer />
    </>
  );
};

export default PaymentGateway;
