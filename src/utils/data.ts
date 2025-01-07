import MA1 from '@/assets/icons/mini-apps-v1.svg';
import MA2 from '@/assets/icons/mini-apps-v2.svg';
import OP1 from '@/assets/icons/online-payments-v1.svg';
import OP2 from '@/assets/icons/online-payments-v2.svg';
import PL1 from '@/assets/icons/payment-link-v1.svg';
import PL2 from '@/assets/icons/payment-link-v2.svg';
import QR1 from '@/assets/icons/qr-integrations-v1.svg';
import QR2 from '@/assets/icons/qr-integrations-v2.svg';
import miniApps from '@/assets/images/miniapps.png';
import onlinePayments from '@/assets/images/onlinePayments.png';
import paymentLink from '@/assets/images/paymentLink.png';
import qrPayments from '@/assets/images/qrpayments.png';
import type IHome from '@/interfaces/interface';
import type { TCard } from '@/types/static/static';

export const qrPaymentsCards: TCard[] = [
  {
    label: 'Digital Activation',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Become a Merchant with easypaisa in minutes with a seamless digital onboarding experience. Enjoy collection of Payments on QR and become part of massive cashback Campaigns.',
    link: '#online-payments',
  },
  {
    label: 'Payment Sources',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Easily collect payments from your customer by scanning QR or sharing till code. Payments have never been easier and secure through easypaisa RAAST QR and Till Solution.',
    link: '#qr-integration',
  },
  {
    label: 'Easy Integration',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Easily integrate with easypaisa RAAST QR Codes both Static and Dynamic. Easypaisa RAAST QR Codes are scannable through easypaisa and all other banking apps for making hassle free payments.',
    link: '#mini-apps',
  },
  {
    label: 'Instant Settlement',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Enjoy instant settlements in your easypaisa wallet. Get notifications of each and every transaction on your registered mobile number. No other hidden charges other than communicated MDR.',
    link: '#payment-link',
  },
];

export const paymentGatewayCards: TCard[] = [
  {
    label: 'Digital Activation',
    logo: { image1: OP1, image2: OP2 },
    description:
      "Digital Activation through easypaisa opens door to your business's full potential. Connect effortlessly with millions of users and streamline operations. Embark on a journey to greater efficiency and success.",
    link: '#online-payments',
  },
  {
    label: 'Payment Sources',
    logo: { image1: OP1, image2: OP2 },
    description:
      'With easypaisa, access an array of payment sources that cater to diverse customer preferences. From bank accounts to mobile wallets, we provide the convenience your customers desire. Expand your reach effortlessly.',
    link: '#qr-integration',
  },
  {
    label: 'Effortless Integration',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Integration made simple. easypaisa offers an integration process that allows you to focus on your business. Streamline your operations and provide a smooth experience to your customers.',
    link: '#mini-apps',
  },
  {
    label: 'Instant Settlement',
    logo: { image1: OP1, image2: OP2 },
    description:
      "With easypaisa's Instant Settlement, you can experience a revolution in financial efficiency. Say goodbye to waiting and delays as you receive payments instantly. Seamlessly manage your finances and empower your business with rapid settlement, making every transaction a breeze.",
    link: '#payment-link',
  },
];

export const cards: TCard[] = [
  {
    label: 'Online Payments',
    logo: { image1: OP1, image2: OP2 },
    description:
      "Experience the future of seamless online payments with easypaisa. From secure transactions to real-time settlement, we're your trusted partner for digital financial convenience.",
    link: '#online-payments',
  },
  {
    label: 'QR Integration',
    logo: { image1: QR1, image2: QR2 },
    description:
      'Unlock the power of QR Integrations with easypaisa. Seamlessly merge the virtual and physical words to offer secure, contactless payments to your customers.',
    link: '#qr-integration',
  },
  {
    label: 'Mini APPS',
    logo: { image1: MA1, image2: MA2 },
    description:
      'Expand your digital presence effortlessly with easypaisa MiniApps. Reach your audience without complexities of traditional apps and stay connected with push notifications and secure payments',
    link: '#mini-apps',
  },
  {
    label: 'Payment Link',
    logo: { image1: PL1, image2: PL2 },
    description:
      "Simplify your payment collection with easypaisa's Payment Link. Empower your customers to make swift and secure transactions through personalized links, enhancing the ease of doing business.",
    link: '#payment-link',
  },
];
export const subscriptionCards: TCard[] = [
  {
    label: 'Digital Activation',
    logo: { image1: OP1, image2: OP2 },
    description:
      "By adopting easypaisa's QR payment system, Savvital ensures secure, cashless transactions, aligning with the trend toward contactless payments.",
    link: '#digital-activation',
  },
  {
    label: 'Payment Sources',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Savvital can tap into a massive market with easypaisa, boasting 13 million+ monthly users and 100 million+ transactions annually.',
    link: '#payment-sources',
  },
  {
    label: 'Easy Integration',
    logo: { image1: OP1, image2: OP2 },
    description:
      "Easypaisa's seamless integration options facilitate expansion into diverse industries with varying payment preferences.",
    link: '#easy-integration',
  },
  {
    label: 'Instant Settlement',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Savvital benefits from instant fund transfers, streamlining financial operations and freeing resources for core services like marketing and consulting.',
    link: '#instant-settlement',
  },
];

