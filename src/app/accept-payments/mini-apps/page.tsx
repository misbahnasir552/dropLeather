import React from 'react';

import miniAppsBG from '@/assets/images/mini-apps.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Card from '@/components/UI/Card/Card';
import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
import { miniAppsCards } from '@/utils/data';

const MiniApps = () => {
  return (
    <div>
      <AcceptPaymentBanner
        banner={miniAppsBG}
        title={{ main: 'easypaisa ', sub: 'Mini App Store' }}
        description="A Feature Rich Ecosystem for Your Brand Showcase your Products and Services to Pakistan's Largest online Audience."
      />
      <UIWrapper>
        <Header
          title={{
            main: 'Get Registered, start accepting payments.  ',
            sub: "It's that simple!",
          }}
          description={
            'Grow your business by choosing Mini Apps and become a part of our portfolio with a few simple steps. Get in touch today and join the trailblazing digital payments.'
          }
        />
        <div className="flex flex-row gap-5 sm:max-md:flex-col">
          {miniAppsCards?.map((item, index) => {
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
      <Footer />
    </div>
  );
};

export default MiniApps;
