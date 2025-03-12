import React from 'react';

import paymentLinkBG from '@/assets/images/payment-link.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Footer from '@/components/Footer/Footer';

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
      <Footer />
    </>
  );
};

export default PaymentLink;
