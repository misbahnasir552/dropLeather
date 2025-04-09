import React from 'react';

import qrPaymentBG from '@/assets/images/qr-payment.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Card from '@/components/UI/Card/Card';
import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
import { qrPaymentsCards } from '@/utils/data';

const QRPayments = () => {
  return (
    <>
      <AcceptPaymentBanner
        banner={qrPaymentBG}
        title={{
          main: 'Safe, secure and easy',
          sub: 'payments through QR code',
        }}
        description=" Hassel free real time settlements by receiving payment through
              easypaisa QR/Till in a fast and secure way! Enjoy amazing
              cash back offerings on becoming easypaisa QR Merchant."
      />
      <div className="flex flex-col">
        <UIWrapper>
          <Header
            title={{
              main: '  Get Registered, start accepting payments.',
              sub: ' It’s that simple!',
            }}
            description={
              ''
              // 'Lorem ipsum dolor sit amet consectetur adipiscing elitsed doeiusmodtempor incididunt ut labore et dolore'
            }
          />
          <div className="flex flex-row gap-5 sm:max-md:flex-col">
            {qrPaymentsCards?.map((item, index) => {
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
      </div>

      <Footer />
    </>
  );
};

export default QRPayments;
