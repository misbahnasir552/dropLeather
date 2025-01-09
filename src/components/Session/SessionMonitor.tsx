// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { setLogout } from '@/redux/features/authSlice';
// import { clearSession } from '@/redux/features/sessionSlice/sessionSlice';
// import type { RootState } from '@/redux/store/store';

// const SessionMonitor = () => {
//   const expiry = useSelector((state: RootState) => state.session.expiry);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = () => {
//     dispatch(clearSession());
//     dispatch(setLogout());
//     router.push('/login');
//   };

//   // useEffect(() => {
//   //   if (!expiry) return;

//   //   const now = Date.now();
//   //   const timeLeft = expiry - now;

//   //   if (timeLeft <= 0) {
//   //     handleLogout();
//   //   } else {
//   //     const timer = setTimeout(() => {
//   //       handleLogout();
//   //     }, timeLeft);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [expiry]);

//   // return null;

//   useEffect(() => {
//     if (!expiry) return;

//     const now = Date.now();
//     const timeLeft = expiry - now;

//     if (timeLeft <= 0) {
//       handleLogout();
//       return; // No timer is set in this case, but cleanup is safe
//     }

//     const timer = setTimeout(() => {
//       handleLogout();
//     }, timeLeft);

//     return () => clearTimeout(timer); // Always return cleanup logic
//   }, [expiry]);

//   return null;
// };

// export default SessionMonitor;
