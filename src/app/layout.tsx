import './globals.css';

import type { Metadata } from 'next';

// import localFont from 'next/font/local';
import ReduxProvider from '@/services/providers/ReduxProvider';

// const SFProDisplay = localFont({
//   src: [
//     {
//       path: '../assets/fonts/sf-pro/SF-Pro-Display/sf-pro-display_regular.woff2',
//       weight: '400',
//     },
//     {
//       path: '../assets/fonts/sf-pro/SF-Pro-Display/sf-pro-display_medium.woff2',
//       weight: '500',
//     },
//     {
//       path: '../assets/fonts/sf-pro/SF-Pro-Display/sf-pro-display_semibold.woff2',
//       weight: '600',
//     },
//     {
//       path: '../assets/fonts/sf-pro/SF-Pro-Display/sf-pro-display_bold.woff2',
//       weight: '700',
//     },
//   ],
//   variable: '--font-SFPro',
// });

export const metadata: Metadata = {
  title: 'Merchant Portal',
  description: 'Generated by Easypaisa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${SFProDisplay.variable} font-SFPro`} font-degular> */}
      <body className="font-degular">
        <ReduxProvider>
          {/* <ApiClientProvider> */}
          {children}

          {/* <SessionMonitor /> */}
          {/* </ApiClientProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}

// import { Provider } from 'react-redux';
// import store from '../store'; // Adjust the path to your store
// import SessionMonitor from '../components/SessionMonitor'; // Adjust the path to your component

// function MyApp({ Component, pageProps }: any) {
//   return (
//     <Provider store={store}>
//       <SessionMonitor />
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;