export const miniAppsCards: TCard[] = [
  {
    label: 'Digital Onboarding ',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Sign up online, submit relevant documentation and be a registered merchant with easypaisa.',
    link: '#online-payments',
  },
  {
    label: 'Seamless Integration',
    logo: { image1: OP1, image2: OP2 },
    description:
      // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore'
      'With our online integration guide and 24/7 support team, your website/app integration is a simplified process.',
    link: '#qr-integration',
  },
  {
    label: 'Instant Settlement',
    logo: { image1: OP1, image2: OP2 },
    description:
      'With each customer order, payment is instantly settled into your account in real-time. You have access to all the transactional information 24/7.',
    link: '#mini-apps',
  },
  {
    label: 'In App Placement ',
    logo: { image1: OP1, image2: OP2 },
    description:
      'Get your website/app directly integrated with the easypaisa app. This allows easypaisa users to access your website directly from the easypaisa app and conduct seamless payments right away.',
    link: '#payment-link',
  },
];
export const responseFields = {
  page: {
    name: 'Onboarding Page',
    categories: [
      {
        categoryName: 'Merchant Details',
        fields: [
          {
            type: 'text',
            label: 'Merchant Name',
            name: 'merchantName',
            placeholder: 'Enter Merchant Name',
            priority: 2,
            validation: {
              required: true,
              minLength: 3,
              maxLength: 50,
              pattern: '^[a-zA-Z0-9\\s]+$',
              errorMessage:
                'Merchant Name must be 3-50 characters long and can only contain letters, numbers, and spaces.',
            },
          },
          {
            type: 'text',
            label: 'Merchant ID',
            name: 'merchantId',
            placeholder: 'Enter Merchant ID',
            priority: 3,
            validation: {
              required: true,
              errorMessage: 'Merchant ID is required.',
            },
          },
          {
            type: 'text',
            label: 'Email',
            name: 'email',
            placeholder: 'Enter your email address',
            priority: 1,
            validation: {
              required: true,
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              errorMessage: 'Please enter a valid email address.',
            },
          },
        ],
      },
      {
        categoryName: 'Contact Details',
        fields: [
          {
            type: 'text',
            label: 'Email',
            name: 'email',
            placeholder: 'Enter your email address',
            priority: 3,
            validation: {
              required: true,
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              errorMessage: 'Please enter a valid email address.',
            },
          },
          {
            type: 'text',
            label: 'Phone Number',
            name: 'phoneNumber',
            placeholder: 'Enter your phone number',
            priority: 4,
            validation: {
              required: true,
              pattern: '^\\+?[0-9]{10,15}$',
              errorMessage: 'Please enter a valid phone number.',
            },
          },
        ],
      },
    ],
  },
};

// Merchant Methods
export const MerchantMethodsData: IHome[] = [
  {
    image: {
      src: onlinePayments,
      alt: 'Payments Background',
    },
    label: {
      main: 'Online',
      sub: 'Payments',
    },
    id: 'online-payments',
    description:
      "Experience the future of seamless online payments with easypaisa. From secure transactions to real-time settlement, we're your trusted partner for digital financial convenience.",
    className:
      'min-h-[640px] w-full bg-no-repeat grid place-items-end px-[150px] py-24 relative sm:max-md:px-[24px] sm:max-md:py-[80px]',
  },

  {
    image: {
      src: qrPayments,
      alt: 'QrPayments Background',
    },
    label: {
      main: 'QR',
      sub: 'Payments',
    },
    id: 'qr-integration',

    description:
      'Unlock the power of QR Integrations with easypaisa. Seamlessly merge the virtual and physical words to offer secure, contactless payments to your customers.',
    className:
      'min-h-[640px] flex flex-col justify-end shrink-0 items-start px-[150px] py-24 relative sm:max-md:px-[24px]',
  },

  {
    image: {
      src: miniApps,
      alt: 'miniApps Background',
    },
    label: {
      main: 'Mini',
      sub: 'Apps',
    },
    id: 'mini-apps',

    heading: {
      head1: 'easyPaisa MiniApps: Your Shortcut to Business Expansion',
      head2: 'Your Business, Accelerated',
      head3: 'Streamlined for User Ease',
    },
    description: {
      desc1:
        'easypaisa MiniApps is your fast track to digital growth. No need for complex app development – seamlessly connect with easypaisa for instant customer access. Enjoy efficient last-mile delivery, push notifications, and cost savings. Expand your audience effortlessly.',
      desc2:
        "Choose easypaisa MiniApps for streamlined payments, cost efficiency, and focus on your core activities. Elevate your customers' experience and your business. Join now for limitless growth possibilities.",
      desc3:
        'With easypaisa MiniApps, users bypass app downloads and logins. They make secure payments within the easypaisa app, with trusted methods ready to use. Whether for one-time payments or subscriptions, easypaisa MiniApps adapts to your needs, streamlining payments for a seamless user experience.​',
    },
    className:
      'flex flex-col place-items-center shrink-0 px-[254px] py-[146px]  relative sm:max-md:px-[24px] sm:max-md:py-[166px]',
  },
  {
    image: {
      src: paymentLink,
      alt: 'Payments-Link Background',
    },
    label: {
      main: 'Payment',
      sub: 'Link',
    },
    id: 'payment-link',

    description:
      "Simplify your payment collection with easypaisa's Payment Link. Empower your customers to make swift and secure transactions through personalized links, enhancing the ease of doing business.",
    className:
      'min-h-[640px] grid place-items-end shrink-0 px-[150px] py-24 relative sm:max-md:px-[24px]',
  },
];
