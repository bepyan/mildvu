import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RESTRICT_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = [...RESTRICT_ROUTES];

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (req.ua?.isBot) {
    return new Response('미치셨습니까 휴먼?', { status: 403 });
  }

  if (!req.url.includes('/api')) {
    if (
      req.cookies.mildvu_session &&
      RESTRICT_ROUTES.some((route) => req.url.includes(route))
    ) {
      return NextResponse.redirect(new URL(`/me`, req.url));
    } else if (
      !req.cookies.mildvu_session &&
      PUBLIC_ROUTES.every((route) => !req.url.includes(route))
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
};
