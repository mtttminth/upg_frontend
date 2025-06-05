import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN, USER } from './consts/common';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const hasAdminToken = request.cookies.get(ADMIN)?.value;
  const hasUserToken = request.cookies.get(USER)?.value;
  
  if (isAdminPath) {
    if (hasAdminToken && (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin')) {
      return NextResponse.redirect(new URL('/admin/profile', request.url));
    } else if (!hasAdminToken && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  } else {
      if (hasUserToken && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
      } else if (!hasUserToken && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/']
};