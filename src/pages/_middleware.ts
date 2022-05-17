import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RESTRICT_ROUTES = ['/login', '/register'];

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (req.ua?.isBot) {
    return new Response('미치셨습니까 휴먼?', { status: 403 });
  }

  const pagename = req.page.name;
  const isAPI = req.url.includes('/api');
  if (isAPI || !pagename) return;

  const hasSession = !!req.cookies.mildvu_session;
  const isRestrictRoute = RESTRICT_ROUTES.some((route) => route === pagename);
  const isPrivateRoute = pagename.includes('/me');

  if (hasSession && isRestrictRoute) {
    return NextResponse.redirect(new URL(`/me`, req.url));
  }

  if (!hasSession && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
};
