import { User } from '@prisma/client';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}

const cookieOptions = {
  cookieName: 'mildvu_session',
  password: process.env.COOKIE_PASSWORD!,
};

export const withSession = (fn: NextApiHandler) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};

export function withSessionSSR<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  fn: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(fn, cookieOptions);
}
