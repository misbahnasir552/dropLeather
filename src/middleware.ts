// middleware.ts
// import { type NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('jwt'); // Replace 'token' with the actual cookie name or authentication mechanism you're using
//   console.log('TOKEN MIDDLEWARE', token);
//   console.log('REQUEST URL', req.nextUrl.pathname);

//   // Check if the user is logged in
//   // if (!token && req.nextUrl.pathname.startsWith('/admin')) {
//   //   const url = req.nextUrl.clone();
//   //   url.pathname = '/login'; // Redirect to your login page
//   //   console.log('REDIRECTING TO LOGIN');
//   //   return NextResponse.redirect(url);
//   // }
//   if (
//     !token &&
//     (req.nextUrl.pathname.startsWith('/admin') ||
//       req.nextUrl.pathname.startsWith('/merchant'))
//   ) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/login'; // Redirect to your login page
//     console.log('REDIRECTING TO LOGIN');
//     return NextResponse.redirect(url);
//   }
//   return NextResponse.next();
// }

// // Specify the paths where you want the middleware to run
// export const config = {
//   matcher: ['/admin/:path*', '/merchant/:path*'],
// };

// new code

// 'use server';

import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('Middleware invoked for path:', req.nextUrl.pathname);

  const token = req.cookies.get('jwt');
  console.log('ALL COOKIES:', req.cookies.getAll());
  console.log('TOKEN:', token);

  if (
    !token &&
    (req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/merchant'))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    console.log('REDIRECTING TO LOGIN');
    return NextResponse.redirect(url);
  }

  console.log('Middleware passed for path:', req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/merchant/:path*'],
};

// test

// import { NextResponse } from 'next/server';

// export default function middleware(req: any) {
//   try {
//     console.log('Middleware triggered', req);
//     // Add your middleware logic here
//     return NextResponse.next();
//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.error();
//   }
// }

// multiple checks in matcher

// middleware.ts
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('jwt'); // Replace 'jwt' with the actual cookie name or authentication mechanism you're using
//   console.log('TOKEN MIDDLEWARE', token);
//   console.log('REQUEST URL', req.nextUrl.pathname);

//   // Check if the user is logged in and has access to admin routes
//   if (!token && req.nextUrl.pathname.startsWith('/admin')) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/login'; // Redirect to your login page
//     console.log('REDIRECTING TO LOGIN');
//     return NextResponse.redirect(url);
//   }

//   // Check if the user is logged in and has access to merchant routes
//   if (!token && req.nextUrl.pathname.startsWith('/merchant')) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/login'; // Redirect to your login page
//     console.log('REDIRECTING TO LOGIN');
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // Specify the paths where you want the middleware to run
// export const config = {
//   matcher: ['/admin/:path*', '/merchant/:path*'], // Matchers for both admin and merchant routes
// };
