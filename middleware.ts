import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from './auth';
import {
  ADMIN_ROUTES,
  BASE_URL,
  MYPAGE_ROUTES,
  PUBLIC_ROUTES,
} from './constants/routes';

export async function middleware(request: NextRequest) {
  const session = await auth(); // NextAuth 세션
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isMypageRoute = pathname.startsWith(MYPAGE_ROUTES.MYPAGE);
  const isAdminRoute = pathname.startsWith(ADMIN_ROUTES.ADMIN);

  // 1. 로그인 중인데 로그인/회원가입 페이지 접근 시 → 홈으로 리다이렉트
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.url));
  }

  // 2. 로그인 안 된 사용자가 마이페이지 접근 시 → 로그인 페이지로
  if (isMypageRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. 로그인은 했지만, role이 ADMIN이 아닌 사용자가 admin 페이지 접근 시 → 홈으로
  if (isAdminRoute && session?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL(BASE_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/mypage', '/admin/:path*'],
};
