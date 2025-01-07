// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt'); // Replace 'token' with the actual cookie name or authentication mechanism you're using
  console.log('TOKEN MIDDLEWARE', token);
  console.log('REQUEST URL', req.nextUrl.pathname);

  // Check if the user is logged in
  // if (!token && req.nextUrl.pathname.startsWith('/merchant')) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/login'; // Redirect to your login page
  //   console.log('REDIRECTING TO LOGIN');
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

// Specify the paths where you want the middleware to run
export const config = {
  matcher: ['/merchant/:path*'],
};
